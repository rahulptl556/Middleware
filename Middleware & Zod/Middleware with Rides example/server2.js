const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Adding a middleware
function ticketChecker (req,res,next){
  const ticket = req.query.ticket;
  if(ticket != 'valid'){
    res.status(403).json('Ticket not valid');
  }
  else{
    next();
  }
}

app.use(ticketChecker);

app.get('/ride1',(req,res)=>{
    res.send('You are at ride 1')
})
app.get('/ride2',(req,res)=>{
    res.send('You are at ride 2')
})
app.get('/ride3',(req,res)=>{
    res.send('You are at ride 3')
})


app.listen(PORT);