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

    if (employee.name && employee.role && employee.start && employee.rate !== '') {

        db.ref('/employees').push(employee);
    } else {
        alert('Please enter new employee information.')
    }

    $('#employeeName').val('')
    $('#employeeRole').val('')
    $('#employeeStart').val('')
    $('#employeeRate').val('')
});

// var currentMonth = new Date(year, month);


function toDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[2], parts[0] - 1, parts[1]);
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

db.ref('/employees').on('child_added', function (employee) {


    var currentDate = new Date();

    var employee = employee.toJSON();
    var key = employee.key;

    var startDate = toDate(employee.start);

    var monthsWorked = monthDiff(startDate, currentDate);

    var totalBilled = (monthsWorked * employee.rate);

    var name = $('<td></td>').append(employee.name);
    var role = $('<td></td>').append(employee.role);
    var start = $('<td></td>').append(employee.start);
    var worked = $('<td></td>').append(monthsWorked);
    var rate = $('<td></td>').append('$' + parseInt(employee.rate).toLocaleString({ style: 'currency', currency: 'USD' }));
    var billed = $('<td></td>').append('$' + parseInt(totalBilled).toLocaleString({ style: 'currency', currency: 'USD' }));

    var employeeRow = $('<tr></tr>').attr('id', key + 'EmployeeRow');

    employeeRow.append(name)
        .append(role)
        .append(start)
        .append(worked)
        .append(rate)
        .append(billed);

    employeeTable.table.append(employeeRow);
})
