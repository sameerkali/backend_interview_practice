const express = require("express");
const jwt = require("jsonwebtoken");

const secret = "IamALittleSecret";
const port = 6969;

const app = express();

app.get("/", (req, res) => {
  res.json({
    api: "api is working great"
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "sameer",
    password: "Delcrm2601@"
  };
  jwt.sign(user, secret, { expiresIn: "300s" }, (err, token) => {
    res.json({ token: token, name: user.name, password: user.password });
  });
});


const varifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer  = bearerHeader.split(" ")
        const token = bearer[1]
        req.token = token
        next()
    }else{
        res.send({response: 'sale token sahi daal le'})
    }
}
app.post("/profile", varifyToken, (req, res) =>{
    jwt.verify(req.token, secret, (err, authdataa)=>{
        if(err){
            res.send({result: "na managa, na dalega sahi token"})
        } else{
            res.json({message: "profile accessed", authdataa})
        }
    })
})




app.listen(port, () => {
  console.log(`listning on port ${port}`);
});
