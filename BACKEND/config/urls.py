"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.api.urls')),
]

# Variabilidad del producto (ver config_product.py / settings.PRODUCT_VARIANT):
# las rutas de reportes y notificaciones solo se registran si la variante
# activa las tiene habilitadas. En la variante A (básica) estas URLs ni
# siquiera existen -> piden un 404, no un simple flag apagado.
if settings.ENABLE_REPORTS:
    urlpatterns += [path('api/reports/', include('reports.api.urls'))]

if settings.ENABLE_NOTIFICATIONS:
    urlpatterns += [path('api/notifications/', include('notifications.api.urls'))]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
