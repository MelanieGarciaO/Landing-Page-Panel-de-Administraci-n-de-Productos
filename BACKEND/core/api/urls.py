from rest_framework import routers
from core.api.views import ProductoViewSet

router = routers.DefaultRouter()

router.register('producto', ProductoViewSet, basename='producto') 

urlpatterns = router.urls

