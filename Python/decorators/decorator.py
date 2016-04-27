def super_greet(greet_func):
    def new_greet_func(name):
        print "greetings, welcome and",
        greet_func(name)
    return new_greet_func


@super_greet
def greet(name):
    print 'hello, %s' % name

if __name__ == '__main__':
    greet('shafeen')
