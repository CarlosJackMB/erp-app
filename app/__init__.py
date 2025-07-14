from flask import Flask
from app.routes import main
from app.modules.personal.routes import personal_bp
from app.modules.laboral.routes import laboral_bp

def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_file(f"../config/{config_name}.yaml", load=dict)
    app.register_blueprint(main)
    app.register_blueprint(personal_bp, url_prefix="/personal")
    app.register_blueprint(laboral_bp, url_prefix="/laboral")
    return app
