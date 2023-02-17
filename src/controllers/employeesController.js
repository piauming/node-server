const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (input) { this.employees = input }
}

/*
    This method is used to send a JSON response. Following are a few examples −
    res.json(null)
    res.json({ user: 'tobi' })
    res.status(500).json({ error: 'message' })
*/

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

module.exports = {
    getAllEmployees,
}
