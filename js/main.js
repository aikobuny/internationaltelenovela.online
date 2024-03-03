/*! Main Script */
function loadPrograms(type) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let data = JSON.parse(xhttp.responseText);
        let programs_count = data.length;
        console.log(data);
        if (type == "featured") {
            for (let i = 0; i < programs_count; i++) {
                let a = document.getElementsByClassName("programs_featured")[0];
                let box = document.createElement('div');
                box.classList.add('box');
                a.appendChild(box);
                let thumbnail_box = document.createElement('div');
                thumbnail_box.classList.add('thumbnail-box')
                box.appendChild(thumbnail_box);
                let img = document.createElement('img');
                img.setAttribute("src", data[i]["thumbnail"])
                thumbnail_box.appendChild(img);
            }
        }
    }
    if (type == "featured") {
        xhttp.open("GET", "api/featured.json");
    }
    xhttp.send();
}

function loadNews() {
    ;
}