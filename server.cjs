const express = require('express');
const bodyparser = require('body-parser')
const Qrcode = require('qrcode')
const mongoose = require('mongoose')
const { Rout1 } = require('./schema.cjs')

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyparser.json())

async function connectToDb() {
  try {
    await mongoose.connect( process.env.mongouri)

    app.listen(port, function () {
      console.log(`server is running on ${port}`)
    })
  } catch (error) {
    console.log(error)
    console.log('Error in connecting to the database')
  }
}

connectToDb();
app.get('/getcount-data-rout1',async function(req,res){
  try{
    Rout1.find(function(err,docs){
        if(!err){
            res.json({"status":"Success"})
        }else{
          console.log("ERROR: " + err);
        }
    });    
  }catch(e){console.log(e)}  
      
    
  
})

app.post('/addcount-rout1', async function (req, res) {
  try {
    var routno = Math.floor(Math.random() * 10)
   

    var url = "https://smarttransitapi.onrender.com/deleteticket" + routno;
    Qrcode.toDataURL(url)
      .then((qrcodeurl) => {
        Rout1.create({ 'route': 1,
          "stop": req.body.stop,
          "ticketCount": req.body.ticketcount,
          "qrcodeurl": qrcodeurl,
          "idno":routno
        })
          .then((data) => {
            res.status(201).json({ "status": "success", "message": "Count added", "qrcodeurl": qrcodeurl })
          })
          .catch((error) => {
            res.status(500).json({ "status": "failure", "message": "Internal server error" })
          })
      })
      .catch((error) => {
        res.status(500).json({ "status": "failure", "message": "Internal server error" })
      })
  } catch (error) {
    res.status(500).json({ "status": "failure", "message": "Internal server error" })
  }
})



app.post('/deleteticket1',async function (req, res){
  try{
    
  await  Rout1.deleteOne({"idno":1})
  res.status(201).json({ "status": "success", "message": "data removed" })



  }
  catch
  {
    res.status(500).json({"status":"internal server error"})
  }
})
