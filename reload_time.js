// Norris Khoo

function display_time(update_time){
    time_array = document.getElementsByClassName('time');
    update_array = update_time.split(",");

    for(var i = 0; i < time_array.length; ++i){
        time_array[i].innerHTML = "Posted " + update_array[i] + " ago";
    }
}

function reload_time(){
    query_string = "update=yes";

    xhr_reload_time = new XMLHttpRequest();
    xhr_reload_time.onreadystatechange = function () 
    {
        if (xhr_reload_time.readyState == 4 && xhr_reload_time.status == 200) 
        {
            var result = xhr_reload_time.responseText;
            display_time(result);
        }
    }
    xhr_reload_time.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/reload_time.php?" + query_string, true);
    xhr_reload_time.send(null);

    setTimeout("reload_time()", 60000);
}
