<?php

class TemplateTest extends PHPUnit_Framework_TestCase
{
    // TODO: run this test correctly to verify that PHPUnit is working
    public function testBasicMustacheTemplate() {
        $mustacheFileLoader = new Mustache_Engine([
            'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/../templates/')
        ]);
        $templateFileName = 'hello'; // .mustache appended automatically
        $values = ['planet' => 'World!'];
        $this->assertEquals('Hello World!', $mustacheFileLoader->render($templateFileName, $values));
    }
}