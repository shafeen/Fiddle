import click


@click.command()
@click.option('-n', '--name',
              type=str,
              default='World!',
              prompt='Please enter a name',
              help='The name to use for greeting.')
def greeting(name):
    click.echo('Hello, %s!' % name)


@click.command()
@click.option('-p', '--port',
              type=int,
              prompt='Please enter a port#',
              help='The port number to use.')
def print_port_number(port):
    click.echo('You chose port %d' % port)

if __name__ == '__main__':
    # greeting()
    print_port_number()


