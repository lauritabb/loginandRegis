from django.shortcuts import render, redirect, HttpResponse
from django.core import serializers
from .models import User
import json


def index(request):
    # testQuery = User.objects.all()
    # data = serializers.serialize("json", testQuery, indent=2, use_natural_foreign_keys=True)
    data = serializers.serialize("json", User.objects.all(), indent=2)
    return HttpResponse(data, content_type="application/json")


def show(request,id):
    data = serializers.serialize("json", User.objects.filter(id=id), indent=2)
    print("hello")
    return HttpResponse(data, status=200,content_type="application/json")

def create(request):
    # decode post data
    data = json.loads(request.body.decode())
    errors = User.objects.validate(data)
    print(errors)
    if errors:
        return HttpResponse(json.dumps(errors), status=400, content_type="application/json")
    # create a user, return user info as jason
    user_info = User.objects.easy_create(data)
    # json_users = serializers.serialize('json',[user]) 
    user = {
        'first_name': user_info.first_name,
        'id': user_info.id
    }
    json_user = json.dumps(user)
    return HttpResponse(json_user, status=200, content_type='application/json')

def login(request):
    post_data = json.loads(request.body.decode())
    valid, result = User.objects.login(post_data)
    print("*")
    print("valid: ", valid)
    if not valid:
        json_errors = json.dumps(result)
        return HttpResponse(json_errors, status=400, content_type="application/json")
    user = {
        'first_name': result.first_name,
        'id': result.id
    }
    json_user = json.dumps(user)
    return HttpResponse(json_user, status=200, content_type='application/json')

