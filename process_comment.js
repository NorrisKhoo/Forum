// Norris Khoo

function process_new(object){
    popup = document.getElementsByClassName('outer_popup')[0];
    popup.style.display = 'block';

    legend = document.getElementsByClassName('thread')[0];
    legend.innerHTML = 'Create a new thread';

    sequence = document.getElementById('sequence');
    sequence_value = document.getElementsByClassName('author').length;
    sequence.setAttribute('value', sequence_value);

    level_value = 0;
    level.setAttribute('value', level_value);    
}

function process_comment(object){
    popup = document.getElementsByClassName('outer_popup')[0];
    popup.style.display = 'block';

    legend = document.getElementsByClassName('thread')[0];
    legend.innerHTML = 'Comment on an existing thread';

    sequence = document.getElementById('sequence');
    id_value = object.getAttribute('id').split('s')[1];
    sequence.setAttribute('value', id_value);

    level = document.getElementById('level');
    level_value = object.getAttribute('class').split('_')[1];
    level.setAttribute('value', level_value);
}

function ajax_form(){
    content = document.getElementById("content");
    value_content = "content=" + content.value;
    content.value = "";

    author = document.getElementById("author");
    value_author = "author=" + author.value;
    author.value = "";

    sequence = document.getElementById("sequence");
    value_sequence = "sequence=" + sequence.value;
    sequence.value = "";

    level = document.getElementById("level");
    value_level = "level=" + level.value;
    level.value = "";

    size = document.getElementById("size");
    value_size = "size=" + size.value;
    size.value = "12";

    normal = document.getElementById("normal");
    bold = document.getElementById("bold");
    italic = document.getElementById("italic");
    if(normal.checked){
        value_emphasis = "emphasis=" + normal.value;
    }
    if(bold.checked){
        value_emphasis = "emphasis=" + bold.value;
    }
    if(italic.checked){
        value_emphasis = "emphasis=" + italic.value;
    }
    normal.checked = true;

    arial = document.getElementById("arial");
    helvetica = document.getElementById("helvetica")
    verdana = document.getElementById("verdana")
    courier = document.getElementById("courier")
    if(arial.checked){
        value_font = "font=" + arial.value;
    }
    if(helvetica.checked){
        value_font = "font=" + helvetica.value;
    }
    if(verdana.checked){
        value_font = "font=" + verdana.value;
    }
    if(courier.checked){
        value_font = "font=" + courier.value;
    }
    arial.checked = true;

    blue = document.getElementById("blue")
    red = document.getElementById("red")
    green = document.getElementById("green")
    black = document.getElementById("black")
    if(blue.checked){
        value_color = "color=" + blue.value;
    }
    if(red.checked){
        value_color = "color=" + red.value;
    }
    if(green.checked){
        value_color = "color=" + green.value;
    }
    if(black.checked){
        value_color = "color=" + black.value;
    }
    blue.checked = true;

    popup = document.getElementsByClassName('outer_popup')[0];
    popup.style.display = 'none';

    output_array = [value_content, value_author, value_sequence, value_level, value_size, value_emphasis, value_font, value_color];
    output_string = output_array.join("&");

    xhr_process_comment = new XMLHttpRequest();
    xhr_process_comment.open("GET", "http://pic.ucla.edu/~norriskhoo/final_project/process_comment.php?" + output_string, true);
    xhr_process_comment.send(null);
}