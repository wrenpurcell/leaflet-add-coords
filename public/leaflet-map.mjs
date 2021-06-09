let map;
let centerMarker = L.marker([42.708716657515666, -73.73212648169996]);

let userIcon = L.icon({
    iconUrl: 'images/person.png',
    iconSize: [40, 40], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
let userMarker = L.marker([42.708716657515665, -73.73212648169995],{icon: userIcon});

function startLeaflet(lat, lon) {
    
    document.addEventListener('DOMContentLoaded', () => {
        map = L.map('map').setView([42.708716657515666, -73.73212648169996], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        centerMarker.addTo(map)
            .bindPopup('Albany Rural Cemetary')
            .openPopup();
        
           
        userMarker.addTo(map)
        .bindPopup('User');
    
        fetchAngelsJson();
    })
}


function moveMarker(lat, lon){

    userMarker.setLatLng([lat, lon])
}

function fetchAngelsJson() {
    let angelIcon = L.icon({
        iconUrl: 'images/angel5.png',
        iconSize: [38, 50], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });



    fetch('./angels.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid response');
            }
        }).then((data) => {
            data.forEach((angel) => {
                L.marker([angel.lat, angel.lon], { icon: angelIcon })
                    .addTo(map)
                    .bindPopup(angel.description);
            })
    
        })

}

startLeaflet();
  
export {
    startLeaflet,
    moveMarker
} 