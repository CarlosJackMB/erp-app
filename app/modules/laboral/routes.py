from flask import Blueprint

laboral_bp = Blueprint("laboral", __name__)

@laboral_bp.route("/")
def laboral_home():
    return "Área Laboral"
