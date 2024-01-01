from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view (["GET","POST",'PUT','DELETE'])

def fetch():
    Response({"massage":"You are using GET METHOD"})
def create():
    Response({"massage":"You are using POST METHOD"})
def update():
    Response({"massage":"You are using PUT METHOD"})
def delete():
    Response({"massage":"You are using PATCH METHOD"})



def main (req):
    if req.method == "GET":
        return fetch()
    elif req.method == "POST":
        return create()
    elif req.method == "PUT":
        return update()
    else :
        return delete()