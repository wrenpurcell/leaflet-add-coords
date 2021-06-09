const { response, json } = require('express');
const express = require('express');

const hostname = '127.0.0.1';
const port = 8088;

const server = express();
server.use(express.json());
server.use(express.static('public'));

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}: ${port}/`);
});



server.post('/coords', (request, response) =>{
    let userCoords = request.body;
    const fs = require('fs')
    fs.readFile('./public/angels.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        let savedAngelsJson = JSON.parse(jsonString);

        //check if coords are in array
        //map savedAngels to just coords
        let savedCoords = savedAngelsJson.map(function (angel) {
            let coords = {
                lat: angel.lat,
                lon: angel.lon
            }
            return coords;
        });

        //if the userCoords coords match an existing angel object then add coords to filteredArray
        let filteredArray = savedCoords.filter(coordObj => {
            if (coordObj.lat == userCoords.lat && coordObj.lon == userCoords.lon) {
                return coordObj;
            }
        });

        //if filtered array is empty, add userCoords to json file
        if (filteredArray.length == 0) {
           response.json({'coords':'success'})
        }
        else {
            response.json({'coords': 'fail'})
        }

    })
    
})



server.post('/angel', (request, response) => {
    let newAngel = request.body;
    const fs = require('fs')
    fs.readFile('./public/angels.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }

        let savedAngelsJson = JSON.parse(jsonString);
        savedAngelsJson.push(newAngel);
            let data = JSON.stringify(savedAngelsJson, null, 2);
            fs.writeFile('./public/angels.json', data, (err) => {
                if (err) throw err;
                console.log(`data written to file: ${data}`);
            })
            response.json({'saved': true})
    })

    //read angels.json, parse to array + push new Angel object, rewrite new array over angels.json


});
