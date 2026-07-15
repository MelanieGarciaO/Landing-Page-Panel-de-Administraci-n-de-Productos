from django.db import models  # noqa: F401

# La app "notifications" no define modelos propios: reutiliza Producto
# (definido en core.models) para generar alertas de stock bajo.