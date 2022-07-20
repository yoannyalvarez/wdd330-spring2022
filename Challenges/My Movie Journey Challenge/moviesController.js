import MoviesModel from './moviesModel.js';
import MoviesView from './moviesView.js';

export default class MoviesController {
    constructor(searchButton, htmlElement, favsButton, goToSearchButton, startButton,
                welcomeSection, formSection, titleInp, yearInp, typeInp) {
        //query elements
        this.searchButton = document.getElementById(searchButton);
        this.htmlElement = document.getElementById(htmlElement);
        this.welcomeSection = document.getElementById(welcomeSection);
        this.formSection = document.getElementById(formSection);
        this.titleInp = document.getElementById(titleInp);
        this.yearInp = document.getElementById(yearInp);
        this.typeInp = document.getElementById(typeInp);
        //initializing
        this.favoritesList = new Favorites();
        //importing
        this.moviesModel = new MoviesModel();
        this.moviesView = new MoviesView();
        //buttons & events            
        this.favsButton = this.buildFavsButton(favsButton);
        this.goToSearchButton = this.buildGoToSearchButton(goToSearchButton);
        this.startButton = this.buildStartButton(startButton);
    }

    buildStartButton(id) {
        let startButton = document.getElementById(id);
        startButton.addEventListener('click', (e) => {
            this.welcomeSection.classList.add('hidden'); 
            this.formSection.classList.remove('hidden');
            this.htmlElement.classList.remove('hidden');
            this.formValidation(this.titleInp, this.yearInp, this.searchButton);
        });
        return startButton;
    }

    buildGoToSearchButton(id) {
        let goToSearchButton = document.getElementById(id);
        goToSearchButton.addEventListener('click', (e) => {
            this.welcomeSection.classList.add('hidden');
            this.formSection.classList.remove('hidden');
            this.htmlElement.classList.remove('hidden');
            this.htmlElement.innerHTML = '';
            this.formValidation(this.titleInp, this.yearInp, this.searchButton);
        });
        return goToSearchButton;
    }

    buildFavsButton(id) {
        let favsButton = document.getElementById(id);
        favsButton.addEventListener('click', (e) => {
            this.formSection.classList.add('hidden');
            this.welcomeSection.classList.add('hidden');
            this.htmlElement.classList.remove('hidden');
            this.favoritesList.getList(this.htmlElement, this.formSection);
        });
        return favsButton;
    }

    //form validation
    formValidation(title, year, button) {
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
            e.preventDefault();
            let validate = 'true';
            if(!title.validity.valid) {
                titleError.textContent = 'This field is required.';
                titleError.className = 'error active';
                validate = 'false';
                // If it isn't, we display an appropriate error message
                // Then we prevent the form from being sent by canceling the event
            } 
            if(!year.validity.valid) {
                // If it isn't, we display an appropriate error message
                yearError.textContent = 'This should be a year.';
                yearError.className = 'error active';
                validate = 'false';
                // Then we prevent the form from being sent by canceling the event
            }
            if (validate == 'true') {this.showListOfResults()}
        });
    }    

    async showListOfResults(p = 1) {
        let url = this.moviesModel.buildUrl(p, this.titleInp, this.yearInp, this.typeInp);
        let data = await this.moviesModel.fetchData(url);
        let array = data.Search;
        let resultElArray = [];
        let pagination = null;
        let title = 'Results';
    
        if (array) {
            array.forEach(result => {
                let resultObj = new Result(result, title, p);
                let resultEl = resultObj.showResult();
                resultEl.addEventListener('click', (e) => {
                    e.preventDefault();
                    resultObj.showDetails(this.htmlElement, this.formSection, this.buildBackButton(title, p), this.buildAddToFavsButton(resultObj));
                });
                resultElArray = [...resultElArray, resultEl]; 
            });
            pagination = this.buildingPagination(data.totalResults, p);
        }
    
        this.moviesView.renderList(resultElArray, this.htmlElement, this.formSection, title);
        this.moviesView.renderPagination(this.htmlElement, pagination);
    }

    //building pagination
    buildingPagination(numberOfResults, currentPage) {
        let numberOfPages = Math.ceil(numberOfResults/10);
        let paginationHtml = document.createElement('ul');
        paginationHtml.classList.add('pagination');
        
        if (!(currentPage == 1)) {
            let backLink = this.buildPageLink(currentPage - 1);
            backLink.innerHTML = '<< Back';
            backLink.classList.add('moveLink');
            paginationHtml.appendChild(backLink);    
        }

        paginationHtml.appendChild(this.buildListOfPages(currentPage, numberOfPages));
        
        if (!(currentPage == numberOfPages)) {
            let nextLink = this.buildPageLink(currentPage + 1);
            nextLink.innerHTML = 'Next >>';
            nextLink.classList.add('moveLink');
            paginationHtml.appendChild(nextLink);    
        }

        return paginationHtml;
    }

    buildListOfPages(currentPage, numberOfPages) {
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
                        let pageElement = this.buildPageLink(location, currentPage);
                        location = location + 1;
                        listHTML.appendChild(pageElement);
                    }
                    break;
                } else {
                    for (let i = 1; i <= 12; i++) {
                        let pageElement = this.buildPageLink(location, currentPage);
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

    buildPageLink(number, currentPage) {
        let pageHtmlElement = document.createElement('li');
        pageHtmlElement.innerHTML = number;
        if (number == currentPage) {
            pageHtmlElement.classList.add('active');
        }
        pageHtmlElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.showListOfResults(number);
        });
        return pageHtmlElement;
    }

    buildBackButton(typeList, currentPage = null) {
        let button = document.createElement('button');
        button.innerHTML = 'Back';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeList == 'Results') {
                this.formSection.classList.remove('hidden');
                this.showListOfResults(currentPage);
            } else if (typeList == 'Favorites') {
                this.favoritesList.getList(this.htmlElement);
            }
        });
        return button;
    }

    buildAddToFavsButton(obj) {
        let button = document.createElement('button');
        let isAdded = 'false';
        this.favoritesList.listArray.forEach(object => {
            console.log(object);
            if (object.imdbID == obj.imdbID) {
                isAdded = 'true';
            }

        });
        if (isAdded == 'false') {
            button.innerHTML = 'Add to Favorites';
            button.addEventListener('click', (e) => {
                this.favoritesList.appendToList(obj);
                button.classList.add('clicked');
            });
        } else if (isAdded == 'true') {
            button.innerHTML = 'Delete from Favorites';
            button.addEventListener('click', (e) => {
                this.favoritesList.removeFromList(obj);
                button.classList.add('clicked');
            });
        }
        return button;
    }

}


//classes
class Favorites {
    constructor() {
        this.moviesModel = new MoviesModel();
        this.moviesView = new MoviesView();
        this.id = 'myList';
        this.listArray = this.moviesModel.getFromLS(this.id) ? [...this.moviesModel.getFromLS(this.id)] : [];
    }

    appendToList(obj) {
        this.listArray.push(obj);
        this.addToList();
    }

    getList(element, form) {
        let array = this.moviesModel.getFromLS(this.id);
        this.showList(array, element, form);
    }

    addToList() {
        this.moviesModel.addToLS(this.id, this.listArray);
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

    showList(array, element, form) {
        let resultElArray = [];
        let title = 'Favorites';
    
        if (array) {
            array.forEach(result => {
                let resultObj = new Result(result, title);
                let resultEl = resultObj.showResult();
                resultEl.addEventListener('click', (e) => {
                    e.preventDefault();
                    resultObj.showDetails(element, form, this.buildBackButton(element, form), this.buildDeleteFromFavsButton(resultObj));
                    buildDeleteFromFavsButton(resultObj);
                });
                resultElArray = [...resultElArray, resultEl]; 
            });
        }
    
        this.moviesView.renderList(resultElArray, element, form, title);
    }

    buildBackButton(element, form) {
        let button = document.createElement('button');
        button.innerHTML = 'Back';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.getList(element, form);
        });
        return button;
    }

    buildDeleteFromFavsButton(obj) {
        let button = document.createElement('button');
        button.innerHTML = 'Delete from Favorites';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.removeFromList(obj);
            button.classList.add('clicked');
        });
        return button;
    }
}

class Result {
    constructor(data, typeList, currentPage = null) {
        this.typeList = typeList;
        this.Title = data.Title;
        this.Year = data.Year;
        this.Type = data.Type;
        this.imdbID = data.imdbID;
        this.Poster = data.Poster;
        this.currentPage = currentPage;
        this.moviesModel = new MoviesModel();
        this.moviesView = new MoviesView();
    }

    showResult() {
        return this.moviesView.renderResult(this.Title, this.Year, this.Type, this.Poster);
    }

    async showDetails(element, form, backButton, addToFavsButton) {
        let url = this.moviesModel.buildDetailsUrl(this.imdbID);
        let data = await this.moviesModel.fetchData(url);
        let details = new Details(data, this.typeList, this.currentPage, backButton, addToFavsButton);
        console.log(details);
        details.showDetails(element, form);
    }
}

class Details {
    constructor(data, typeList, currentPage, backButton, addToFavsButton) {
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
        this.moviesModel = new MoviesModel();
        this.moviesView = new MoviesView();
        this.BackButton = backButton;
        this.AddToFavs = addToFavsButton;
    }

    showDetails(element, form) {
        this.moviesView.renderDetails( element, form, this.Title, this.Year, this.Rated,
                        this.Released, this.Actors, this.Awards, 
                        this.Country, this.Director, this.Genre,
                        this.Language, this.Plot, this.Poster, this.Type,
                        this.Writer, this.BackButton, this.AddToFavs );         
    }
}