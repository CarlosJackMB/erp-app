from flask import Flask
from app.routes import main
import yaml
import os

def create_app(config_name="development"):
    app = Flask(__name__)

    # Load config
    base_dir = os.path.abspath(os.path.dirname(__file__))
    config_path = os.path.join(base_dir, "..", "config", f"{config_name}.yaml")
    with open(config_path) as cfg:
        app.config.update(yaml.safe_load(cfg))

    # Register routes
    app.register_blueprint(main)

    return app
