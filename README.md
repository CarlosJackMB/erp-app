# ERP Bolt Integration Skeleton

Este proyecto integra un frontend (React/Tailwind) generado por Bolt con un backend Flask.

## Estructura

```
erp_bolt_integration/
├── app/
│   ├── __init__.py       # create_app
│   ├── routes.py         # sirve 'static/dist' y APIs
│   └── static/
│       └── dist/
│           └── index.html  # placeholder, reemplazar con tu build
├── config/
│   └── development.yaml
├── wsgi.py
└── requirements.txt
```

## Uso

1. **Copiar tu build de Bolt**  
   Tras compilar tu frontend (npm run build), copia la carpeta `dist/` dentro de `app/static/dist`.

2. **Instalar dependencias**  
   ```bash
   cd ~/erp
   python3.10 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Configurar WSGI en PythonAnywhere**  
   Edita `/var/www/cmberp_es_wsgi.py`:
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

4. **Panel Web**  
   - Source code: `/home/carlosmartin/erp`  
   - Working directory: `/home/carlosmartin/erp`  
   - Virtualenv: `/home/carlosmartin/erp/.venv`  
   - Dominio: `cmberp.es`

5. **Reload**  
   Pulsa **Reload** en PythonAnywhere y visita `https://cmberp.es`.

Ahora tu frontend y tu API estarán disponibles bajo el mismo dominio.
