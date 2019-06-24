const express = require("express");

const app = express();

let students = [
    {
        name: 'student 1',
        skill: 4,
    },
    {
        name: 'student 2',
        skill: 2,
    },
    {
        name: 'student 3',
        skill: 12,
    },
    {
        name: 'student 4',
        skill: 7,
    },
    {
        name: 'student 5',
        skill: 1,
    },
    {
        name: 'student 6',
        skill: 11,
    }
];

let input = {
    students,
    random: true,
    size: 3
}

// Currently sending back sorted students array to root in ascending order
app.get('/', function(req, res){
    students.sort((a, b) => (a.skill - b.skill));
    res.json(students);
});

module.exports = app;