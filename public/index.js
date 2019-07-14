function studentClick(event){
  event.preventDefault();

  const url = '/add-student';
  const data = {
    name: document.getElementById('name').value,
    skill: document.getElementById('skill-level').value
  };
  
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(response => window.location.replace("group.html"))
  .catch(error => console.error('Error:', error));

}

function adminClick(event){
  event.preventDefault();
    
  var url = '/admin';      //admin page
  var data = {random: document.getElementById('isRandom').value,
  size: document.getElementById('group').value };
  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => window.location.replace("group.html"))
  .catch(error => console.error('Error:', error));
}

function getNumberOfStudents(){
  fetch("/students")
  .then(function(response) {
    return response.json();
  })
  .then(function(studentData) {
    document.getElementById('num-students').innerHTML = studentData.length;
  })
  .catch((err)=>{
    console.log(err);
  })
}

getNumberOfStudents();
