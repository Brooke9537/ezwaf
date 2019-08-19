"""ezwaf URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
import waf

from waf.views import index

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login$', waf.views.login),
    url(r'^logout$', waf.views.login),
    url(r'^$', waf.views.index),
    
    url(r'^show', waf.views.show),

    url(r'^add$', waf.views.add),
    url(r'^del', waf.views.delban),
    url(r'^reset', waf.views.reset),

    url(r'^settings',waf.views.settings),
    url(r'^modsettings',waf.views.modsettings),
    
    url(r'^urls',waf.views.urls),
    url(r'^qxurl',waf.views.qxurl),
    url(r'^addurl$',waf.views.addurl),

]