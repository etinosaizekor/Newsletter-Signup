//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");
const { dirname } = require("path");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/signup", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/signup", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.emailAddress;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const JsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/0e71a597eb";

    const options = {
        method: "POST",
        auth: "etinosa1:a3ccd94aadf24154ec4d33a9d36c41b5-us17",
    };

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
           res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(response.statusCode);
        });
    });

    // request.write(JsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/signup");
});



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

//API KEY
//a3ccd94aadf24154ec4d33a9d36c41b5-us17

//LIST ID
//0e71a597eb