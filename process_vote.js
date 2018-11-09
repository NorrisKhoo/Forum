// Norris Khoo

function display_result(result_string){
    result_array = result_string.split(",");
    sequence = result_array[0];
    vote = result_array[1];

    id_value = "r" + sequence;
    current = document.getElementById(id_value);

    vote_div = current.children[1];
    vote_div.innerHTML = vote;
}

function vote_yes(object){
    current = object.parentNode.parentNode;
    target = current.children[2];
    id_value = target.getAttribute('id').split('s')[1];
    query_string = "sequence=" + id_value + "&vote=yes";

    cookie_date = new Date(2020, 1, 1, 1);
    cookie_data = document.cookie.split(";");

    cookie_matrix = new Array();
    for(var i = 0; i < cookie_data.length; ++i){
        cookie_matrix.push(cookie_data[i].split("="));
    }

    cookie_exist = -1;
    for(var i = 0; i < cookie_matrix.length; ++i){
        if(cookie_matrix[i][0] == "vote_history"){
            cookie_exist = i;
        }
    }

    to_add = true;
    if(cookie_exist == -1){
        document.cookie = "vote_history = " + id_value + "; expires = " + cookie_date.toGMTString();

        xhr_vote_yes = new XMLHttpRequest();
        xhr_vote_yes.onreadystatechange = function () 
        {
            if (xhr_vote_yes.readyState == 4 && xhr_vote_yes.status == 200) 
            {
                var result = xhr_vote_yes.responseText;
                display_result(result);
            }
        }   
        xhr_vote_yes.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/process_vote.php?" + query_string, true);
        xhr_vote_yes.send(null);

    } else{
        current_cookie = cookie_matrix[cookie_exist][1].split(",");
        for(var i = 0; i < current_cookie.length; ++i){
            if(current_cookie[i] == id_value){
                to_add = false;
            }
        }
        if(to_add){
            newCookie = current_cookie + "," + id_value;
            document.cookie = "vote_history = " + newCookie + "; expires = " + cookie_date.toGMTString();

            xhr_vote_yes = new XMLHttpRequest();
            xhr_vote_yes.onreadystatechange = function () 
            {
                if (xhr_vote_yes.readyState == 4 && xhr_vote_yes.status == 200) 
                {
                    var result = xhr_vote_yes.responseText;
                    display_result(result);
                }
            }   
            xhr_vote_yes.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/process_vote.php?" + query_string, true);
            xhr_vote_yes.send(null);

        } else{
            alert("Sorry you have already voted");
        }
    }
}

function vote_no(object){
    current = object.parentNode.parentNode;
    target = current.children[2];
    id_value = target.getAttribute('id').split('s')[1];
    query_string = "sequence=" + id_value + "&vote=no";

    cookie_date = new Date(2020, 1, 1, 1);
    cookie_data = document.cookie.split(";");

    cookie_matrix = new Array();
    for(var i = 0; i < cookie_data.length; ++i){
        cookie_matrix.push(cookie_data[i].split("="));
    }

    cookie_exist = -1;
    for(var i = 0; i < cookie_matrix.length; ++i){
        if(cookie_matrix[i][0] == "vote_history"){
            cookie_exist = i;
        }
    }

    to_add = true;
    if(cookie_exist == -1){
        document.cookie = "vote_history = " + id_value + "; expires = " + cookie_date.toGMTString();

        xhr_vote_no = new XMLHttpRequest();
        xhr_vote_no.onreadystatechange = function () 
        {
            if (xhr_vote_no.readyState == 4 && xhr_vote_no.status == 200) 
            {
                var result = xhr_vote_no.responseText;
                display_result(result);
            }
        }   
        xhr_vote_no.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/process_vote.php?" + query_string, true);
        xhr_vote_no.send(null);

    } else{
        current_cookie = cookie_matrix[cookie_exist][1].split(",");
        for(var i = 0; i < current_cookie.length; ++i){
            if(current_cookie[i] == id_value){
                to_add = false;
            }
        }
        if(to_add){
            newCookie = current_cookie + "," + id_value;
            document.cookie = "vote_history = " + newCookie + "; expires = " + cookie_date.toGMTString();

            xhr_vote_no = new XMLHttpRequest();
            xhr_vote_no.onreadystatechange = function () 
            {
                if (xhr_vote_no.readyState == 4 && xhr_vote_no.status == 200) 
                {
                    var result = xhr_vote_no.responseText;
                    display_result(result);
                }
            }   
            xhr_vote_no.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/process_vote.php?" + query_string, true);
            xhr_vote_no.send(null);

        } else{
            alert("Sorry you have already voted");
        }
    }
}


