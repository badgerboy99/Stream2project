from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

# when hosting via local server
# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'Adoptdata'
# COLLECTION_NAME = 'projects'

# when hosting via heroku
MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'Adoptdata')
COLLECTION_NAME = 'adoptionData'


@app.route("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")


@app.route("/Adoptdata/projects")
def Adoptdata():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False,
        'area': True,    'region' : True,    'year' : True,   'number' : True
    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement

    # for Heroku
    with MongoClient(MONGO_URI) as conn:

    # for local host
    # with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000 -- do I nd this on this occasion?
        projects = collection.find(projection=FIELDS, limit=55000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))


if __name__ == "__main__":
    app.run(debug=True)