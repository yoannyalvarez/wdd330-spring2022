export default class MoviesView { 

    //render functions
    renderList(elArray, element, form, title) {
        if (title == 'Favorites') {
            form.classList.add('hidden');
        }
        element.classList.add('list-result');
        element.innerHTML = `<h2 class='listHeader'>${title}</h2>`;
        

        if (elArray) {
            elArray.forEach(resultEl => {
                element.appendChild(resultEl); 
            });
        } else { element.innerHTML = 'Empty list', elArray};
    }

    renderResult(title, year, type, poster) {
        let resultHTMLElement = document.createElement('div');
        resultHTMLElement.classList.add('result-div'); 
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
        resultHTMLElement.innerHTML = result;    
        return resultHTMLElement;
    }

    renderDetails( element, form, title, year, rated, released, actors,
        awards, country, director, genre, language,
        plot, poster, type, writer, backButton, addToFavsButton ) {  
        element.classList.remove('list-result');
        form.classList.add('hidden');

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

    renderPagination(element, pagination) {
        element.appendChild(pagination);
    }

}