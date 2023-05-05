const { connect, connection } = require('mongoose');  // import the connection methods from mongoose

// declare connection string to connect to MongoDB

const connectionString = 'mongodb://127.0.0.1:27017/socialNetworkApi';

//connect to MongoDB using the connect function from mongoose
connect(connectionString);

module.exports = connection;  //export the connection object

