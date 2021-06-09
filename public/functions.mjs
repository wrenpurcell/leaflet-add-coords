function distance(lat1, lon1, lat2, lon2) {
    const r = 6378.137;
    lat1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lon1 *= Math.PI / 180;
    lon2 *= Math.PI / 180;
    let h = Math.pow(Math.sin((lat2 - lat1) / 2), 2) + (Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon2 - lon1) / 2), 2));
    return 2 * r * Math.asin(Math.sqrt(h));
}

function noGeo(e) {
    console.log(e);
}

function angelAlreadySaved(){
    document.querySelector('#add-angel').style.display = "none";
    let message = document.createElement('p');
    message.innerHTML = 'there was already an angel statue saved at your location';
    let button = document.createElement('button');
    button.innerHTML = 'try again';
    button.addEventListener('click', ()=>{ location.reload();});
    document.querySelector('#start-over').appendChild(message);
    document.querySelector('#start-over').appendChild(button);
}

export{
    distance,
    noGeo,
    angelAlreadySaved
}