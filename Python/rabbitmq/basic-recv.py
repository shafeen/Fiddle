#!/usr/bin/env python
import pika
from pika.exceptions import AMQPConnectionError


def get_host_and_port():
    host = raw_input("hostname: ")
    host = host if host != '' else 'localhost'
    port = raw_input("port: ")
    port = int(port) if port != '' else 5672
    return [host, port]

try:
    # TODO: use "click" decorators for this
    host, port = get_host_and_port()
    connection = pika.BlockingConnection(pika.ConnectionParameters(
            host=host,
            port=port))
    channel = connection.channel()
    channel.queue_declare(queue='hello')

    def callback(ch, method, prolsperties, body):
        print(" [x] Received %r" % body)

    try:
        channel.basic_consume(callback, queue='hello', no_ack=True)
        print(' [*] Waiting for messages. To exit press CTRL+C')
        channel.start_consuming()
    except KeyboardInterrupt:
        exit('KeyboardInterrupt detected! Exiting.')

except pika.exceptions.AMQPConnectionError, e:
    exit(str(e))
