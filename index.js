import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import currentDate from './date.js';

mongoose.connect('mongodb+srv://utkarshkumar0110:Q12WUaC4mcmSHc0L@cluster0.ryswr50.mongodb.net/todolistDB');
const ToDoListSchema = new mongoose.Schema({
    id : Number,
    item : String
});

const ToDoListModel = mongoose.model('list', ToDoListSchema)



const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})



app.get("/",async (req,res)=>{

    let list=[]   
    // List will store all items from database
    
    const cursor = await  ToDoListModel.find(); 
    // cursor will store the result of find() query

    

    for(let i=0;i<cursor.length;i++){
        list.push({
            item : `${cursor[i].item}`,
            id :  cursor[i].id,
           
        });
        
    }
    
    


    res.render("index.ejs",{
        date : currentDate,
        arrayOfWork : list});
})

app.post("/", async (req, res)=>{
    const cursor = await  ToDoListModel.find(); 
    
    const newItem = new ToDoListModel({
        
        item : `${req.body.addItem}`,
        id : cursor.length+1
    })
    if( newItem.item != 'undefined' && newItem.item != '' )
            newItem.save()
    res.redirect("/");
})

app.post("/delete",async (req,res)=>{
    // console.log(req.body.deleteItem)
    await ToDoListModel.deleteOne({ id : parseInt(req.body.deleteItem)}) 
    res.redirect("/");
})