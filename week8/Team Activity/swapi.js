let htmlElement = document.getElementById("people-container");
let url = 'https://swapi.dev/api/people/?page=5';
let nextUrl = "";
let prevUrl = "";
let prevLink = document.getElementById("prevlink");
let nextLink = document.getElementById("nextlink");

window.addEventListener('load', fetchData(url));

function fetchData(urlData) {
    nextUrl = "";
    prevUrl = "";
    htmlElement.innerHTML = "";
    console.log(`fetching ${urlData}`);
    fetch(urlData)
    .then( response => {
        if(response.ok) {
            console.log(response);
            return response;
    }
        throw Error('Checking error: ' + response.statusText);
    })
    .then( response => response.json() )
    .then( data => renderData(data, htmlElement))
    .catch( err => console.log(" Rendering error: " + err))
}

function renderData(jsonData, element) {
    if (jsonData.previous) {
        prevUrl = jsonData.previous;
        console.log(prevUrl);
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            fetchData(prevUrl);
        });
        prevLink.disabled = false;
    } else {prevLink.disabled = true; console.log('no prev url');};
    if (jsonData.next) {
        nextUrl = jsonData.next;
        console.log(nextUrl);
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            fetchData(nextUrl);
        })
        nextLink.disabled = false;
    } else {nextLink.disabled = true; console.log('no next url')};
    const block = jsonData.results;

    block.forEach( person => {
        let newelement = 
        `<div class="person">
            <div class="person-name">${person.name}</div>
            <div class="person-gender">${person.gender}</div>
            <div class="person-age">${person.birth_year}</div>
        </div>`
        element.innerHTML = element.innerHTML + newelement;
    });
}

