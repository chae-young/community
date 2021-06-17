const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const client_id = process.env.CLIENTID;
const client_secret = process.env.CLIENTPASSWORD;

router.get('/', async (req, res, next) => {
    const options = {
        headers: {
            'X-Naver-Client-Id':client_id, 
            'X-Naver-Client-Secret': client_secret
        },
        params:{
            query:req.query.query
        }
    };
    try{
        const result = await axios('https://openapi.naver.com/v1/search/movie.json',options)
        return res.status(201).json(result.data);
    }catch (error) {
        console.error(error);
        next(error);
    }


 });

 module.exports = router;