import {
    Angel
} from './Angel.mjs'
import {
    angelAlreadySaved
} from './functions.mjs'

let userCoords = '';

function showAddAngel(userObj) {
    //when user is in location show add angel button
    userCoords = userObj;

    if (!document.querySelector('#add-angel-button')) {
        let button = document.createElement('button');
        button.innerHTML = 'add angel';
        button.setAttribute('id', 'add-angel-button');
        document.querySelector('#add-angel').appendChild(button);
    }
    document.querySelector('#add-angel-button')
        .addEventListener('click', postUserCoords);
}
function postUserCoords() {
    fetch('/coords', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCoords)
    }).then((response) => {
        if (!response.ok) {
            throw new Error('bad response');
        }
        return response.json();
    }).then((data) => {
        console.log(data.coords);
        if (data.coords == 'success') {
            addAngel();
        }
        else {
            angelAlreadySaved();
        }
    })
}

function addAngel() {
    //when add angel button is pressed
    //make text input for angel description and submit bitton
    let submitButton = document.createElement('button');
    if (!document.querySelector('#enter-description')) {
        let descriptionInput = document.createElement('input');
        let inputLabel = document.createElement('label');
        submitButton.innerHTML = 'submit';
        inputLabel.setAttribute('for', 'enter-description')
        inputLabel.innerHTML = 'enter description of angel';
        descriptionInput.setAttribute('id', 'enter-description');
        descriptionInput.setAttribute('type', 'text');
        document.querySelector('#add-angel').appendChild(inputLabel);
        document.querySelector('#add-angel').appendChild(descriptionInput);
        document.querySelector('#add-angel').appendChild(submitButton);
    }
    submitButton.addEventListener('click', makeAngelObj);
}

function makeAngelObj() {
    //make new Angel object with coords + description
    let description = document.querySelector('#enter-description').value;
    let myAngel = new Angel(userCoords.lat, userCoords.lon, description);
    postNewAngel(myAngel);
}
//do another fetch before posting, do comparison of newAngel against objects in angels.json here
//only post to server if new location
function postNewAngel(angelObj) {
    fetch('/angel', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(angelObj)
    }).then((response) => {
        if (!response.ok) {
            throw new Error('bad response');
        }
        return response.json();
    }).then((data) => {
        if (data.saved) {
            alert('angel was saved!');
            location.reload();
        }
    })
}

export {
    showAddAngel
}

