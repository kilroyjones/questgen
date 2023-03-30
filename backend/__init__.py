from config import config
from flask import Flask
from flask_cors import CORS
from prisma import Prisma, register

db = Prisma()

def create_app(config_name): 
    db.connect()
    register(db)

    app = Flask(__name__)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.config.from_object(config[config_name])

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api') 

    return app