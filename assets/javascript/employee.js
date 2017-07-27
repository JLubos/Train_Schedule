var db = firebase.database();

var employeeTable = {
    table: $('#employeeTable'),
    row: $('<tr></tr>'),
    cell: $('<th></th>')
}

$('#addEmployeeButton').click(function (event) {
    event.preventDefault();

    var employee = {
        name: $('#employeeName').val().trim(),
        role: $('#employeeRole').val().trim(),
        start: $('#employeeStart').val().trim(),
        rate: $('#employeeRate').val().trim()
    }

    db.ref('/employees').push(employee);

    $('#employeeName').val('')
    $('#employeeRole').val('')
    $('#employeeStart').val('')
    $('#employeeRate').val('')
});

// var currentMonth = new Date(year, month);

// db.ref('/employees').on('child_added', function (employee) {
//     var key = employee.key;

//     var

//     var name = employeeTable.cell.html(employee.name);
//     var role = employeeTable.cell.html(employee.role);
//     var start = employeeTable.cell.html(employee.start);
//     var worked = employeeTable.cell.html();
//     var rate = employeeTable.cell.html(employee.rate);
//     var billed = employeeTable.cell.html();

//     var employeeRow = employeeTable.row.attr('id', key + 'EmployeeRow');


// })
