<?php

require_once('Person.php');

class PersonTest extends PHPUnit_Framework_TestCase
{
    public function testGetters() {
        $p = new Person('John Doe', 100);
        $this->assertEquals('John Doe', $p->getName());
        $this->assertEquals(102, $p->getAge());
    }
}
