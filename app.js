const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require("express");
dotenv.config();
const route = require("./routes/indexRoute");
const db = require("./config/db");
const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;

app.options('*', cors());
app.use(cors());
app.use('/api',route);


var multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})
 
var upload = multer({
    storage: storage
});

// Middleware to fix the html error thrown when json format is wrong
app.use(
    /**
     * @param {Error} err
     * @param {e.Request} req
     * @param {e.Response} res
     * @param {Function} next
     */
    (err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            console.error(err);
            // @ts-ignore
            return res.status(400).send({ status: 404, message: err.message }); // Bad request
        }

        next();
    }
);

// @ts-ignore
// app.options('*', cors());
// app.use(cors());


// app.use(errors());

app.use(
    /**
     * @param {Error} error
     * @param {e.Request} _req
     * @param {e.Response} res
     * @param {Function} next
     */
    (error, _req, res, next) => {
        if (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(error.status || 500).send({
                status: error.status || 500,
                message:
                    error.message ||
                    'Internal Server Error, please contact administrator',
            });
        }
        next();
    }
);

// 
const csv = require('csv-parser')
const fs = require('fs')
const voucherModel = require("./models/voucherModel");

app.post("/api/upload", upload.single("files"),(req,res) =>{
    try {
        return res.send({
            status:200,
            message: "success fully upload",
        });
    } catch (error) {
        console.log(error);
    }
});

const reader = require('xlsx'); //upload.single("files"),
app.post("/api/upload_voucher",upload.single("files"),async(req,res) =>{
    try {
        let readfile = reader.readFile("./format.xls")
        let sheet = readfile.SheetNames;

        let sheetData;
        for(let i = 0; i< sheet.length; i++){
          const sheetnams = sheet[i];
          sheetData = reader.utils.sheet_to_json(readfile.Sheets[sheetnams]);
        }
        // for(let i = 0; i< sheetData.length; i++){
        //     console.log(sheetData[i]);
        // }
        // // console.log(sheetData);
        await voucherModel.create(sheetData);
        return res.send({
            status:200,
            message: "success fully upload",
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT);
console.log('RESTful API server started on : ' + PORT);
