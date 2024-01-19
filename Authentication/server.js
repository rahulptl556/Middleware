const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const jwtPassword = "123456";
const PORT = process.env.PORT || 3000;
app.use(express.json());

const Users = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

// ?check if user exist
function userexist(username, password){
    return Users.some(user => user.username === username && user.password === password);
};


app.post('/signin',(req,res)=>{
    // Destructuring
    const username = req.body.username;
    const password = req.body.password;

    if(!userexist(username, password)){
        res.json({
            msg: "User do not exist"
        })
    }
    // Create jwt token -> send jwtPassword input here
    var token = jwt.sign({username:username},jwtPassword);
    res.json({
        // Returning token 
        token
    })

});

app.get('/users',(req,res)=>{
    const token = req.headers.authorization;
    try{
        // verify token -> send jwtPassword input here
        const decoded = jwt.verify(token,jwtPassword);
        const username = decoded.username;

        const otherUsers = Users.filter(user => user.username !== username)
        res.json({
            user: otherUsers,
        })

    }
    catch(e){
        return res.json({
            msg: "Invalid token",
            token : token,
        })
    }
})

app.listen(PORT);

