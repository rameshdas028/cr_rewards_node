const mongoose = require("mongoose");
require("dotenv").config();
// mongoose.set("useCreateIndex", true);
// mongoose.set("useUnifiedTopology", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("autoIndex", true);

const dotenv = require("dotenv");

dotenv.config();
// "mongodb://206.189.141.96:27017/db"
mongoose.connect(
    "mongodb://localhost:27017/db", { useNewUrlParser: true },
    (err) => {
        if (!err) {
            console.log("Successfully Established Connection with MongoDB");
        } else {
            console.log(
                "Failed to Establish Connection with MongoDB with Error: " + err
            );
        }
    }
);

module.exports = mongoose;