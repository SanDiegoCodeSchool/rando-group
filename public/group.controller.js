  fetch('/group')
    .then(res => res.json())
    .then((result)=> {
      result.map(group => createTable(group));
    })
    .catch(err => console.log('feels bad no data'));

function createTable(students){
  const table = document.createElement('table');

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
