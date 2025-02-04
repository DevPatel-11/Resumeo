const express= require("express")
const { set } = require("mongoose")
const app=express()
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const port=8080
app.set('view engine','ejs')
// app.get("/",(req,res)=>{
//     res.send("Welcome to Resumeo")
// })

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/dashboard",(req,res)=>{
    res.render("dashboard")
})

app.listen(port,()=>{
    console.log("server has started")
})