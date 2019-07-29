const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static('public'));

var groups = [];
let students = [];

function generateGroups(students, random, size) {
  if (random) {
    let studentsRemainder = students.length % size;
    let remainingStudents = students.slice(students.length - studentsRemainder, students.length);
    let otherStudents = students.slice(0, students.length - studentsRemainder);
    let groups = [];
    let groupSize = otherStudents.length;
    for (let i = 0; i < size; i++) {
      let group = otherStudents.splice(0, groupSize / size);
      groups.push(group);
    }
    for (let i = 0; i < studentsRemainder; i++) {
      groups[i].push(remainingStudents[i]);
    }
    return groups;
  } else {

    students = students.sort((a, b) => a.skill - b.skill);

    let groups = new Array(size);
    for(let i = 0; i < size; i++){
      groups[i]=[];
    }
    while(students.length > 0) {
      for(let i=0; i<size; i++){
        if (students.length > 0){
          groups[i].push(students[0]);
          students.shift();
        }
      }
    }
    return groups;
  }
}

app.post("/admin", (req, res) => {
  const { random, size } = req.body;
  if (typeof (random) === 'boolean'
    && /^[0-9]+$/.test(size)
    && parseInt(size) > 0) {
    groups = generateGroups(students, random, size);
    res.status(200).send(groups);
  } else {
    res.status(422).send('invalid data');
  }
});

app.post("/add-student", (req, res) => {
  const student = {
    name: req.body.name,
    skill: parseInt(req.body.skill)
  };

  if (typeof (student.skill) === 'number' &&
    student.skill >= 1 && student.skill <= 12 &&
    typeof (student.name) === 'string' &&
    student.name.length <= 50) {
    students.push(student);
    res.send(req.body);
  } else {
    res.status(422).send('invalid data');
  }
});

app.post("/delete-students", (req, res) => {
  let count = students.length;
  students = [];
  res.send({ "deleted": count });
});

// Currently sending back sorted students array to root in ascending order
app.get("/students", function (req, res) {
  students.sort((a, b) => a.skill - b.skill);
  generateGroups(students, true, 2);
  res.json(students);
});

app.get("/group", function (req, res) {
  res.json(groups);
})

app.get("*", function (req, res) {
  res.status(404).send("error: page not found");
});

module.exports = app;
