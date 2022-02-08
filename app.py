from flask import Flask, render_template, url_for# request, jsonify, make_response
from sqlalchemy import create_engine
from flask_admin import Admin

from config import Config

def create_app():

	app = Flask(__name__)
	app.config.from_object(Config)
	return app


app = create_app()

admin = Admin(app, name='microblog', template_mode='bootstrap3')
# Add administrative views here

@app.route('/')
def index() :

    #items = Item.query.order_by(Item.price).all()
    return render_template('index.html')


if __name__ == '__main__':
	app.run()