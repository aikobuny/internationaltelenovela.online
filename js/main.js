/*! Main Script */
function loadPrograms(type) {
    let xhttp = new XMLHttpRequest();
    let data;
    let selection = [];
    xhttp.onload = function() {
        data = JSON.parse(xhttp.responseText);
        if (type == "featured") {
            let programs_count = data.length;
            for (let i = 0; i < programs_count; i++) {
                let a = document.getElementsByClassName(selection[0])[0];
                let box = document.createElement("div");
                box.classList.add("box");
                a.appendChild(box);
                let thumbnail_box = document.createElement("div");
                thumbnail_box.classList.add("thumbnail-box")
                box.appendChild(thumbnail_box);
                let img = document.createElement("img");
                img.setAttribute("src", data[i]["thumbnail"])
                thumbnail_box.appendChild(img);
    
                let detail_box = document.createElement("div");
                detail_box.classList.add("detail-box");
                box.appendChild(detail_box);
                let h5 = document.createElement("h5");
                h5.innerHTML = data[i]["name"];
                detail_box.appendChild(h5);
                let p = document.createElement("p");
                p.innerHTML = data[i]["desc"]
                detail_box.appendChild(p)
            }
        } else {
            for (let _i = 0; i < selection.length; i++) {
                let country = selection[_i].slice(-2)
                let programs_count = data[country].length;
                for (let i = 0; i < programs_count; i++) {
                    let a = document.getElementsByClassName(selection[_i])[0];
                    let box = document.createElement("div");
                    box.classList.add("box");
                    a.appendChild(box);
                    let thumbnail_box = document.createElement("div");
                    thumbnail_box.classList.add("thumbnail-box")
                    box.appendChild(thumbnail_box);
                    let img = document.createElement("img");
                    img.setAttribute("src", data[country][i]["thumbnail"])
                    thumbnail_box.appendChild(img);
        
                    let detail_box = document.createElement("div");
                    detail_box.classList.add("detail-box");
                    box.appendChild(detail_box);
                    let h5 = document.createElement("h5");
                    h5.innerHTML = data[country][i]["name"];
                    detail_box.appendChild(h5);
                    let p = document.createElement("p");
                    p.innerHTML = data[country][i]["desc"]
                    detail_box.appendChild(p)
                }
            }
        }
        
    }
    if (type == "featured") {
        selection = [
            "programs_featured"
        ];
        xhttp.open("GET", "api/featured.json");
    }
    if (type == "all") {
        selection = [
            "programs_MY"
        ];
        xhttp.open("GET", "api/programs.json")
    }
    xhttp.send();
    return data
}