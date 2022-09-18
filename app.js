const express = require('express');
const ejs = require('ejs');
const bodyParser= require('body-parser');


const app =express();


app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));





app.get('/',(req,res)=>{
	res.render('home')
})

app.get('/upload',(req,res)=>{
	res.render('upload')
})
app.get('/pdf/:pdfId',(req,res)=>{
	const pdfId= req.params.pdfId;
	res.render('pdf', {pdf:pdfId})
})

app.listen(5000, ()=>{
	console.log("serever started")
});