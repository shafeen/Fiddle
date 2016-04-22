#!/usr/bin/env python
import pika


def get_host_and_port():
    host = raw_input("hostname: ")
    host = host if host != '' else 'localhost'
    port = raw_input("port: ")
    port = int(port) if port != '' else 5672
    return [host, port]

# TODO: use "click" decorators for this
host, port = get_host_and_port()
connection = pika.BlockingConnection(pika.ConnectionParameters(
        host=host,
        port=port))
channel = connection.channel()

channel.queue_declare(queue='hello')

channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print(" [x] Sent 'Hello World!'")
connection.close()
