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
  .then(response => window.location.replace("success.html"))
  .catch(error => {
    console.error('Error:', error);
    alert('Please input a skill level between 1 and 12');
  });

}

function createGroups(event){
  event.preventDefault();
    
  const url = '/admin';
  const random = document.getElementById('isRandom').checked;
  const data = {
    random,
    size: document.getElementById('group').value
  };
  
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => window.location.replace("group.html"))
  .catch(error => {
    console.error('Error:', error);
    alert('Please input a valid number of groups');
  });
}

function deleteStudents(event){
  event.preventDefault();
    
  const url = '/delete-students';

  fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(response => window.location.reload(true))
  .catch(error => {
    console.error('Error:', error);
  });
}

function getNumberOfStudents(){
  fetch("/students")
  .then((response) => {
    return response.json();
  })
  .then((studentData) => {
    document.getElementById('num-students').innerHTML = studentData.length;
  })
  .catch(err => console.log(err));
}

getNumberOfStudents();
