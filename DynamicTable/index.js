document.getElementById('tableForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const rows = parseInt(document.getElementById('rows').value);
  const cols = parseInt(document.getElementById('cols').value);
  
  const tableContainer = document.getElementById('tableContainer');
  
  tableContainer.innerHTML = '';
  
  const table = document.createElement('table');
  table.className = 'table table-bordered'; 
  
  for (let i = 0; i < rows; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < cols; j++) {
      const td = document.createElement('td');
      
      const input = document.createElement('input');
      input.type = 'text';
      input.value = `Row ${i + 1}, Col ${j + 1}`;
      td.appendChild(input);
      
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  
  tableContainer.appendChild(table);
});
