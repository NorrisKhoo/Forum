#!/usr/local/bin/php -d display_errors=STDOUT
<?php

    // Norris Khoo

    $db = "forum.db";
    date_default_timezone_set('America/Los_Angeles');
    try  
    {     
         $db = new SQLite3($db);
    }
    catch (Exception $exception)
    {
        echo '<p>There was an error connecting to the database!</p>';
        if ($db)
        {
            echo $exception->getMessage();
        }     
    }

    $table = "posts";
    $field1 = "sequence";
    $field2 = "level";
    $field3 = "time";
    $field4 = "author";
    $field5 = "text";
    $field6 = "color";
    $field7 = "font";
    $field8 = "size";
    $field9 = "emphasis";
    $field10 = "vote";

    $sequence = (int)$_GET['sequence']+1;
    $level = (int)$_GET['level'];
    $time = time();
    $author = $_GET['author'];
    $text = $_GET['content'];
    $color = $_GET['color'];
    $font = $_GET['font'];
    $size = $_GET['size'] + 0;
    $emphasis = $_GET['emphasis'];
    $vote = 0;

    $sql = "UPDATE $table SET $field1=($field1+1) WHERE $field1>=$sequence;";
    $result = $db->query($sql);

    if ($level != 4){
        $level = $level + 1;
    }

    $sql = "INSERT INTO $table ($field1, $field2, $field3, $field4, $field5, $field6, $field7, $field8, $field9, $field10) VALUES ($sequence, $level, $time, '$author', '$text', '$color', '$font', $size, '$emphasis', $vote);";
    $result = $db->query($sql);
?>