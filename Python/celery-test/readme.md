### Running simpleTasks.py worker

**Mac/Linux**
```
celery -A simpleTasks worker --loglevel=info
```

**Windows hack (since it's unsupported by Celery)**
```
celery -A simpleTasks worker --pool=solo --loglevel=info
```

---

### Running the client
Make sure the Redis backend is available locally.

Then simply run the following to queue up tasks:

```
python simpleTasksClient.py
```



