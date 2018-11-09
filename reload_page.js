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

function display_page(update_string){
    container = document.getElementsByClassName('container')[0];
    div_array = container.children;

    update_array = update_string.split('_');
    update_matrix = new Array();

    for(var i = 1; i < update_array.length; ++i){
        update_matrix.push(update_array[i].split(","));
    }

    div_number = div_array.length + update_matrix.length;

    for(var i = 0; i < update_matrix.length; ++i){
        for(var j = i + 1; j < update_matrix.length; ++j){
            update_matrix[j][0] = parseInt(update_matrix[j][0]);
        }

        current = parseInt(update_matrix[i][0]);

        cookie_date = new Date(2020, 1, 1, 1);
        cookie_data = document.cookie.split(";");
        cookie_matrix = new Array();
        for(var j = 0; j < cookie_data.length; ++j){
            cookie_matrix.push(cookie_data[j].split("="));
        }

        cookie_exist = -1;
        for(var j = 0; j < cookie_matrix.length; ++j){
            if(cookie_matrix[j][0] == "vote_history"){
                cookie_exist = j;
            }
        }

        to_add = true;
        if(cookie_exist == -1){
            document.cookie = "vote_history = " + "" + "; expires = " + cookie_date.toGMTString();
        } else{
            current_cookie = cookie_matrix[cookie_exist][1].split(",");
            for(var j = 0; j < current_cookie.length; ++j){
                if(parseInt(current_cookie[j]) >= current){
                    current_cookie[j] = (parseInt(current_cookie[j]) + 1).toString();
                }
            }
            document.cookie = "vote_history = " + current_cookie.join(",") + "; expires = " + cookie_date.toGMTString();
        }

        for(var j = div_number; j >= current; --j){
            r_id = "r" + j;
            s_id = "s" + j;

            r_div = document.getElementById(r_id);
            s_div = document.getElementById(s_id);

            if(r_div){
                r_id = "r" + parseInt(j + 1);
                s_id = "s" + parseInt(j + 1);

                r_div.setAttribute('id', r_id);
                s_div.setAttribute('id', s_id);
            }
        }

        r_value = "r" + update_matrix[i][0];
        s_value = "s" + update_matrix[i][0];
        level = "level_" + update_matrix[i][1];
        content = "content_" + update_matrix[i][1];
        time = "Time: " + update_matrix[i][2];
        author = "Author: " + update_matrix[i][3];

        up_div = document.createElement('div');
        up_div.setAttribute('class', 'up');
        up_div.onclick = function(){
            current = this.parentNode.parentNode;
            target = current.children[2];
            id_value = target.getAttribute('id').split('s')[1];
            query_string = "sequence=" + id_value + "&vote=yes";

            cookie_date = new Date(2020, 1, 1, 1);
            cookie_data = document.cookie.split(";");

            cookie_matrix = new Array();
            for(var i = 0; i < cookie_data.length; ++i){
                cookie_matrix.push(cookie_data[i].split("="));
            }

            cookieExist = -1;
            for(var i = 0; i < cookie_matrix.length; ++i){
                if(cookie_matrix[i][0] == "vote_history"){
                    cookieExist = i;
                }
            }

            toAdd = true;
            if(cookieExist == -1){
                document.cookie = "vote_history = " + id_value + "; expires = " + cookie_date.toGMTString();

                xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () 
                {
                    if (xhr.readyState == 4 && xhr.status == 200) 
                    {
                        var result = xhr.responseText;
                        display_result(result);
                    }
                }   
                xhr.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/process_vote.php?" + query_string, true);
                xhr.send(null);

            } else{
                current_cookie = cookie_matrix[cookieExist][1].split(",");
                for(var i = 0; i < current_cookie.length; ++i){
                    if(current_cookie[i] == id_value){
                        toAdd = false;
                    }
                }
                if(toAdd){
                    newCookie = current_cookie + "," + id_value;
                    document.cookie = "vote_history = " + newCookie + "; expires = " + cookie_date.toGMTString();

                    xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () 
                    {
                        if (xhr.readyState == 4 && xhr.status == 200) 
                        {
                            var result = xhr.responseText;
                            display_result(result);
                        }
                    }   
                    xhr.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/process_vote.php?" + query_string, true);
                    xhr.send(null);

                } else{
                    alert("Sorry you have already voted");
                }
            }
        }
        up_div.innerHTML = '^';

        down_div = document.createElement('div');
        down_div.setAttribute('class', 'down');
        down_div.onclick = function(){
            current = this.parentNode.parentNode;
            target = current.children[2];
            id_value = target.getAttribute('id').split('s')[1];
            query_string = "sequence=" + id_value + "&vote=no";

            cookie_date = new Date(2020, 1, 1, 1);
            cookie_data = document.cookie.split(";");

            cookie_matrix = new Array();
            for(var i = 0; i < cookie_data.length; ++i){
                cookie_matrix.push(cookie_data[i].split("="));
            }

            cookieExist = -1;
            for(var i = 0; i < cookie_matrix.length; ++i){
                if(cookie_matrix[i][0] == "vote_history"){
                    cookieExist = i;
                }
            }

            toAdd = true;
            if(cookieExist == -1){
                document.cookie = "vote_history = " + id_value + "; expires = " + cookie_date.toGMTString();

                xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () 
                {
                    if (xhr.readyState == 4 && xhr.status == 200) 
                    {
                        var result = xhr.responseText;
                        display_result(result);
                    }
                }   
                xhr.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/process_vote.php?" + query_string, true);
                xhr.send(null);

            } else{
                current_cookie = cookie_matrix[cookieExist][1].split(",");
                for(var i = 0; i < current_cookie.length; ++i){
                    if(current_cookie[i] == id_value){
                        toAdd = false;
                    }
                }
                if(toAdd){
                    newCookie = current_cookie + "," + id_value;
                    document.cookie = "vote_history = " + newCookie + "; expires = " + cookie_date.toGMTString();

                    xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () 
                    {
                        if (xhr.readyState == 4 && xhr.status == 200) 
                        {
                            var result = xhr.responseText;
                            display_result(result);
                        }
                    }   
                    xhr.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/process_vote.php?" + query_string, true);
                    xhr.send(null);

                } else{
                    alert("Sorry you have already voted");
                }
            }
        }
        down_div.innerHTML = 'v';

        wrapper_div = document.createElement('div');
        wrapper_div.setAttribute('class', 'wrapper');
        wrapper_div.appendChild(up_div);
        wrapper_div.appendChild(down_div);

        vote_div = document.createElement('div');
        vote_div.setAttribute('class', 'vote');
        vote_div.innerHTML = update_matrix[i][9];

        inner_div = document.createElement('div');
        inner_div.setAttribute('class', content);
        inner_div.setAttribute('id', s_value);
        inner_div.onclick = function() {
            popup = document.getElementsByClassName('outer_popup')[0];
            popup.style.display = 'block';

            legend = document.getElementsByClassName('thread')[0];
            legend.innerHTML = 'Comment on an existing thread';

            sequence = document.getElementById('sequence');
            id_value = this.getAttribute('id').split('s')[1];
            sequence.setAttribute('value', id_value);

            level = document.getElementById('level');
            level_value = this.getAttribute('class').split('_')[1];
            level.setAttribute('value', level_value);
        };
        inner_div.style.color = update_matrix[i][5];
        inner_div.style.fontSize = update_matrix[i][7] + "px";
        inner_div.style.fontStyle = update_matrix[i][8];
        inner_div.style.font = update_matrix[i][6];
        inner_div.innerHTML = update_matrix[i][4];

        author_span = document.createElement('span');
        author_span.setAttribute('class', 'author');
        author_span.innerHTML = author;

        time_span = document.createElement('span');
        time_span.setAttribute('class', 'time');
        time_span.innerHTML = time;

        horizontal = document.createElement('hr');
        spacer = document.createElement('span');
        spacer.innerHTML = " ";

        inner_div.appendChild(horizontal);
        inner_div.appendChild(author_span);
        inner_div.appendChild(spacer);
        inner_div.appendChild(time_span);

        outer_div = document.createElement('div');
        outer_div.setAttribute('class', level);
        outer_div.setAttribute('id', r_value);

        outer_div.appendChild(wrapper_div);
        outer_div.appendChild(vote_div);
        outer_div.appendChild(inner_div);

        r_next = "r" + parseInt(current + 1);
        nextNode = document.getElementById(r_next);
        container.insertBefore(outer_div,nextNode);
    }
}

function reload_page(){
    query_string = "update=yes";

    xhr_reload_page = new XMLHttpRequest();
    xhr_reload_page.onreadystatechange = function () 
    {
        if (xhr_reload_page.readyState == 4 && xhr_reload_page.status == 200) 
        {
            var result = xhr_reload_page.responseText;
            display_page(result);
        }
    }
    xhr_reload_page.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/reload_page.php?" + query_string, true);
    xhr_reload_page.send(null);

    setTimeout("reload_page()", 4000);
}
