const mongoose=require('mongoose');
const express=require('express');
var app=express();
app.use(express.json());
const joi=require('joi');
mongoose.connect('mongodb://localhost/vidley',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("connected to db");
    })
    .catch(()=>{
        console.log("not connected");
    });
const movieschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:60,
    },
    year:{
        type:Number,
        required: true,
        max:2021,
    },
    director:{
        type:String,
        required:true,
    }


});
const Movie=mongoose.model('Movie',movieschema);

async function setmovies(movie ){


 try{
     const m1=await movie.save();
     //console.log(m1);
     return m1;
 }
 catch (err){
     console.log(err.message +" hello");
 }
}
async function getmoviesbyyear( year){
try{
    const movies= await  Movie.find({year :{ $gt:year}}).sort({name:1});
    return movies;
}
catch (err){
    console.log(err.message);
}

}




app.get('/year/:year',(req,res)=>{
        getmoviesbyyear(parseInt(req.params.year)).then(m=>{
            if(m.length>0){
                res.send(m);
                console.log('data sent sucessfully !');
            }
            else
            {
                res.status(404).send('not found');
                console.log('data not found');
            }
        });

});
app.post('/setmovie',(req,res)=>{
    const movie=new Movie({
        name:req.body.name,
        year:req.body.year,
        director:req.body.director
    });
    setmovies(movie).then(m1=>{
            res.send(m1);
            console.log('data saved sucessfully !');
    }).catch((err)=>{
        res.status(400).send(err.message);
        console.log(err.message);
    })
});
const port=3010;
app.listen(port,()=>{
    console.log(`listening at ${port}`);
})
// function postvalidate(movie){
//     const schema=joi.object({
//         year:joi.number().integer().required().max(2022).min(1965),
//         name:joi.string().required().max(50),
//
//     })
//     return joi.validate(movie,schema);
// }
// function getvalidate(movie){
//     const schema=joi.object({
//         year:joi.number().integer().max(2022).min(1965),
//         name:joi.string().max(50),
//
//     })
//     const va=schema.validate(movie);
//     console.log(va);
//     return va;
// }

