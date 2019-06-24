const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

let data = [];
// const data = {
//     student: [
//     {
//         name: 'Sam',
//         skill: 10
//     },
//     {
//         name: 'John',
//         skill: 11
//     },
//     {
//         name: 'Godfrey',
//         skill: 10
//     }
//     ],
//     random: true,
//     size: 2
// };


app.use(morgan('dev'));
app.use(bodyParser.json());

function generateGroups(random, number) {
    if(random){
        let size = (data.length-1)/number;
    }
}

app.get("/", (req,res)=> {
    res.send(data);
})

app.post("/admin", (req,res) => {
    
    generateGroups(req.body.random, req.body.number);
})


app.post("/add-student", (req,res)=> {
    data.push(req.body);
})









app.listen(8080, console.log('listening to port 8080'));

