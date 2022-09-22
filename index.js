const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/book-routes.js");
const userRouter = require("./routes/user-routes.js");
const cors = require("cors");
const app = express();
const dotenv=require('dotenv')

app.use(express.json());
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
app.get("/", (req, res) =>
  res.send(`Server Running`)
);
dotenv.config();
app.use("/books", routes);
app.use("/reg", userRouter);
const port = process.env.PORT ||8000;
// const user = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;


// if(process.env.NODE_ENV === 'production')
//  {
//  app.use('/' , express.static('client/build'))
//  app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, 'client/build/index.html'))
//       });
//  }
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected Successfully"))
    .then(() => app.listen(port, () => console.log(`Server is running Successfully on PORT ${port}`)))
    .catch((error)=> console.log('Error while connecting to the database '));

    


