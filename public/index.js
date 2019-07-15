

function studentClick(event){
  event.preventDefault();
  console.log('Student was Clicked');
  
  var url = '/add-student';
  var data = {name: document.getElementById('name').value,
  skill: document.getElementById('skill-level').value };
  console.log(data);
  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));

  window.location.replace("group.html");
}



function adminClick(event){
  event.preventDefault();
  console.log('Admin was Clicked');
    
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
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));

  window.location.replace("group.html");

}


