<?php

class Person
{
    private $name;
    private $age;

    function __construct($name, $age) {
        $this->name = $name;
        $this->age = (int)$age;
    }

    /** @return string */
    public function getName() {
        return $this->name;
    }

    /** @return int */
    public function getAge() {
        return $this->age;
    }


}