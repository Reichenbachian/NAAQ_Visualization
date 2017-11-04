from django.conf.urls import include, url
from . import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    url(r'^$', views.Landing),
    url(r'^signup/$', views.Signup),
    url(r'^login/$', views.Login),
    url(r'^logout/$', views.Logout),
    url(r'dashboard/$', views.Dashboard),
    url(r'^asyncRequests/', include("Dashboard.asyncRequests_urls")),
    url(r'^extension_api/', include("Dashboard.ExtensionLib.extensionApi_urls"))
]
