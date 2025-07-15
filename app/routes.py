from flask import Blueprint, send_from_directory, jsonify
import os

main = Blueprint("main", __name__)

# Path to React build
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DIST_DIR = os.path.join(BASE_DIR, "static", "dist")

@main.route("/", defaults={"path": ""})
@main.route("/<path:path>")
def serve_frontend(path):
    # If requesting API, pass
    if path.startswith("api/"):
        return jsonify({"error": "Invalid API endpoint"}), 404
    # Serve static assets if they exist
    file_path = os.path.join(DIST_DIR, path)
    if path != "" and os.path.exists(file_path):
        return send_from_directory(DIST_DIR, path)
    # Otherwise serve index.html
    return send_from_directory(DIST_DIR, "index.html")

# Example API endpoints
@main.route("/api/personal")
def api_personal():
    return jsonify(message="Datos del módulo Personal")

@main.route("/api/laboral")
def api_laboral():
    return jsonify(message="Datos del módulo Laboral")
