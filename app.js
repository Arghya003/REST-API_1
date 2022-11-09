const expresss= require("express");

const PORT=process.env.PORT||3000;
const Joi= require("joi");



const app= expresss();
app.use(expresss.json());

const courses=[
    {id:1, name:"course1"},
    {id:2, name:"course 2"},
    {id:3,name:"course 3"},
];

app.get('/',(req,res)=>{
    res.send("hello world")
});

app.get("/api/courses",(req,res)=>{
    res.send(courses)
});

//api/courses//1
//routes
app.get('/api/courses/:id',(req,res)=>{
   const course= courses.find(c=>c.id===parseInt(req.params.id));
   if(!course){
    res.status(404).send("Not Found")
   }
   res.send(course)
});
app.post("/api/courses",(req,res)=>{
    // if(!req.body.name||req.body.length<3){
    //     res.status(404).send("Invalid Name")
    //     return
    // }
    const schema= Joi.string().min(3).required();

    const { error } = schema.validate(req.body);
    res.send(error.details[0].message);

    const course= {
        id:courses.length+1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})


app.listen(PORT,()=>{
console.log(`listening to port ${PORT}...`)
})


app.put('/api/courses/:id',(req,res)=>{

    

    const course= courses.find(c=>c.id===parseInt(req.params.id));
   if(!course){
    res.status(404).send("Not Found")
   }
   res.send(course)
   const {error}= validateaCourse(req.body)

    res.send(error.details[0].message);


    course.name= req.body.name;
    res.send(course)

   

})


function validateaCourse(course){
const schema= Joi.string().min(3).required();

   const {error}=schema.validate(course);
   return error;
   
}

app.delete("/api/courses/:id",(req,res)=>{
    const course= courses.find(c=>c.id===parseInt(req.params.id));
   if(!course){
    res.status(404).send("Not Found")
   }

   const index= courses.indexOf(course);
   courses.splice(index);
   res.send(course)

})