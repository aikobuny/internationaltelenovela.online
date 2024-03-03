/*! Main Script */
function includeHTML()
{
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }      
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};

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
            for (let _i = 0; _i < selection.length; _i++) {
                let country = selection[_i].slice(-2)
                let programs_count = data[country].length;
                for (let i = 0; i < programs_count; i++) {
                    let a = document.getElementsByClassName("programs_"+selection[_i])[0];
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
            "programs_featured",
        ];
        xhttp.open("GET", "api/featured.json");
    }
    if (type == "all") {
        selection = [
            "MY",
            "PH",
            "TH",
            "MX",
        ];
        xhttp.open("GET", "api/programs.json")
    }
    xhttp.send();
    return data
}

function topnav_activator() {
    let pathname = window.location.pathname;
    let sel = ""
    if (pathname == "/") {
        sel = "nav-home";
    }
    if (pathname == "/programs") {
        sel = "nav-programs";
    }
    if (pathname == "/academy") {
        sel = "nav-academy";
    }
    if (pathname == "/about") {
        sel = "nav-about";
    }
    if (pathname == "/contact") {
        sel = "nav-contact";
    }
    document.getElementById(sel).classList.add("active");
}

window.addEventListener('load', function() {
    includeHTML();
    
})
window.onload = function () {
    setTimeout(()=>{
        topnav_activator();
    }, 1000)
}