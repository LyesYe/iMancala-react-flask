from flask import Flask,request
# from flask.ext.cors import CORS, cross_origin
# from flask_cors import CORS, cross_origin



api = Flask(__name__)

@api.route('/GameState',methods=['POST'])
# @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def my_profile():
    gameData = request.get_json()

    print(gameData["game"])
    print(gameData["turn"])
    
    return 'hello'
    
    # response_body = {
    #     "name": "Nagato",
    #     "about" :"Hello! I'm a full stack developer that loves python and javascript"
    # }
    # response_body.headers.add('Access-Control-Allow-Origin', '*')

    # return response_body