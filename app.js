var express = require('express');
var app = express();
var routes = require('./routes/myindex');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply@easyasolution.com',
        pass: 'computer1013'
    }
}, {
    // default values for sendMail method
    from: 'noreply@easyasolution.com',
    headers: {
        'My-Awesome-Header': '123'
    }
});

app.use(express.static( "public" ));

app.set('view engine', 'ejs');

app.get('/', routes);

app.get('/email', function(req,res){

 	var email =  'theeasyasolution@gmail.com'
	var subject = req.param('username') + req.param('usernum')
	var text = req.param('email') + req.param('usermessage')

	transporter.sendMail({
    	to: email,
    	subject: subject,
    	text: text
	});

	res.send("form submitted to" + email)

});


var port = process.env.PORT || 5000

var server = app.listen(port, function() {
	console.log('Listening on port 5000');
});