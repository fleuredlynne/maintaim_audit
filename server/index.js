const express = require('express')
const app = express()
const mySQL = require('mysql')
const multer = require('multer')
var path = require('path');


const db = mySQL.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db_info'
    }
)


const BodyParser = require('body-parser')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(BodyParser.urlencoded({ extended: true }))



app.post("/api/NonQuery_img", (req, res) => {
    let mySQL = req.body.mySQL
    let myImg = req.body.myImg
    
    db.query(mySQL,[myImg], (err, result) => {
     console.log(err)
     if (err == null)
         res.send('Done')
     else 
         res.send('Error')
   })
 });
 
app.post("/api/NonQuery", (req, res) => {
   let mySQL = req.body.mySQL
   
   db.query(mySQL, (err, result) => {
    console.log(err)
    if (err == null)
        res.send('Done')
    else 
        res.send('Error')
  })
});


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../client/src', 'img'),
    filename: function (req, file, cb) {   
        // null as first argument means no error
        //cb(null, Date.now() + '-' + file.originalname )
        cb(null, 'a.jpg' )


    }
})


app.post('/imageupload', async (req, res) => {  
    try {
        // 'avatar' is the name of our file input field in the HTML form


        let upload = multer({ storage: storage}).single('upload_file');
       
        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields
          
            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }


            const classifiedsadd = {
                image: req.file.filename
            };           
        }); 


    }catch (err) {console.log(err)}
})


app.get ("/api/DataQuery", (req,res) => {
    const mySQL = req.query.sql
    db.query(mySQL, (err, result) => {
        console.log(result)
        res.send(result)
    })
}
);


app.listen(3001, () => {
    console.log('Hello iHi MySQL Server')
});
