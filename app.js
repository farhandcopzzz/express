const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan('dev'));
app.use(express.json());

let tasks = [];

app.get('/',(req,res)=>{
    res.json(tasks);
})

app.post('/tasks',(req,res)=>{
    const task = req.body
    tasks.push(task);
    res.send({message:"Tasks added",tasks:tasks});
})

app.get('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const task = tasks.find(task=>task.id===id);
    if(!task){
        res.send("Task not found");     
    }else{
        res.json(task)
    }
})

app.put('/edit/:id',(req,res)=>{
    const id = req.params.id;
    const updatedTask= req.body;
    const index = tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1,updatedTask);
        res.json(tasks)
    }
})

app.listen(3001,(req,res)=>{
    console.log("port is up")
})

app.delete('/edit/:id',(req,res)=>{
    const id = req.params.id
    const index = tasks.findIndex((task)=>task.id===id)
    if(index===-1){
        res.send("Not There!")
    }else{
        tasks.splice(index,1)
        res.send("Item Deleted")
    }
})