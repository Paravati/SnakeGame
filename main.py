from flask import Flask, g
from flask import render_template
import os
import sqlite3
from datetime import datetime
from flask import flash, redirect, url_for, request

 # https://www.educative.io/blog/javascript-snake-game-tutorial
 
app = Flask(__name__)

@app.route('/')
def index():
    # return 'Cześć, tu Python!'
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
