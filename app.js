const express = require('express');
const ejs = require('ejs');
const bodyParser= require('body-parser');
const mongoose= require('mongoose')



const app =express();


app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));
mongoose.connect('mongodb://localhost:27017/Sharepdf')

const Pdf = mongoose.model('Pdf', { 
	name: String, 
	author: String, 
	description: String, 
	upvotes: Number, 
	downvotes: Number
});


 

app.get('/',(req,res)=>{
	res.render('home')
})

app.get('/upload',(req,res)=>{
	const kitty = new Pdf({ 
		name: "python", 
		author: "kalpa", 
		description: "no desic", 
		upvotes: 5, 
		downvotes: 2
	});
	kitty.save().then(() => console.log('meow'));
	res.render('upload')
})
app.get('/pdf/:pdfId',(req,res)=>{
	const pdfId= req.params.pdfId;
	Pdf.findById(pdfId, (err,pdf)=>{
		if(err){
			console.log('db error')
		}else{
			res.render('pdf', {pdf:pdf})
		}
	})

	//63272471d3c4c089d5091bc7
	// Pdf.find({},(err,doc)=>{
	// 	if(!err){
	// 		console.log(doc)
	// 	}else{
	// 		console.log(err)
	// 	}
	// })
	
	
})

app.listen(5000, ()=>{
	console.log("serever started")
});