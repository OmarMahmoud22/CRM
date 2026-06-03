require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors("*"));
const mogoose = require("mongoose");
const morgan = require('morgan')
const port = process.env.PORT || 5000;
const main = require('./config/db')
//-----------------------------------------------------------------------------------

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}


const Auth_Router = require("./Routes/AuthRouter");
app.use("/api", Auth_Router);
//...................................................................
const Lead_Router = require('./Routes/LeadRouter')
app.use('/api' , Lead_Router)
//...................................................................
const Dashbourd_Router = require('./Routes/DashbourdRouter')
app.use('/api' , Dashbourd_Router)

main();

app.listen(port, () => {
  console.log(`listerned to port ${port}`);
});

// https://www.figma.com/design/I8QmrrzIO1YTz41UrEEgtU/Untitled?node-id=0-1&p=f&t=PGlC0kXrygKU9hfH-0
