#!/usr/local/bin/php -d display_errors=STDOUT
<?php

    // Norris Khoo

    $database = "forum.db";
    date_default_timezone_set('America/Los_Angeles');
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
    $field2 = "level";
    $field3 = "time";
    $field4 = "author";
    $field5 = "text";
    $field6 = "color";
    $field7 = "font";
    $field8 = "size";
    $field9 = "emphasis";
    $field10 = "vote";

    $new_time = time();
    $new_date = new DateTime("@" . $new_time);

    $sql = "SELECT * FROM $table ORDER BY $field1;";
    $result = $db->query($sql);

    $output_string = "";
    while($record = $result->fetchArray()){
        $old_time = $record[$field3];
        $old_date = new DateTime("@" . $old_time);

        $interval = $new_date->diff($old_date);
        $elapsed = $interval->format('%d days %H hours %i minutes %s seconds');

        $output_string = $output_string . "$elapsed,";
    }
    echo $output_string;
?>