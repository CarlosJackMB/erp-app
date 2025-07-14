from flask import Blueprint

personal_bp = Blueprint("personal", __name__)

@personal_bp.route("/")
def personal_home():
    return "Área Personal"
