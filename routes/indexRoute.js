const express = require("express");
//route
const userRoute = require('../routes/userRoute');
const app = express();

app.use('/auth', userRoute);
app.use("/admin", require("../routes/adminRoute"));
app.use("/brand", require("../routes/brandRoute"));
app.use("/bulk", require("../routes/bulkOrderRoute"));
app.use("/lifestyle", require("../routes/lifeStyleRoute"));
// app.use("/lifeStyle/axis", require("../routes/axis.lifeStyleRoute"));
module.exports = app;