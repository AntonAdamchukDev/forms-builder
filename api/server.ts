const jwt = require('jsonwebtoken');
const jsonServer = require('json-server');
const db = require('./db.json');
const fs = require('fs');
const server = jsonServer.create();
const router = jsonServer.router('api/db.json');
const middlewares = jsonServer.defaults();
const crossFetch = require('cross-fetch');

server.use(middlewares);
server.use(jsonServer.bodyParser);

const RSA_PRIVATE_KEY = fs.readFileSync('api/keys/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('api/keys/public.key');

function fromHeaderOrQuerystring(req:any) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}
server.post('/api/login', (req:any, res:Response) => {
  login(req, res);
});
server.post('/api/signUp', (req:any, res:Response) => {
  signUp(req, res);
});

server.get('/api/check', (req:any, res:any) => {
  let authorized = false;
  if (fromHeaderOrQuerystring(req)) {
    jwt.verify(fromHeaderOrQuerystring(req), RSA_PUBLIC_KEY, (err:Error, result:any) => {
      authorized = err ? false : true;
    });
  }
  res.status(200).json({ authorized });
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

async function login(req:any, res:any) {
  const email = req.body?.email,
    password = req.body?.password;
  if (email && password) {
      let users = readUsers();
        if (validateUser(email, password, users)) {
          const userId = findUserId(users, email);
          const jwtBearerToken = jwt.sign(
            {
              email: email,
            },
            RSA_PRIVATE_KEY,
            {
              algorithm: 'RS256',
              expiresIn: 900,
              subject: userId + '',
            }
          );
          return res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: 900,
          });
        } else {
          res
            .status(401)
            .json({
              message:
                'Unaithorized. User with such e-mail dont exists or password is uncorrect.',
            });
        }
  } else {
    res
      .status(401)
      .json({
        message: 'Unaithorized. Check accuracy of inputed e-mail and password.',
      });
  }
}

interface User{
  email:string,
  password:string,
  id: number
}

async function signUp(req:any, res:any) {
  const email = req.body?.email,
    password = req.body?.password;
  let users = readUsers();
  if (email && password && !findUserId(users, email)) {
    await crossFetch('http://localhost:3000/users',
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
    res.status(200).json();
  } else {
    res.status(400).json({ message: 'User exists' });
  }
}

function validateUser(email:string, password:string, users:User[]) {
  let isValid = false;
  users.forEach((el) => {
    if (el.email === email && el.password === password) {
      isValid = true;
    }
  });
  return isValid;
}

function findUserId(users:User[], email:string) {
  let id = 0;
  users.forEach((el) => {
    if (el.email === email) {
      id = el.id;
    }
  });
  return id;
}

function readUsers() {
  const dbRaw = fs.readFileSync('./api/db.json');  
  const users = JSON.parse(dbRaw).users
  return users;
}
