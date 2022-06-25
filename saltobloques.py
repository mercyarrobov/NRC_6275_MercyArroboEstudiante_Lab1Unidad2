#Importamos las librerias necesarias para poder realizar el aplicativo web
import os
import numpy as np
from flask import Flask, jsonify, make_response, render_template, request
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure

#Objeto para inicilizar la aplicacion
app = Flask(__name__,template_folder='templates/layout')
#Clave  de la app
app.secret_key = "123456"
app.debug = False
app._static_folder = os.path.abspath("templates/static/")

#Controlador de la ruta inicial
@app.route("/")
def index():
    return render_template("index.html")

#Controlador de la ruta inicial
@app.route("/gamer", methods=["GET"])
def gamer():
    return render_template("saltobloques.html")

#Main de la app
if __name__ == "__main__":
    app.run(debug=True)
