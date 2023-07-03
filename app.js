import express from 'express';
import jwt from 'jsonwebtoken';
import {createClient} from '@supabase/supabase-js'
import path from 'path';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import 'dotenv/config'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const supabase = createClient(
    'https://ztigdigwgznkubzkvpwj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0aWdkaWd3Z3pua3Viemt2cHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MDA5NzQsImV4cCI6MjAwMjM3Njk3NH0.YZTujUu3hXc2H2JYSGuj1Sh-Cu0roBkWOeM8S2fatWg'
  
);

app.post('/newUser', async (req, res) =>{
var pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
if(req.body.email.length < 1||req.body.password.length < 8||req.body.username.length < 1){
    res.send({data: '', error: 'length'});
}
else{
    if(pattern.test(req.body.password)){
        const { data, error } = await supabase.auth.signUp({
            email: req.body.email,
            password: req.body.password,
            options: {data: {username: req.body.username,}},
        });
          if (error) {
            res.send({error: error, data: ''});
            console.log(error)
        }
        console.log(data)
        res.send({data: 'yes', error: ''});
    }
    else{res.send({data: '', error: 'strength'})}
}

});

app.post('/login', async (req, res) =>{
    console.log(process.env.jwtsecret);
    try{
    const out = jwt.verify(req.body.token.access_token, process.env.jwtsecret);
    const exp = new Date(out.exp*1000);
    const iat = new Date(out.iat*1000);
    const now = new Date();
    console.log(exp>now);
    
    res.send({res: "confirmed"})
    }
    catch(error){res.send(error);}
    
  
});

app.get('/', async (req, res) => {
    res.sendFile(__dirname+'/pages/index2.html');
});

app.get('/sign-up', (req, res) => {
    res.sendFile(__dirname+'/pages/sign-up.html');
});

app.get('/sign-in', (req, res) => {
    res.sendFile(__dirname+'/pages/sign-in.html');
});

app.get('/tables', (req, res) => {
    
    res.sendFile(__dirname+'/pages/tables.html');
});

app.get('/todo', (req, res) => {
    
    res.sendFile(__dirname+'/pages/todo.html');
});

app.get('/forgotPass', (req, res) => {
    
    res.sendFile(__dirname+'/pages/forgotPass.html');
});

app.get('/sign-out', (req, res) => {
    
    res.sendFile(__dirname+'/pages/sign-out.html');
});

app.get('/newPass', (req, res) => {
    
    res.sendFile(__dirname+'/pages/newPass.html');
});

app.get('*', (req, res) => {
    res.send("404 Sorry");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});