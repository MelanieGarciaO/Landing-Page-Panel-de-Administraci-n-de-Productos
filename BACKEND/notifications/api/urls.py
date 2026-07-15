from django.urls import path

from notifications.api.views import alerts

urlpatterns = [
    path('alerts/', alerts, name='notifications-alerts'),
]
