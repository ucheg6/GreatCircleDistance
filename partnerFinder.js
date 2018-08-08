// Question2 Write a NodeJS/JavaScript program that reads our list of partners (download partners.json here) and outputs the company names and addresses of matching partners (with offices within 100km) sorted by company name (ascending).
const partners = require("./partners.json");

function convertDeg2Rad(deg) {
    return deg * (Math.PI / 180)
}

const homeLat = 51.515419;
const homeLon = -0.141099;

function calcDistance(cordA, cordB) {
    if (!cordA.lat || !cordA.lng) {
        return undefined;
    }
    if (!cordB.lat || !cordB.lng) {
        return undefined;
    }
    if (typeof cordA.lat !== 'number' || typeof cordA.lng !== 'number') {
        return undefined;
    }
    if (typeof cordB.lat !== 'number' || typeof cordB.lng !== 'number') {
        return undefined;
    }

    const earthRadius = 6371; // earth's radius in Km
    //calculating distance using harversines formula
    dLat = convertDeg2Rad(Math.abs(cordA.lat - cordB.lat));
    dLng = convertDeg2Rad(Math.abs(cordA.lng - cordB.lng));
    const a =
        (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
        Math.cos(convertDeg2Rad(cordA.lat)) * Math.cos(convertDeg2Rad(cordB.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.asin(Math.sqrt(a));

    return earthRadius * c;
}

function getClosestPartners(partners) {
    const distanceArray = [];
    const lessThan100km = [];
    const homeCoordinate = {
        lat: homeLat,
        lng: homeLon,
    };

    //loops through json file, gets the coordinates for each partner and runs the calcDistance function on each item
    for (let i = 0; i < partners.length; i++) {
        let partnerLocation = partners[i].offices[0].coordinates;
        let locations = partnerLocation.split(',');
        const partnerCoordinate = {
            lat: Number(locations[0]),
            lng: Number(locations[1]),
        };
        const distance = calcDistance(partnerCoordinate, homeCoordinate);
        distanceArray.push(distance);
    }

    //iterates through the distanceArray, if the distance is less than 100 it pushes the company name and address to the lessThan100Array. 
    for (let i = 0; i < distanceArray.length; i++) {
        if (distanceArray[i] <= 100) {
            lessThan100km.push({
                name: partners[i].organization,
                addresses: partners[i].offices[0].address
            });
        }
    }
    console.log(lessThan100km);//logs companies within 100km distance

    //sort alphabetically by company name
    return lessThan100km.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
       
        // names must be equal
        return 0;
    });
    
}


getClosestPartners(partners);


module.exports = {
    getClosestPartners,
    calcDistance,
    convertDeg2Rad,
};