//global variables
const baseUrl = 'http://www.omdbapi.com/?';
const apiKey = '6dfb3cbf';

export default class MoviesModel {
    
    //utils
    fetchData(urlData) {
        //htmlElement.innerHTML = "";
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

    buildUrl(p = 1, titleEl, yearEl, typeEl) {
        let titleVal = titleEl.value;
        let yearVal = yearEl.value;
        let typeVal = typeEl.value;
        let url = `${baseUrl}s=${titleVal}&y=${yearVal}&type=${typeVal}&apikey=${apiKey}&page=${p}`;
        return url;
    }

    buildDetailsUrl(id) {
        let url = `${baseUrl}i=${id}&apikey=${apiKey}`;
        return url;
    }

    //LS utils
    addToLS(id, taskObject) {
        localStorage.setItem(id, JSON.stringify(taskObject));
    }
    
    getFromLS(id) {
        return JSON.parse(localStorage.getItem(id));
    }
    
    removeFromLS(id) {
        return localStorage.removeItem(id);
    }
}
