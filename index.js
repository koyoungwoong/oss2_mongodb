const express = require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(express.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs');

var db;
MongoClient.connect('mongodb+srv://yuko:hallym@cluster0.ktqzhbg.mongodb.net/?retryWrites=true&w=majority', function(err, client){
  if (err) return console.log(err)
  db = client.db('member');

  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})


app.get('/', function(req, res) {
  res.sendFile(__dirname +'/index.html')
  })

app.get('/write', function(req, res) {
    res.sendFile(__dirname +'/write.html')
  })

app.get('/list', function(req, res) {
  db.collection('login').find().toArray(function(err,result){
    console.log(result)
    res.render('list.ejs', {loginfo : result})
  })
})

app.post('/add', function(req, res){
  res.send('complete....')
  db.collection('login').insertOne({email:req.body.email, password: req.body.password}, function(err, result){
    console.log("save complete...");
    console.log(req.body.email);
    console.log(req.body.password);
  })
})

