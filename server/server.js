const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/contact-form', (req, res) => {
    res.send('Thank you for submitting your stuffs!');

    let myObj = {
        name: `${req.body.name}`,
        email: `${req.body.email}`
    };

    fs.appendFileSync('submissions.json', JSON.stringify(myObj, null, 2));
});

app.use(express.static(path.join(__dirname, '../public')));

app.get('/formsubmissions', (req, res) => {
    fs.readFile('submissions.json', {
        encoding: "UTF-8"
    }, (err, data) => {
        if(err) console.log(err);
        res.send(data);
    });
});

app.listen(3000);