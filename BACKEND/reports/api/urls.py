from django.urls import path
from reports.api.views import stats, export_productos_csv

urlpatterns = [
    path('stats/', stats, name='reports-stats'),
    path('export/', export_productos_csv, name='reports-export'),
]
