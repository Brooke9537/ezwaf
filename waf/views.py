# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse, redirect,HttpResponseRedirect
from django.contrib import auth

# Create your views here.

# .表示当前包下的models

from .models import *
from django.views.generic import View
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

def login(request):
    """ 用户登陆 """
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        # 验证用户信息
        user = auth.authenticate(username=username, password=password)
        # 判断用户激活状态
        if user is not None and user.is_active:
            # 登陆系统
            auth.login(request, user)
            # 登陆之后跳转
            if request.GET.get('next') != 'None' and request.GET.get('next') != '':
                return redirect(request.GET.get('next'))
            return HttpResponseRedirect('/ezwaf/')
        else:
            return render(request, 'login.html', {'login_err': 'Error username or password!'})
    else:
        return render(request, 'login.html', {'next': request.GET.get('next'),'login_err': ''})


@login_required(login_url='/ezwaf/login')
def logout(request):
    """ 用户退出 """
    auth.logout(request)
    return HttpResponseRedirect('/ezwaf/login')

@login_required(login_url='/ezwaf/login')
def index(request):
    """ index dashboard """
    # 没事再写写获取数据
    return render(request, 'index.html', {'ban_ip':13,
                    'cc_deny':26,
                    'cc_ip_list':[{'ip':'127.0.0.1','count':50},{'ip':'123.42.45.6','count':34}],
                    'logs':['172.17.0.1 [2020-03-18 12:49:34] "blockip wpad/wpad.dat数据全是假的" "-" - "blocked ip is 172.17.0.1"','172.17.0.1 [没写2020-03-19 02:00:53] "GET 127.0.0.1/777" "No Way!!!"  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like G懒得写ecko) Chrome/80.0.3987.132 Safari/537.36" "/77"']
                })


@login_required(login_url='/ezwaf/login')
def show(request): #查看信息'
    # 查询数据库中所有数据
    url = request.path
    if url == '/ezwaf/cc/':
        cc_list = cc_ban.objects.filter()
        ban_list = ip_ban.objects.filter()
        context = {"url":"cc", "ban_list": ban_list, "cc_list": cc_list, "project" : "CC攻击拦截"}
        return render(request, 'waf/show.html',context)
    if url == '/ezwaf/ban/':
        cc_list = cc_ban.objects.filter()
        ban_list = ip_ban.objects.filter()
        context = {"url":"ban", "ban_list": ban_list, "cc_list": cc_list, "project" : "IP黑名单"}
        return render(request, 'waf/show.html',context)

@login_required(login_url='/ezwaf/login')
def urls(request): #URL过滤
    url_list = url_ban.objects.filter()
    context = {"url_list":url_list, "project" : "URL过滤"}
    return render(request, 'waf/urls.html',context)
@login_required(login_url='/ezwaf/login')
def qxurl(request):
    if request.method == 'POST':
        url = request.POST.get("url")
        if url!=None:
            urldel = url_ban.objects.filter(url=url).delete()
            return HttpResponse("ok")
        else:
            return HttpResponse("url cannot be None")
    if request.method == 'GET':
        url = request.GET.get("url")
        if url!=None:
            urldel = url_ban.objects.filter(url=url).delete()
            return HttpResponse("<script>alert(\"成功取消过滤！\");window.location.href=\"/urls\";</script>")
        else:
            return HttpResponse("<script>alert(\"出现错误，请检查后重试！\");window.location.href=\"/urls\";</script>")
@login_required(login_url='/ezwaf/login')
def addurl(request):
    if request.method == 'POST':
        url = request.POST.get("url")
        # 添加到数据库
        if url!=None:
            url_bans = url_ban(url = url)
            url_bans.save()
            return HttpResponse("ok")
        else:
            return HttpResponse('url cannot be None')
@login_required(login_url='/ezwaf/login')
def add(request): #添加黑名单
    if request.method == 'POST':
        ip = request.POST.get("ip")
        # 添加到数据库
        if ip!=None:
            ban = ip_ban(ip = ip)
            ban.save()
            return HttpResponse("ok")
        else:
            return HttpResponse('ip cannot be None')
    if request.method == 'GET':
        ip = request.GET.get("ip")
        # 添加到数据库
        if ip!=None:
            ban = ip_ban(ip = ip)
            ban.save()
            return HttpResponse("<script>alert(\"添加成功！\");window.location.href=\"/show/ban\";</script>")
        else:
            return HttpResponse("<script>alert(\"出现错误，请检查后重试！\");window.location.href=\"/show/ban\";</script>")
@login_required(login_url='/ezwaf/login')
def delban(request): #删除黑名单
    if request.method == 'POST':
        ip = request.POST.get("ip")
        if ip!=None:
            bandel = ip_ban.objects.filter(ip=ip).delete()
            return HttpResponse("ok")
        else:
            return HttpResponse("ip cannot be None")
    if request.method == 'GET':
        ip = request.GET.get("ip")
        if ip!=None:
            bandel = ip_ban.objects.filter(ip=ip).delete()
            return HttpResponse("<script>alert(\"已移出黑名单\");window.location.href=\"/ezwaf/ban\";</script>")
        else:
            return HttpResponse("<script>alert(\"出现错误，请检查后重试！\");window.location.href=\"/ezwaf/ban\";</script>")
@login_required(login_url='/ezwaf/login')
def reset(request): #重置cc
    if request.method == 'POST':
        ip = request.POST.get("ip")
        if ip!=None:
            ccdel = cc_ban.objects.filter(ip=ip).delete()
            return HttpResponse("ok")
        else:
            return HttpResponse("ip cannot be None")
    if request.method == 'GET':
        ip = request.GET.get("ip")
        # 添加到数据库
        if ip!=None:
            ccdel = cc_ban.objects.filter(ip=ip).delete()
            return HttpResponse("<script>alert(\"重置成功！\");window.location.href=\"/ezwaf/cc\";</script>")
        else:
            return HttpResponse("<script>alert(\"出现错误，请检查后重试！\");window.location.href=\"/ezwaf/cc\";</script>")
@login_required(login_url='/ezwaf/login')
def settings(request): #waf设置
    settings = setting.objects.filter()
    context = {"project" : "waf设置","settings":settings}
    return render(request, 'waf/settings.html',context)
@login_required(login_url='/ezwaf/login')
def modsettings(request):  # 修改设置
    def modefy(var):
        varmod = request.POST.get(var)
        settings = setting.objects.get(title=var)
        settings.context = str(varmod)
        settings.save()
    if request.method == 'POST':
        modefy("attacklog")
        modefy("logdir")
        modefy("UrlDeny")
        modefy("CookieMatch")
        modefy("postMatch")
        modefy("whiteModule")
        modefy("black_fileExt")
        modefy("ipWhitelist")
        modefy("CCDeny")
        modefy("CCrate")
        return redirect("/settings")
    else:
        return HttpResponse("<script>alert(\"出现错误，请检查后重试！\");window.location.href=\"/ezwaf/settings\";</script>")