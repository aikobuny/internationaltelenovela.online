/*! Main Script */
function loadFeature() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let data = JSON.parse(xhttp.responseText);
        console.log(data);
    }
    xhttp.open("GET", "api/featured.json");
    xhttp.send();
}

function loadNews() {
    ;
}