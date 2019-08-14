# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse

# Create your views here.

# .表示当前包下的models

from models import *
from django.views.generic import View

def index(request): #dashboard
    return render(request, 'index.html')

def show(request): #查看信息
    # 查询数据库中所有数据
    url = request.path
    if url == '/show/cc':
        cc_list = cc_ban.objects.filter()
        ban_list = ip_ban.objects.filter()
        context = {"url":"cc", "ban_list": ban_list, "cc_list": cc_list, "project" : "CC攻击拦截"}
        print context
        return render(request, 'waf/show.html',context)
    if url == '/show/ban':
        cc_list = cc_ban.objects.filter()
        ban_list = ip_ban.objects.filter()
        context = {"url":"ban", "ban_list": ban_list, "cc_list": cc_list, "project" : "IP黑名单"}
        print len(context['cc_list'])
        return render(request, 'waf/show.html',context)

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

def delban(request): #删除黑名单
    if request.method == 'POST':
        ip = request.POST.get("ip")
        if ip!=None:
            bandel = ip_ban.objects.filter(ip=ip).delete()
            return HttpResponse("ok")
        else:
            return HttpResponse("ip cannot be None")

def reset(request): #重置cc
    if request.method == 'POST':
        ip = request.POST.get("ip")
        if ip!=None:
            ccdel = cc_ban.objects.filter(ip=ip).delete()
            return HttpResponse("ok")
        else:
            return HttpResponse("ip cannot be None")