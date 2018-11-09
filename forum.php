#!/usr/local/bin/php -d display_errors=STDOUT
<?php
print '<?xml version = "1.0" encoding="utf-8"?>';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
 "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
        <meta name="authors" content="Norris Khoo (004-420-262)"/>
        <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8"/>
        <title>Forum</title>
        <link rel="stylesheet" type="text/css" href="forum.css?v=2" />
        <script type="text/javascript" src="forum.js"></script>
        <script type="text/javascript" src="process_comment.js"></script>
        <script type="text/javascript" src="process_vote.js"></script>
        <script type="text/javascript" src="reload_page.js"></script>
        <script type="text/javascript" src="reload_time.js"></script>
        <script type="text/javascript" src="reload_vote.js"></script>
    </head>

    <body onload="start()">
        <div class="header">
            <h1>Norris' Forum</h1>
            <p>Welcome to my forum! Click on <i>Create a new thread</i> to start a new conversation! Or click on an existing thread to add to the conversation! Please do not include , or _ in your text. Have fun!</p>        
        </div>

        <div class="create" onclick="process_new(this)">Create a new thread</div>

        <div class="outer_popup">
            <span class="exit" onclick="exit_form()">X</span>
            <div class="inner_popup">
                <form action="process_comment.php" method="get">
                    <fieldset>
                    <legend class="thread"></legend>
                    <div class="text_input">
                        <label for="content">Type your message here:</label><br/>
                        <textarea name="content" id="content" rows="10" cols="80"></textarea><br/>

                        <label for="author">Type your name here:</label>
                        <input type="text" name="author" id="author"/>

                        <input type="hidden" name="sequence" id="sequence" value=""/>
                        <input type="hidden" name="level" id="level" value=""/>
                    </div>
                    <hr/>
                    <div class="radio_input">
                        <table>
                            <tr>
                                <td>
                                    <label for="size">Font Size</label>
                                </td>
                                <td>
                                    <select name="size" id="size">
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                        <option value="32">32</option>
                                        <option value="33">33</option>
                                        <option value="34">34</option>
                                        <option value="35">35</option>
                                        <option value="36">36</option>
                                    </select>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="emphasis" value="normal" id="normal" checked="checked"/>
                                    <label for="normal">Normal</label>
                                </td>
                                <td>
                                    <input type="radio" name="emphasis" value="bold" id="bold"/>
                                    <label for="bold">Bold</label>
                                </td>
                                <td>
                                    <input type="radio" name="emphasis" value="italic" id="italic"/>
                                    <label for="italic">Italic</label>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="font" value="arial" id="arial" checked="checked"/>
                                    <label for="arial">Arial</label>
                                </td>
                                <td>
                                    <input type="radio" name="font" value="helvetica" id="helvetica"/>
                                    <label for="helvetica">Helvetica</label>
                                </td>
                                <td>
                                    <input type="radio" name="font" value="verdana" id="verdana"/>
                                    <label for="verdana">Verdana</label>
                                </td>
                                <td>
                                    <input type="radio" name="font" value="courier" id="courier"/>
                                    <label for="courier">Courier</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="color" value="blue" id="blue" checked="checked"/>
                                    <label for="blue">Blue</label>
                                </td>
                                <td>
                                    <input type="radio" name="color" value="red" id="red"/>
                                    <label for="red">Red</label>
                                </td>
                                <td>
                                    <input type="radio" name="color" value="green" id="green"/>
                                    <label for="green">Green</label>
                                </td>
                                <td>
                                    <input type="radio" name="color" value="black" id="black"/>
                                    <label for="black">Black</label>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <hr/>
                    <div class="submit_input">
                        <input type="reset"/>
                        <input type="button" value="Submit" onclick="ajax_form()"/>
                    </div>
                    </fieldset>
                </form>
            </div>
        </div>

        <div class="container">
        <?php
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
            $field2 = "level";
            $field3 = "time";
            $field4 = "author";
            $field5 = "text";
            $field6 = "color";
            $field7 = "font";
            $field8 = "size";
            $field9 = "emphasis";
            $field10 = "vote";

            date_default_timezone_set('America/Los_Angeles');
            $new_time = time();
            $new_date = new DateTime("@" . $new_time);

            $sql = "SELECT * FROM $table WHERE $field1>0 ORDER BY $field1";
            $result = $db->query($sql);
            while($record = $result->fetchArray()){
                $old_time = $record[$field3];
                $old_date = new DateTime("@" . $old_time);

                $interval = $new_date->diff($old_date);
                $elapsed = $interval->format('%d days %H hours %i minutes %s seconds');

                echo "<div id='r" . $record[$field1] . "' class='level_" . $record[$field2] . "'><div class='wrapper'><div class='up' onclick='vote_yes(this)'>^</div><div class='down' onclick='vote_no(this)'>v</div></div><div class='vote'>" . $record[$field10] . "</div><div class='content_" . $record[$field2] . "' style='color:" . $record[$field6] . ";font-size:" . $record[$field8] . "px;font-style:" . $record[$field9] . ";font:" . $record[$field7] . "' id='s" . $record[$field1] . "' onclick='process_comment(this)'>" . $record[$field5] . "<hr/><span class='author'>Author: " . $record[$field4] . "</span> <span class='time'>Posted " . $elapsed . " ago</span> </div></div>";
            }
        ?>
        </div>
    </body>
</html>
