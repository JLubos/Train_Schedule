// define shortcut var for database
var db = firebase.database();

// define shortcut for employee table HTML element
var employeeTable = $('#employeeTable');

// on click of new employee form submit button...
$('#addEmployeeButton').click(function (event) {
    // stop page from reloading
    event.preventDefault();

    // define employee object with info from form input fields
    var employee = {
        name: $('#employeeName').val().trim(),
        role: $('#employeeRole').val().trim(),
        start: $('#employeeStart').val().trim(),
        rate: $('#employeeRate').val().trim()
    }

    // if fields are not empty...
    if (employee.name && employee.role && employee.start && employee.rate !== '') {
        // push the new employee's info to the employees "table" in the database
        db.ref('/employees').push(employee);
    } else {
        // alert the user if form input fields are empty
        alert('Please enter new employee information.')
    }

    // reset form input fields
    $('#employeeName').val('')
    $('#employeeRole').val('')
    $('#employeeStart').val('')
    $('#employeeRate').val('')
});

// define function to convert string date to javascript date
function toDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[2], parts[0] - 1, parts[1]);
}

// define function to subtract the # of months employee's start date from current date
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

db.ref('/employees').on('child_added', function (employee) {

    // define variable for new date subtract employee start date from
    var currentDate = new Date();

    // convert employee firebase object to JSON
    var employee = employee.toJSON();

    // define variable for employee object key to add to table row id
    var key = employee.key;

    // convert the employee's start date to javascript date format
    var startDate = toDate(employee.start);

    // subtract start date from current date to get # of months worked
    var monthsWorked = monthDiff(startDate, currentDate);

    // define variable for the total the employee has billed
    var totalBilled = (monthsWorked * employee.rate);

    // append the employee's info to table cells
    var name = $('<td></td>').append(employee.name);
    var role = $('<td></td>').append(employee.role);
    var start = $('<td></td>').append(employee.start);
    var worked = $('<td></td>').append(monthsWorked);
    var rate = $('<td></td>').append('$' + parseInt(employee.rate).toLocaleString({ style: 'currency', currency: 'USD' }));
    var billed = $('<td></td>').append('$' + parseInt(totalBilled).toLocaleString({ style: 'currency', currency: 'USD' }));

    // define an html table row element with the employee database object key as the id
    var employeeRow = $('<tr></tr>').attr('id', key + 'EmployeeRow');

    // append the employee info cells to the table row
    employeeRow.append(name)
        .append(role)
        .append(start)
        .append(worked)
        .append(rate)
        .append(billed);

    // append the new employee row to the employees table
    employeeTable.append(employeeRow);
})
