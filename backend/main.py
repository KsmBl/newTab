#import much stuff
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
from urlparser import * 
import configparser

#read config file
config = configparser.ConfigParser()
config.read("./config.conf")
config_host = config["Network"]["host"]
config_port = config["Network"]["port"]

#enable flask and CORS
app = Flask(__name__)
CORS(app)

#test backend
@app.route('/ping', methods=['GET'])
def ping():
	data = {'message': 'everything oki doki'}
	return jsonify(data)

#get shortcut icons from ./jsonfiles/
@app.route('/getshortcuts', methods=['GET'])
def getshortcuts():
	json_dir = "./jsonfiles"
	json_array = []
	for filename in os.listdir(json_dir):
		if filename.endswith('.json'):
			with open(os.path.join(json_dir, filename), 'r') as f:
				json_data = json.load(f)
				json_array.append(json_data)

	return jsonify(json_array)

#create new shortcut
@app.route('/postshortcut', methods=['POST'])
def pinnedicons():
	data = request.json

	#test if file dont exists, then create it
	if not os.path.exists(f"./jsonfiles/{data['name']}.json"):
		response = {"status" : "0"}
		data.update({'url': convertURL(data["url"])})	
		with open(f"./jsonfiles/{data['name']}.json", "w") as json_file:
			json.dump(data, json_file)
	else:
		#file already exists, cant create two shortcuts with the same name
		# NOTE: add notification in frontend
		response = {"status" : "1"}

	return jsonify(response)

#remove a shortcut by name
@app.route('/removeshortcut', methods=['POST'])
def removeshortcut():
	data = request.json
	filepath = f"./jsonfiles/{data}.json"
	if os.path.exists(filepath):
		os.remove(filepath)
		response = {"status" : "Shortcut removed"}
	else:
		response = {"status" : "Shortcut name does not exists"}

	return jsonify(response)

if __name__ == '__main__':
	app.run(host=config_host, port=config_port)
