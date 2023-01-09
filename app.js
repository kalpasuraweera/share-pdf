const express = require('express');
const ejs = require('ejs');
const bodyParser= require('body-parser');
const mongoose= require('mongoose')



const app =express();


app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));
mongoose.connect('mongodb://127.0.0.1:27017/Sharepdf')

const Pdf = mongoose.model('Pdf', { 
	name: String, 
	author: String, 
	description: String,
	link:String, 
	upvotes: Number, 
	downvotes: Number
});



app.get('/',(req,res)=>{
	Pdf.find({},(err, docs)=>{
		if(err){
			console.log('db error')
		}else{
			console.log(docs)
			res.render('home', {docs:docs})
		}
	})
	
})

app.get('/upload', (req,res)=>{
	res.redirect('/')
})

app.post('/upload',(req,res)=>{
	const pName= req.body.pname;
	const pAuth= req.body.pauth;
	const pDesc= req.body.pdesc;
	const pLink=req.body.plink;
	const newPdf = new Pdf({ 
		name: pName, 
		author: pAuth, 
		description: pDesc, 
		link:pLink,
		upvotes: 0, 
		downvotes: 0
	});
	newPdf.save().then(() => console.log('uploaded'));
	res.redirect('/');
})
app.get('/pdf/:pdfId',(req,res)=>{
	const pdfId= req.params.pdfId;
	Pdf.findById(pdfId, (err,pdf)=>{
		if(err){
			console.log('db error')
			res.redirect('/')
		}else if(pdf){
			res.render('pdf', {pdf:pdf})
		}else{
		res.render('/')
	}
	});


// in case i want to implement a delete option i can use this

// app.get('/del', (req,res)=>{
// 	Pdf.deleteMany({description:"sample"}, err=>{
// 		if(err){
// 			console.log(err)
// 		}
// 	})
// })

	
	
})

app.listen(5000, ()=>{
	console.log("server started")
});