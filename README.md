# ERP App Base

Estructura mínima del ERP Personal, lista para desplegar en PythonAnywhere.

## Estructura de carpetas

```
erp_app_v2/
├── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── modules/
│   │   ├── personal/
│   │   │   └── routes.py
│   │   └── laboral/
│   │       └── routes.py
│   ├── templates/
│   │   ├── base.html
│   │   └── home.html
│   └── static/
│       └── css/
│           └── output.css
├── config/
│   └── development.yaml
├── wsgi.py
├── requirements.txt
└── README.md
```

## Despliegue en PythonAnywhere

1. Clonar el repositorio en `/home/carlosmartin/erp`
2. Crear y activar el virtualenv:
   ```bash
   python3.10 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
3. Configurar el archivo WSGI en PythonAnywhere:
   ```python
   import sys, os, traceback

   project_home = '/home/carlosmartin/erp'
   if project_home not in sys.path:
       sys.path.insert(0, project_home)

   try:
       from wsgi import app as application
   except Exception:
       with open("/tmp/wsgi_error.log", "w") as f:
           f.write(traceback.format_exc())
       raise
   ```
4. Ajustar en el panel Web:
   - Source code: `/home/carlosmartin/erp`
   - Working dir: `/home/carlosmartin/erp`
   - Virtualenv: `/home/carlosmartin/erp/.venv`
   - Dominio: `cmberp.es`
5. Pulsar **Reload** y probar en `https://cmberp.es`

