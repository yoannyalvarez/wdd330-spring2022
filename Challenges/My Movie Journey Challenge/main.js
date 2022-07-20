//query elements
const searchButton = document.getElementById('searchBtn');
let htmlElement = document.getElementById('list'); 
const favsButton = document.getElementById('showFavsButton');
const goToSearchButton = document.getElementById('goToSearchButton');
const startButton = document.getElementById('startButton');
const welcomeSection = document.getElementById('startSection');
const formSection = document.getElementById('searchSection');
let titleInp = document.getElementById('title');
let yearInp = document.getElementById('year');
let typeInp = document.getElementById('type');





//global variables
const baseUrl = 'http://www.omdbapi.com/?';
const apiKey = '6dfb3cbf';





//classes
class Favorites {
    constructor() {
        this.id = 'myList';
        this.listArray = getFromLS(this.id) ? [...getFromLS(this.id)] : [];
    }

    appendToList(obj) {
        this.listArray.push(obj);
        this.addToList();
    }

    getList(element) {
        let array = getFromLS(this.id);
        this.showList(array, element);
    }

    addToList() {
        addToLS(this.id, this.listArray);
    }

    removeFromList(obj) {
        this.listArray.forEach(object => {
            if (object.imdbID == obj.imdbID) {
                const index = this.listArray.indexOf(object);
                if (index > -1) { // only splice array when item is found
                    this.listArray.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
        });
        this.addToList();
    }

    showList(array, element) {
        renderList(array, element, 'Favorites'); 
    }

}





//initializing
let favoritesList = new Favorites();





//clases
class Result {
    constructor(data, typeList, currentPage) {
        this.typeList = typeList;
        this.Title = data.Title;
        this.Year = data.Year;
        this.Type = data.Type;
        this.Id = data.imdbID;
        this.Poster = data.Poster;
        this.currentPage = currentPage;
    }

    showResult() {
        return renderResult(this.Title, this.Year, this.Type, this.Poster, htmlElement);
    }

    async showDetails(base_url, api_key) {
        let url = `${base_url}i=${this.Id}&apikey=${api_key}`;
        

        console.log(url);
        let data = await fetchData(url);
        console.log(data);
        let details = new Details(data, this.typeList, this.currentPage);
        details.showDetails();

    }
}

class Details {
    constructor(data, typeList, currentPage) {
        this.imdbID = data.imdbID;
        this.Title = data.Title;
        this.Year = data.Year;
        this.Rated = data.Rated;
        this.Released = data.Released;
        this.Actors = data.Actors;
        this.Awards = data.Awards;
        this.Country = data.Country;
        this.Director = data.Director;
        this.Genre = data.Genre;
        this.Language = data.Language;
        this.Plot = data.Plot;
        this.Poster = data.Poster;
        this.Type = data.Type;
        this.Writer = data.Writer;
        this.typeList = typeList;
        this.currentPage = currentPage;
        this.BackButton = this.buildBackButton();
        this.AddToFavs = this.buildAddToFavsButton();
    }

    showDetails() {
        searchSection.classList.add('hidden');
        renderDetails( htmlElement, this.Title, this.Year, this.Rated,
                        this.Released, this.Actors, this.Awards, 
                        this.Country, this.Director, this.Genre,
                        this.Language, this.Plot, this.Poster, this.Type,
                        this.Writer, this.BackButton, this.AddToFavs );
    }

    buildBackButton() {
        let button = document.createElement('button');
        button.innerHTML = 'Back';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.typeList == 'Results') {
                searchSection.classList.remove('hidden');
                showListOfResults(this.currentPage);
            } else if (this.typeList == 'Favorites') {
                favoritesList.getList(htmlElement);
            }
        });
        return button;
    }

    buildAddToFavsButton() {
        let button = document.createElement('button');
        let isAdded = 'false';
        favoritesList.listArray.forEach(object => {  
            if (object.imdbID == this.imdbID) {
                isAdded = 'true';
            }

        });
        if (isAdded == 'false') {
            button.innerHTML = 'Add to Favorites';
            button.addEventListener('click', (e) => {
                favoritesList.appendToList(this);
                button.classList.add('clicked');
            });
        } else if (isAdded == 'true') {
            button.innerHTML = 'Delete from Favorites';
            button.addEventListener('click', (e) => {
                favoritesList.removeFromList(this);
                button.classList.add('clicked');
            });
        }
        return button;
    }
}






//utilities
function fetchData(urlData) {
    htmlElement.innerHTML = "";
    console.log(`fetching ${urlData}`);
    return fetch(urlData)
    .then( response => {
        if(response.ok) {
            console.log(response);
            return response;
    }
        throw Error('Checking error: ' + response.statusText);
    }) 
    .then( response => response.json() )
    .catch( err => console.log(" Rendering error: " + err) )
}

function buildUrl(base_url, api_key, p = 1) {
    let titleInp = document.getElementById('title').value;
    let yearInp = document.getElementById('year').value;
    let typeInp = document.getElementById('type').value;
    let url = `${base_url}s=${titleInp}&y=${yearInp}&type=${typeInp}&apikey=${api_key}&page=${p}`;
    return url;
}

async function showListOfResults(p = 1) {
    let url = buildUrl(baseUrl, apiKey, p);    
    let data = await fetchData(url);
    renderList(data.Search, htmlElement, 'Results', data.totalResults, p);
}

    //form validation

    //building pagination
    function buildingPagination(numberOfResults, currentPage) {
        let numberOfPages = Math.ceil(numberOfResults/10);
        let paginationHtml = document.createElement('ul');
        paginationHtml.classList.add('pagination');
        
        if (!(currentPage == 1)) {
            let backLink = buildPageLink(currentPage - 1);
            backLink.innerHTML = '<< Back';
            backLink.classList.add('moveLink');
            paginationHtml.appendChild(backLink);    
        }

        paginationHtml.appendChild(buildListOfPages(currentPage, numberOfPages));
        
        if (!(currentPage == numberOfPages)) {
            let nextLink = buildPageLink(currentPage + 1);
            nextLink.innerHTML = 'Next >>';
            nextLink.classList.add('moveLink');
            paginationHtml.appendChild(nextLink);    
        }

        return paginationHtml;
    }

    function buildListOfPages(currentPage, numberOfPages) {
        let listHTML = document.createElement('ul');
        listHTML.classList.add('listOfPages');
        
        let pieces = Math.ceil(numberOfPages/12);
        let location = 1;

        for (let piece = 1; piece <= pieces; piece++) {
            let counter = 12*piece;
            if (currentPage <= counter) {
                if (counter > numberOfPages) {
                    let neededPages = numberOfPages + 1 - location;
                    for (let i = 1; i <= neededPages; i++) {
                        let pageElement = buildPageLink(location, currentPage);
                        location = location + 1;
                        listHTML.appendChild(pageElement);
                    }
                    break;
                } else {
                    for (let i = 1; i <= 12; i++) {
                        let pageElement = buildPageLink(location, currentPage);
                        location = location + 1;
                        listHTML.appendChild(pageElement);
                    }
                    break;
                }
            } else {
                location = counter + 1;
            }
        }
        return listHTML;
    }

    function buildPageLink(number, currentPage) {
        let pageHtmlElement = document.createElement('li');
        pageHtmlElement.innerHTML = number;
        if (number == currentPage) {
            pageHtmlElement.classList.add('active');
        }
        pageHtmlElement.addEventListener('click', (e) => {
            e.preventDefault();
            showListOfResults(number);
        });
        return pageHtmlElement;
    }











//render functions
function renderList(array, element, title, numberOfResults, currentPage) {
    element.classList.add('list-result');
    element.innerHTML = `<h2 class='listHeader'>${title}</h2>`;
    

    if (array) {
        array.forEach(result => {
            let resultHTMLElement = document.createElement('div'); 
    
            let resultObj = new Result(result, title, currentPage);
            let resultHTML = resultObj.showResult();
            resultHTMLElement.innerHTML = resultHTML;
    
            resultHTMLElement.addEventListener('click', (e) => {
                e.preventDefault();
                resultObj.showDetails(baseUrl, apiKey);
            });
            element.appendChild(resultHTMLElement); 
        });
        if (title == 'Results') {
            let pagination = buildingPagination(numberOfResults, currentPage);
            element.appendChild(pagination);
        }
    } else { element.innerHTML = 'Empty list', array};
}

function renderResult(title, year, type, poster) {
    let result = 
        `
        <div class='result-container'>
            <h3>${title}</h3>
            <div class="image"><img src="${poster}" alt="${title}"/></div>
            <ul class='preview paragraph'>
                <li id='year'><span>Year:</span>${year}</li>
                <li id='year'><span>Type:</span>${type}</li>
            </ul>
        </div>
        `
    return result;
}

function renderDetails( element, title, year, rated, released, actors,
    awards, country, director, genre, language,
    plot, poster, type, writer, backButton, addToFavsButton ) {  
    htmlElement.classList.remove('list-result');
    htmlElement.classList.remove('hidden');

    let details = 
        `
        <div id='details-container'>
            <h3>${title}</h3>
            <div class="image"><img src="${poster}" alt="${title}"/></div>
            <div class='details paragraph'>
                <p>${plot}</p>
                <ul class='details-list'>                
                    <li id='year'><span>Year:</span>${year}</li>
                    <li id='type'><span>Rated:</span>${rated}</li>
                    <li id='year'><span>Released:</span>${released}</li>
                    <li id='type'><span>Actors:</span>${actors}</li>
                    <li id='year'><span>Awarsd:</span>${awards}</li>
                    <li id='type'><span>Country:</span>${country}</li>
                    <li id='year'><span>Director:</span>${director}</li>
                    <li id='type'><span>Genre:</span>${genre}</li>
                    <li id='year'><span>Languages:</span>${language}</li>
                    <li id='year'><span>Type:</span>${type}</li>
                    <li id='type'><span>Writer:</span>${writer}</li>
                </ul>
            </div>
        </div>
        `
    element.innerHTML = details;
    element.appendChild(backButton);
    element.appendChild(addToFavsButton);                
}






 
//form validation
function formValidation(title, year, button) {
    const titleError = document.querySelector('#title + span.error');
    const yearError = document.querySelector('#year + span.error');
    title.addEventListener('input', (e) => {
        if (title.validity.valid) {
          titleError.textContent = ''; // Reset the content of the message
          titleError.className = 'error'; // Reset the visual state of the message
        }
    });
    year.addEventListener('input', (e) => {
        if (year.validity.valid) {
          yearError.textContent = ''; // Reset the content of the message
          yearError.className = 'error'; // Reset the visual state of the message
        }
    });
    button.addEventListener('click', (e) => {
        let validate = 'true';
        if(!title.validity.valid) {
            titleError.textContent = 'This field is required.';
            titleError.className = 'error active';
            // If it isn't, we display an appropriate error message
            // Then we prevent the form from being sent by canceling the event
        } else {
            validate = 'false';
        }
        if(!year.validity.valid) {
            // If it isn't, we display an appropriate error message
            yearError.textContent = 'This should be a year.';
            yearError.className = 'error active';
            // Then we prevent the form from being sent by canceling the event
        } else {
            validate = 'false';
        }
        if (validate) {showListOfResults()}
    });
}













//events
formValidation(titleInp, yearInp, searchButton);

favsButton.addEventListener('click', (e) => {
    formSection.classList.add('hidden');
    welcomeSection.classList.add('hidden');
    htmlElement.classList.remove('hidden');
    favoritesList.getList(htmlElement);
});

goToSearchButton.addEventListener('click', (e) => {
    welcomeSection.classList.add('hidden');
    formSection.classList.remove('hidden');
    htmlElement.classList.remove('hidden');
    htmlElement.innerHTML = '';
});

startButton.addEventListener('click', (e) => {
    welcomeSection.classList.add('hidden'); 
    formSection.classList.remove('hidden');
    htmlElement.classList.remove('hidden');
});


//view functions








//LS utils
function addToLS(id, taskObject) {
    localStorage.setItem(id, JSON.stringify(taskObject));
}

function getFromLS(id) {
    return JSON.parse(localStorage.getItem(id));
}

function removeFromLS(id) {
    return localStorage.removeItem(id);
}


//*REFACCIONAR A MVC*
    //CLEAR CLASE MODEL
    //CREAR CLASE VIEW
    //CREAR CLASE CONTROLLER


let mainElement = document.getElementsByTagName('main')[0];
console.log(mainElement);
