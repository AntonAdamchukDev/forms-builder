const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt');
const jsonServer = require('json-server');
const db = require('./db.json');
const fs = require('fs');
const fetch = require('cross-fetch');
// import fetch from 'cross-fetch';
// import jwt from 'jsonwebtoken';
// import jwksRsa from 'jwks-rsa';
// import expressJwt from 'express-jwt';
// import jsonServer from 'json-server';
// import db from './db.json';
// import * as fs from 'fs';
const server = jsonServer.create();
const router = jsonServer.router('api/db.json');
const middlewares = jsonServer.defaults();


server.use(middlewares);
server.use(jsonServer.bodyParser);

const RSA_PRIVATE_KEY= fs.readFileSync('api/keys/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('api/keys/public.key');
// 
// const checkIfAuthenticated = expressJwt({
//         secret: Buffer.from(RSA_PUBLIC_KEY, 'base64'),
//         algorithms: ['RS256'],
//         getToken: function fromHeaderOrQuerystring (req) {
//             if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//                 return req.headers.authorization.split(' ')[1];
//             } else if (req.query && req.query.token) {
//               return req.query.token;
//             }
//             return null;
//         }
//     });

function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}
server.post('/api/login',(req,res)=>{login(req,res)})

server.get('/api/check',(req,res)=>{
    authorized=false;
    if(fromHeaderOrQuerystring(req)){
        jwt.verify(fromHeaderOrQuerystring(req),RSA_PUBLIC_KEY,(err,result)=>{
            // res.status(err?401:200).json({authorized:err?false:true,error:err})
            authorized = err?false:true;
        }) 
    } 
    res.status(200).json({authorized});
    // else {
        // res.status(401).json({authorized:false})
    // }
})



server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

async function login(req, res){
    const email = req.body?.email,
          password = req.body?.password;    
    if (email && password) {
        getUsers().then(
            (users)=>{
                // console.log(users);
                if(validateUser(email,password,users)){
                    const userId = findUserId(users,email);
                   
                    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                            algorithm: 'RS256',
                            expiresIn: 900,
                            subject: userId+''
                        })
                    console.log(userId)
                    res.status(200).json({
                        idToken: jwtBearerToken, 
                        expiresIn: 900
                    });      
                }
            }
        ).catch((error)=>{
            res.status(503).json();
        })
    } else {
        res.status(401).json({"message":"Unaithorized"});
    }
}

async function getUsers(){
    const response= await fetch('http://localhost:3000/users');
    return await response.json();
}

function validateUser(email,password, users){
    let isValid = false;
    users.forEach(el=>{
        if((el.email===email)&&(el.password===password)){
            isValid=true;
        }
    })
    return isValid;
}

function findUserId(users,email){
    let id;
    users.forEach(el=>{
        if(el.email===email){
            id=el.id;
        }
    })
    return id;
}

