const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const database = require("./database/database");
/*

  > Phiên bản demo / sẽ không đầy đủ các validate, middleware
  > Tính năng chủ yếu : Quét QRCODE Ghi lại lịch sử ra/vào

*/

database.init(() => {
  console.log("Inital Database success")
});

const app = express(); //App Express
const PORT = process.env.PORT || 8000; //your can install dotenv (npm i dotenv) to using PROCESS.ENV

app.use(cors()) // Cors : Accept Access From Browser
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routes
const guestRoute = require("./api/routes/guest.route");
const historyRoute = require("./api/routes/history.route");

app.use("/api/guests", guestRoute);
app.use("/api/historys", historyRoute);

//Listen
app.listen(PORT, () => console.log("Servering"));