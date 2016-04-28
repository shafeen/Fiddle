import click
import pika
from pika.exceptions import AMQPConnectionError

from rabbitmq_util import RABBITMQ_DEFAULT_HOST
from rabbitmq_util import RABBITMQ_DEFAULT_PORT


@click.command()
@click.option('--mode', type=str,
              prompt='"send" or "recv" from server',
              help='Specify if send-ing or recv-ing messages from server.')
@click.option('--host', type=str,
              default=RABBITMQ_DEFAULT_HOST,
              prompt='Enter hostname',
              help='Server address for rabbitmq.')
@click.option('--port', type=int,
              default=RABBITMQ_DEFAULT_PORT,
              prompt='Server port number to use.',
              help='The port to use for host server.')
@click.option('-m', '--message',
              default="Hello, RabbitMQ!",
              prompt='Enter a message to send (ignore if recv)',
              help='Message to send to the queue.')
def send_or_recv(mode, host, port, message):
    if mode == 'send':
        send(host, port, message)
    elif mode == 'recv':
        recv(host, port)
    else:
        click.echo('Invalid mode "%s", exiting.' % mode)


def send(host, port, message):
    connection = pika.BlockingConnection(pika.ConnectionParameters(
            host=str(host),
            port=port))
    channel = connection.channel()

    channel.queue_declare(queue='hello')

    channel.basic_publish(exchange='',
                          routing_key='hello',
                          body=message)
    print(" [x] Sent '%s'" % message)
    connection.close()


def recv(host, port):
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(
                host=str(host),
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


if __name__ == '__main__':
    send_or_recv()
