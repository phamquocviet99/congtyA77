import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import upload from './multer.js';
import uploads from './cloudinary.js';
import fs from 'fs';
//Import Router
import inforCompanyRouter from './routers/inforCompany.js';
import categoryRouter from './routers/categories.js';
import productRouter from './routers/products.js';
import supplierRouter from './routers/supplier.js';
import expertRouter from './routers/expert.js'
import categoryExpertRouter from './routers/categoriesExperts.js'

//Setup Port
const app = express();
const PORT = process.env.port || 5000;

const URI = 'mongodb+srv://vietphamquoc:viet@cluster0.4jw9b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended:true, limit :'30mb'}));// limit from front-end data 30MB
app.use(cors());

//Call API
app.use('/inforCompany', inforCompanyRouter);
app.use('/category', categoryRouter);
app.use('/product',productRouter);
app.use('/supplier', supplierRouter);
app.use('/expert',expertRouter)
app.use('/categoryExpert',categoryExpertRouter)

//test
app.use('/upload', upload.array('image'), async (req, res) => {
    const uploader = async (path) => await uploads(path,'A77_Images')
    if(req.method === 'POST')
    {
        const urls =[]
        const files = req.files
        for(const file of files)
        {
            const {path} = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        res.status(200).json({
            message: "Success",
            data: urls
        })
    } 
    else
    {
        res.status(500).json(err, " Not Success")
    }
})

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log('Connected to DB');
            app.listen(PORT,()=>{
                console.log(`Server is running on port ${PORT}`)
            });
        }).catch(err =>{
            console.log('err',err)
        });

