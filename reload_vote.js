// Norris Khoo

function display_vote(update_vote){
    vote_array = document.getElementsByClassName('vote');
    update_array = update_vote.split(",");

    for(var i = 0; i < vote_array.length; ++i){
        vote_array[i].innerHTML = update_array[i];
    }
}

function reload_vote(){
    query_string = "update=yes";

    xhr_reload_vote = new XMLHttpRequest();
    xhr_reload_vote.onreadystatechange = function () 
    {
        if (xhr_reload_vote.readyState == 4 && xhr_reload_vote.status == 200) 
        {
            var result = xhr_reload_vote.responseText;
            display_vote(result);
        }
    }
    xhr_reload_vote.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/reload_vote.php?" + query_string, true);
    xhr_reload_vote.send(null);

    setTimeout("reload_vote()", 1000);
}
