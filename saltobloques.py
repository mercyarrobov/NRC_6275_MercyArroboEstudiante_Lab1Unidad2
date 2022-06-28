#Importamos las librerias necesarias para poder realizar el aplicativo web
import os
from flask import Flask, render_template

#Objeto para inicilizar la aplicacion
app = Flask(__name__,template_folder='templates/layout')
#recuperar nombres de ruta
app._static_folder = os.path.abspath("templates/static/")

#Controlador de la ruta inicial
@app.route("/")
#Función que redirige la página principal
def index():
    #restorna la plantilla index.html
    return render_template("index.html")

#Controlador de la ruta inicial
@app.route("/gamer")
#Función que redirige la segunda página dónde está el juego
def gamer():
    #restorna la plantilla saltobloques.html
    return render_template("saltobloques.html")

#Main de la app
if __name__ == "__main__":
    #evitar reinicios excesivos del servidor
    app.run(debug=True)
