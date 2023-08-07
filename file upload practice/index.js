const express = require('express');
const { dbConnect } = require('./config/dbConnect');
const { cloudnaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const { router } = require('./routes/fileUpLoad');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


app.use("/api/v1",router);


const port = process.env.PORT || 4000;
dbConnect();
cloudnaryConnect();
app.listen(port , () => {
    console.log(`server started successfully at port number ${port}`);
})