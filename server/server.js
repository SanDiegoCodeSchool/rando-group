const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static('public'));

var groups = [];
let students = [];
const mockData = [
  {
    name: "student 1",
    skill: 4
  },
  {
    name: "student 2",
    skill: 2
  },
  {
    name: "student 3",
    skill: 12
  },
  {
    name: "student 4",
    skill: 7
  },
  {
    name: "student 5",
    skill: 1
  },
  {
    name: "student 6",
    skill: 11
  }
];

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
    //TODO: Distribute members by skill level.
    // This code is not complete.
  // sort students so that we can later group by skill
  students = students.sort((a, b) => a.skill - b.skill);

  // contains all groups of students
  let buckets = [[]];
  let numberOfGroups = Math.trunc(students.length / size);

    for (let i = 0; i < numberOfGroups; i++) {
      // take original group of students and divide into arrays
      if (i === numberOfGroups - 1) {
        buckets[i] = students.slice(i * numberOfGroups + 1);
      } else {
        buckets[i] = students.slice(
          i * numberOfGroups,
          (i + 1) * numberOfGroups + 1
        );
      }
      // sorts the current array of students
      buckets[i].sort(function(a, b) {
        return 0.5 - Math.random();
      });
    }
  }
  return buckets;
}

app.post("/admin", (req, res) => {
  const { random, size } = req.body;
  groups = generateGroups(students, random, size);
  res.status(200).send(groups);
});

app.post("/add-student", (req, res) => {
  students.push(req.body);
  res.send(req.body);
});

// Currently sending back sorted students array to root in ascending order
app.get("/", function(req, res) {
  students.sort((a, b) => a.skill - b.skill);
  generateGroups(students, true, 2);
  res.json(students);
});

app.get("/group", function(req, res){
  res.json(groups);
})

app.get("*", function(req, res){
  res.status(404).send("error: page not found");
});

module.exports = app;
