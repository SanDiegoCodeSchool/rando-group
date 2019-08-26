  fetch('/group')
    .then(res => res.json())
    .then((result)=> {
      let groups = result.groups
      groups.map(group => createTable(group));
    document.getElementById('timestamp').innerHTML=result.lastGenerated.toString();
    })
    .catch(err => console.log('feels bad no data'));

function createTable(students){
  const table = document.createElement('table');

  const tableHead = document.createElement('thead');

  
  
  const tableBody = document.createElement('tbody');
  let tr;
  let td;

  students.map(function (student){
    tr = document.createElement('tr');
    td = document.createElement('td');

    td.appendChild(document.createTextNode(`(${student.skill}) ${student.name} `));
    tr.appendChild(td);
    tableBody.appendChild(tr);
  });
  
  table.appendChild(tableBody)
  document.body.appendChild(table);
}
