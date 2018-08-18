from celery import Celery
from time import sleep
import urllib.request

app = Celery('hello', backend='redis://localhost:6379/0', broker='redis://localhost:6379/0')


@app.task
def hello():
    sleep(5)
    return 'hello world'


@app.task
def add(x, y):
    return x + y

