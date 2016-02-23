<?php

require 'Mustache/Autoloader.php';
Mustache_Autoloader::register();

function mustacheBasic() {
    $mustache = new Mustache_Engine;
    $template = 'Hello {{planet}}';
    $values = ['planet' => 'World!'];
    echo $mustache->render($template, $values);
}

function mustacheBasicFromFile() {
    $mustacheFileLoader = new Mustache_Engine([
        'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/')
    ]);
    $templateFileName = 'hello'; // .mustache appended automatically
    $values = ['planet' => 'World!'];
    echo $mustacheFileLoader->render($templateFileName, $values);
}

function mustacheBasicHtmlFromFile() {
    $mustacheFileLoader = new Mustache_Engine([
        'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/')
    ]);
    $templateFileName = 'basic'; // .mustache appended automatically
    $basicValues = [
        'title' => 'a basic title',
        'paragraph1' => 'This is the first paragraph',
        'paragraph2' => 'This is the second paragraph',
    ];
    echo $mustacheFileLoader->render($templateFileName, $basicValues);
}
