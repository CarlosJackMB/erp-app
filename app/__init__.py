from flask import Flask
from app.routes import main
from app.modules.personal.routes import personal_bp
from app.modules.laboral.routes import laboral_bp
import yaml
import os

def create_app(config_name="development"):
    app = Flask(__name__)

    # Cargar configuración desde ruta absoluta
    base_dir = os.path.abspath(os.path.dirname(__file__))
    config_path = os.path.join(base_dir, "..", "config", f"{config_name}.yaml")
    with open(config_path) as f:
        config_data = yaml.safe_load(f)
    app.config.update(config_data)

    # Registrar blueprints
    app.register_blueprint(main)
    app.register_blueprint(personal_bp, url_prefix="/personal")
    app.register_blueprint(laboral_bp, url_prefix="/laboral")

    return app
