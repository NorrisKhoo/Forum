#!/usr/local/bin/php -d display_errors=STDOUT
<?php

    // Norris Khoo

    $database = "forum.db";
    try  
    {     
        $db = new SQLite3($database);
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
    $field2 = "vote";

    $sequence = $_GET['sequence'];
    $vote = $_GET['vote'];

    if($vote == 'yes'){
        $sql = "SELECT * FROM $table WHERE sequence=$sequence;";
        $record = $db->query($sql);
        $result = $record->fetchArray();

        $result[$field2] = $result[$field2] + 1;
        echo $result[$field1] . "," . $result[$field2];

        $sql = "UPDATE $table SET $field2=$result[$field2] WHERE sequence=$sequence;";
        $update = $db->query($sql);
    }

    if($vote == "no"){
        $sql = "SELECT * FROM $table WHERE sequence=$sequence;";
        $record = $db->query($sql);
        $result = $record->fetchArray();

        $result[$field2] = $result[$field2] - 1;
        echo $result[$field1] . "," . $result[$field2];

        $sql = "UPDATE $table SET $field2=$result[$field2] WHERE sequence=$sequence;";
        $update = $db->query($sql);
    }
?>