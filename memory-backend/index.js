const mongoose = require('mongoose');
const express=require('express');
var cors = require('cors')
// var bodyParser = require('body-parser')

const {PORT, dbURL: URL} = require('./config');

const app=express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// 	extended: true
//   }));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
  });
app.use(cors());
const posts=(require('./routes/posts'));

mongoose.connect(URL)
 .then(() => console.log('Connected…'))
 .catch(err => console.error('Connection failed…'))

app.listen(PORT, function() {
	console.log("Server is listening at port:" + PORT);
});

app.use(express.json());

app.use('/api/posts', posts);
