const express = require('express');  // import express
const db = require('./config/connection')  // import the connection object
const routes = require('./routes');  // import the routes folder



const PORT = process.env.PORT || 3001; //declare the port to listen on 
app = express();


app.use(express.json());  // use express middleware to parse incoming JSON data
app.use(express.urlencoded({ extended: true }));  // use express middleware to parse incoming urlencoded data
app.use(routes);  // use the routes folder


db.once('open', () => {  // when the connection to the database is open
    app.listen(PORT, () => {  // listen on the port
        console.log(`Server running on port ${PORT}!`);  // log the port
    });
});

