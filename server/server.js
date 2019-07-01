const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static('public'));

const students = [
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

let options = {
  students,
  random: true,
  size: 3
};

function generateGroups(students, random, size) {
  if (random) {
    let temp = (students.length - 1) / size;
    // TODO: add logic to create random groups

    // return random students;
  }

  students = students.sort((a, b) => a.skill - b.skill);

  let buckets = [[]];
  let numberOfGroups = Math.trunc(students.length / size);

  for (let i = 0; i < numberOfGroups; i++) {
    if (i === numberOfGroups - 1) {
      buckets[i] = students.slice(i * numberOfGroups + 1);
    } else
      buckets[i] = students.slice(
        i * numberOfGroups,
        (i + 1) * numberOfGroups + 1
      );
    buckets[i].sort(function(a, b) {
      return 0.5 - Math.random();
    });
  }
  let results = [[]];
  var n = 0;
  while (buckets.length != 0) { //unfinished while loop
    for (let i = 0; i < buckets.length; i++) {
      if (results[n] == undefined) results[n] = [buckets[i].pop()];
      else results[n] = results[n].push(buckets[i].pop());
    }
    n++;
  }
  return results;
}

app.post("/admin", (req, res) => {
  const { students, random, size } = req.body;
  res.json(generateGroups(students, random, size));
});

app.post("/add-student", (req, res) => {
  students.push(req.body);
});

// Currently sending back sorted students array to root in ascending order
app.get("/", function(req, res) {
  students.sort((a, b) => a.skill - b.skill);
  res.json(students);
});

module.exports = app;
