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

  function createTable(mockData){
    var table = document.getElementsByTagName('table');

    var tableBody = document.createElement('tbody');
    var td = document.createElement('td');
    var tr = document.createElement('tr');
    
    mockData.map(function (student){
    td.appendChild(document.createTextNode(`${student.name}`))
    tr.appendChild(td)

    })
    
    tableBody.appendChild(tr);
    table.appendChild(tableBody)
    }

 createTable(mockData);
