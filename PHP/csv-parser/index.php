<?php

const CSV_FILENAME = 'sample.csv';

$row = 1;
if (($handle = fopen(CSV_FILENAME, "r")) !== FALSE) {
    while (($columns = fgetcsv($handle, 1000, ",")) !== FALSE) {
        // perform whatever logic you want here
        echo implode(',', $columns)."\n";
    }
    fclose($handle);
}
