from django.contrib import admin
from django.conf.urls import url
from . import views

urlpatterns = [

    url(r'^admin/', admin.site.urls),

    url(r'^$', views.index, name='index'),


    url(r'^login/$', views.login),
    url(r'^logout/$', views.logout),

    
    
    url(r'^show/', views.show),

    url(r'^add/$', views.add),
    url(r'^del/$', views.delban),
    url(r'^reset/$', views.reset),

    url(r'^settings/$',views.settings),
    url(r'^/modsettings/$',views.modsettings),
    
    url(r'^urls/$',views.urls),
    url(r'^qxurl/$',views.qxurl),
    url(r'^addurl/$',views.addurl),

]
