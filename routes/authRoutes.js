const express = require('express');
const {register, login} = require('../controllers/AuthController')
const router = express.Router();


router.post('/api/login', async (req, res) => {

    try {
        const response = await login(req.body)
        if(response.data){
            res.status(response.status).json(response.data);
        }
        else{
            res.status(response.status).send(response.message);
        }
    } catch (err) {
        console.log(err);
    }
})
router.post('/api/register', async (req, res) => {
    try {
        const response = await register(req.body)
        if(response.data){
            res.status(response.status).json(response.data);
        }else{
            res.status(response.status).send(response.message);
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router