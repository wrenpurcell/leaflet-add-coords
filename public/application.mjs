//start geolocation tracking when user clicks start tracking button
//check if user is in cemetery 
//show add angel button if they are in range 

import{
    distance,
    noGeo,
} from './functions.mjs';

import{
    showAddAngel
} from './addAngel.mjs';
import {
    startLeaflet,
    moveMarker
} from'./leaflet-map.mjs';

let tracker;


function isUserInRange(pos){
    let user = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
    };
    let target = {
        lat: 42.707857254171444, 
        lon: -73.73238903818473
    }
    let calculatedDistance = distance(user.lat, user.lon, target.lat, target.lon);
    if(calculatedDistance < 0.9){
        console.log('user is in range');
        // userInLocation = true;
        localStorage.setItem('userInLocation', true)
    } else {
        localStorage.setItem('userInLocation', false)
    }
    
if(localStorage.getItem('userInLocation')){
    //if user is in the cemetery, show option to add angel landmark
    showAddAngel(user);
    //calls add angel in addAngel.js
}
};

function showPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude);
    isUserInRange(position);
    startLeaflet(position.coords.latitude,  position.coords.longitude);
    moveMarker(position.coords.latitude,  position.coords.longitude);
}

function startTracking() {
    tracker = navigator.geolocation.watchPosition(showPosition, noGeo);
}
function main() {
    document.querySelector('#track-location')
        .addEventListener('click', startTracking);        

        
}

main();