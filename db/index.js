const connection = require("./connection");

class db {
  constructor(connection) {
    this.connection = connection;
  }

  findAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }

  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, role.salary, department.department_name AS department FROM role LEFT JOIN department ON role.department_id = department.id"
      );
  }

  findAllEmployees() {
    return this.connection.promise()
    .query(`SELECT
    employee.id, CONCAT(employee.first_name, ' ' , employee.last_name) AS name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager
    FROM
    employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`);
  }

  addNewDepartment(departmentName) {
    return this.connection
      .promise()
      .query("INSERT INTO department (department_name) VALUES (?)", [departmentName]);
  }

  addNewRole(roleTitle, roleSalary, roleDepartmentId) {
    return this.connection
      .promise()
      .query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [roleTitle, roleSalary, roleDepartmentId]
      );
  }

  addAnEmployee(answer) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", answer);
  }

  updateEmployeeRole(roleId, employeeId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }
}

module.exports = new db(connection);