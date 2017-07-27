var db = firebase.database();

function createEmployee(event) {
    event.preventDefault();

    var employee = {
        name: $('#').val().trim(),
        role: $('#').val().trim(),
        start: $('#').val().trim(),
        rate: $('#').val().trim()
    }

    db.ref('/employees').push(employee);
}