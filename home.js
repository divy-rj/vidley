const express=require('express');
var app=express();
app.use(express.json());
const joi=require('joi');
const movies=[{ Name: "The Red Violin", year: "1998", Director: "François Girard" },
    { Name: "Eyes Wide Shut", year: "1999", Director: "Stanley Kubrick" },
    { Name: "The Inheritance", year: "1976", Director: "Mauro Bolognini" }
];
app.post()
app.get('/year/:year',(req,res)=>{
   const val=getvalidate({year:(req.params.year)});
   if(!val.error){
      var mv=movies.filter((m)=>{
          return m.year===req.params.year;
      })
       if(mv.length>0){
           res.send(mv);
           console.log('data sent sucessfully !');
       }
    else
       {
           res.status(404).send('not found');
           console.log('data not found');
       }

   }
   else
   {
       res.status(400).send(val.error.message);
       console.log('bad request');
   }
})
const port=3010;
app.listen(port,()=>{
    console.log(`listening at ${port}`);
})
function postvalidate(movie){
    const schema=joi.object({
        year:joi.number().integer().required().max(2022).min(1965),
        name:joi.string().required().max(50),

    })
    return joi.validate(movie,schema);
}
function getvalidate(movie){
    const schema=joi.object({
        year:joi.number().integer().max(2022).min(1965),
        name:joi.string().max(50),

    })
    const va=schema.validate(movie);
    console.log(va);
    return va;
}