from django.db import models  # noqa: F401

# La app "reports" no define modelos propios: reutiliza Producto (definido
# en core.models) para generar estadísticas y exportaciones.