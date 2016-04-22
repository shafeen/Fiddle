#!/usr/bin/env python

RABBITMQ_DEFAULT_HOST = 'localhost'
RABBITMQ_DEFAULT_PORT = 5672


def get_host_and_port():
    host = raw_input("hostname: ")
    host = host if host != '' else RABBITMQ_DEFAULT_HOST
    port = raw_input("port: ")
    port = int(port) if port != '' else RABBITMQ_DEFAULT_PORT
    return [host, port]
