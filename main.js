const path = require('path');
const fs = require('fs');

const eyesDir = path.join(__dirname, 'eyes');
const eyes = fs.readdirSync(eyesDir);

const randomIntFromInterval = (min, max) => { // min and max included 
     return Math.floor(Math.random() * (max - min + 1) + min)
     }

// Pick a random file from the four files in the directory
const randomEyes = eyes[randomIntFromInterval(0, eyes.length - 1)];
console.log('The random eyes are: ' + randomEyes);
