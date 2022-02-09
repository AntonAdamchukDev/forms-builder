const jwt = require('jsonwebtoken');
const jsonServer = require('json-server');
const db = require('./db.json');
const fs = require('fs');
const fetch = require('cross-fetch');
const server = jsonServer.create();
const router = jsonServer.router('api/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const RSA_PRIVATE_KEY= fs.readFileSync('api/keys/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('api/keys/public.key');

function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}
server.post('/api/login',(req,res)=>{login(req,res)})
server.post('/api/registrate',(req,res)=>{registrate(req,res)})

server.get('/api/check',(req,res)=>{
    authorized=false;
    if(fromHeaderOrQuerystring(req)){
        jwt.verify(fromHeaderOrQuerystring(req),RSA_PUBLIC_KEY,(err,result)=>{
            authorized = err?false:true;
        }) 
    } 
    res.status(200).json({authorized});
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
                if(validateUser(email,password,users)){
                    const userId = findUserId(users,email);
                    const jwtBearerToken = jwt.sign({
                        email: email
                    }, RSA_PRIVATE_KEY, {
                            algorithm: 'RS256', 
                            expiresIn: 900,
                            subject: userId+''
                        })
                    return res.status(200).json({
                        idToken: jwtBearerToken, 
                        expiresIn: 900
                    });      
                } else {
                    res.status(401).json({"message":"Unaithorized. User with such e-mail dont exists or password is uncorrect."});
                }
            }
        ).catch((error)=>{
            console.log(error);
            return res.status(503).json({message:'Network error or service unawailable'});
        })
    } else {
        res.status(401).json({"message":"Unaithorized. Check accuracy of inputed e-mail and password."});
    }
    
}

async function registrate(req,res){
    const email = req.body?.email,
          password = req.body?.password,
          users = await getUsers();    
    if(email && password && !validateUser(email,password,users)){
        await fetch('http://localhost:3000/users',
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({email,password})
        }).then(()=>{
            res.status(200).json()}
        ).catch(()=>{
            res.status(503).json({message:'Network error or service unawailable'});
        })
    } else {
        res.status(400).json({message:'User exists'});
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
    let id=0;
    users.forEach(el=>{
        if(el.email===email){
            id=el.id;
        }
    })
    return id;
}

