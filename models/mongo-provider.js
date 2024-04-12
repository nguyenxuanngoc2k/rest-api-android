const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://dev:oB5CRHCKbGxy6FS7@cluster0.6paisdj.mongodb.net/android?retryWrites=true&w=majority&appName=Cluster0")
mongoose.connection.on('error', (err)=>{
    console.log('err',err);
})
mongoose.connection.on('connected', (err,res)=>{
    console.log('mongoose connected');
})

