const express = require('express');
const { router } = require('./routes/routes');
const { dbConnect } = require('./config/dbConnect');
const cors = require('cors')
const app = express();

// middlewares
app.use(express.json());

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);


app.use("/api/v1",router);

app.get('/',(req,res)=>{
    res.send("this is home page");
})


dbConnect();
app.listen(4000,()=>{
    console.log(`server started at ${4000}`);
})