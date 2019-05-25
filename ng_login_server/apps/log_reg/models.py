from django.db import models
import bcrypt
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
NAME_REGEX = re.compile(r'^[A-Za-z]{2,50}$')
PASS_REGEX = re.compile(r'^(?=.*[A-Z])(?=.*\d)(.{8,15})$')

class UserManager(models.Manager):
    def validate(self, form):
        errors=[]
        #validate name
        if len(form['first_name']) < 2:
            errors.append("First name must be at least 2 characters")
        elif not NAME_REGEX.match(form['first_name']):
            errors.append("First name must be only letters")
        if len(form['last_name']) < 2:
            errors.append("Last name must be at least 2 characters")
        elif not NAME_REGEX.match(form['last_name']):
            errors.append("last name must be only letters")
        if len(form['password']) < 8:#validate password
            errors.append("Password must contain 8 characters")
        elif PASS_REGEX.match(form['password']):
            errors.append("Must contain an Upper and a lower")
        if len(form['email']) < 2:#validate email
            errors.append("Please enter a valid email!")
        elif not EMAIL_REGEX.match(form['email']):
            errors.append("Please enter a valid email!")
        return errors
    def easy_create(self, form):
        pw_hash = bcrypt.hashpw(form['password'].encode(), bcrypt.gensalt())
        return User.objects.create(
            first_name=form['first_name'],
            last_name=form['last_name'],
            email=form['email'],
            password=pw_hash.decode()
        )
    def login(self, form):
        matching_users = User.objects.filter(email=form['email'])
        # print("*"*50)
        # print("matching_users:", matching_users)
        if matching_users:
            user = matching_users[0]
            print("*"*50)
            print("user: ", user)
            if bcrypt.checkpw(form['password'].encode(), user.password.encode()):
                return (True, user)
        return (False, ["Email or password invalid"])

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()

    def natural_key(self):
        return(f'{self.first_name} {self.last_name}')
