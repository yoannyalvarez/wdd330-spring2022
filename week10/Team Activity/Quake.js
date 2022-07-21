/*
import { getJSON, getLocation } from './utilities.js';

const baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';
let geoUrl = '';

const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 27000
  };

function testGetQuakesForLocation() {
    // call the getLocation function to get the lat/long
    getLocation(options).then(function (response) {
        const coordUrl = `&latitude=${response.coords.latitude}&longitude=${response.coords.longitude}`
        const geoUrl = baseUrl + coordUrl + `&maxradiuskm=100`;
        getJSON(geoUrl);
    });

    // use that information to build out the correct URL
    //const geoUrl = baseUrl + + `&maxradiuskm=100`;// add location information here
    // use the url to request the correct quakes 
    //log out the quakes for now.
}

testGetQuakesForLocation();

//.then(response => console.log(response.coords.latitude + ', ' + response.coords.longitude));

//https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02
//&latitude=43.814540699999995
//&longitude=-111.78491029999999
//&maxradiuskm=100
*/

import { getJSON } from './utilities.js';
// Quake Model
export default class Quake {
  constructor() {
    this.baseUrl =
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
    // store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._quakes = [];
  }
  async getEarthQuakesByRadius(position, radius = 100) {
    this._quakes = await getJSON(
      this.baseUrl +
        `&starttime=2019-01-01&endtime=2019-03-02&latitude=${
          position.lat
        }&longitude=${position.lon}&maxradiuskm=${radius}`
    );
    return this._quakes;
  }
  getQuakeById(id) {
    console.log(this._quakes);
    return this._quakes.features.filter(item => item.id === id)[0];
  }
}





//FUNCTIONS:
/*

function getQuakesForLocation(location, radius) {
    //const radius = 100;
    const query =
        baseUrl +
        `&latitude=${location.latitude}&longitude=${location.longitude}&maxradiuskm=${radius}`;
    console.log(query);
    // fetch the data
    return getJSON(query);
    // get the element we will render the list in
}
*/
  