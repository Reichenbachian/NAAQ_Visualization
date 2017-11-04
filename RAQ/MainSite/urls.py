from django.conf.urls import include, url
from . import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    url(r'^$', views.Landing),
    url(r'api', views.get_for_word),
]
