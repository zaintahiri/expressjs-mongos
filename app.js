const express=require("express");
const app=express();
const path=require('path');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

const userModel=require("./usermodel");
const { name } = require("ejs");

app.get('/', async (req,res)=>{
    const user=await userModel.find();
    res.render('read',{user:user});
});

app.get('/adduser', async (req,res)=>{
    res.render('index');
});


app.post('/create',async (req,res)=>{
    const data=req.body;
    await userModel.create({
        name:data.name,
        email:data.email,
        username:data.username
    });
    const user=await userModel.find();
    res.render('read',{user:user});
});

app.post('/update',async (req,res)=>{
    const data=req.body;
        await userModel.findOneAndUpdate({email:data.email},
        {username:data.username,name:data.name},
        {new:true});
        const user=await userModel.find();
        res.render('read',{user:user});
});

app.get('/finduser',async (req,res)=>{
    const user=await userModel.find();
    res.send(user);
});

app.get('/edit/:email',async (req,res)=>{
    const user=await userModel.findOne({email:req.params.email});
    res.render('edit',{user:user});
});

app.get('/findarray',async (req,res)=>{
    const user=await userModel.find({username:"zainulabdin"});
    res.send(user);
});

app.get('/delete/:email',async (req,res)=>{
    
    const data=await userModel.findOneAndDelete({email:req.params.email});
    const user=await userModel.find();
    res.render('read',{user:user});
});

app.listen(3000);