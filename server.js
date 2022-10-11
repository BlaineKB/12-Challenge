const inquirer =  require("inquirer");
const db = require("./db");
require("console.table");

// Initial prompt with different employee options
const employeeMenu = async () => {
  const answer = await inquirer.prompt([
    {
      name: 'options',
      type: 'list',
      message: 'Please choose an option:',
      choices: [
        { name: 'View all departments', value: viewDepartments },
        { name: 'View all employees', value: viewEmployees },
        { name: 'View all roles', value: viewRoles },
        { name: 'Add department', value: addDepartment },
        { name: 'Add employee', value: addEmployee },
        { name: 'Add role', value: addRole },
        { name: 'Update employee role', value: updateRole },
        { name: 'Exit', value: exitMenu },
      ],
    },
  ]);

  answer.options();
};

// Views all departments
function viewDepartments() {
  db.findAllDepartments().then(([rows]) => {
    console.table(rows);
    return employeeMenu();
  });
}

// Views all employees
function viewEmployees() {
  db.findAllEmployees().then(([rows]) => {
    console.table(rows);
    return employeeMenu();
  });
}

// Views all roles
function viewRoles() {
  db.findAllRoles().then(([rows]) => {
    console.table(rows);
    return employeeMenu();
  });
}

// Adds new department to table
const addDepartment = async () => {
  const answer = await inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is the name of the new department?',
    },
  ]);

  const departmentName = answer.name;
  db.addNewDepartment(departmentName).then(() => {
    db.findAllDepartments().then(([rows]) => {
      console.table(rows);
      return employeeMenu();
    });
  });
};

function mapEmployeeOptions({ id, name }) {
  return { name, value: id };
}

// Adds new employee to table
const addEmployee = async () => {
  const [rows1] = await db.findAllRoles();
  console.table(rows1);
  const roleOptions = rows1.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const [rows2] = await db.findAllEmployees();
  const employeeOptions = rows2.map(mapEmployeeOptions);
  
  const managerOptions = [...employeeOptions, { name: "Null" }];
  
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of this employee?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of this employee?',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'What role does this employee have?',
      choices: roleOptions,
    },
    {
      type: 'confirm',
      name: 'managerQuestion',
      message: 'Does this employee have a manager?',
      default: true,
    },
    {
      type: 'list',
      name: 'manager_id',
      when: function (answers) {
        return answers.managerQuestion === true;
      },
      message: 'Who is the manager of this employee?',
      choices: managerOptions,
    },
  ]);
  delete answer.managerQuestion;
  console.log(answer);
  db.addAnEmployee(answer).then(() => {
    db.findAllEmployees().then(([rows]) => {
      console.table(rows);
      return employeeMenu();
    });
  });
};

// Adds new role to table
const addRole = async () => {

  const [rows] = await db.findAllDepartments();
  console.table(rows);
  const departmentChoices = rows.map(({ department_name, id }) => ({ name: department_name, value: id }));

  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the title of the role?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?',
    },
    {
      type: 'list',
      name: 'department',
      message: 'This role belongs to which department?',
      choices: departmentChoices,
    },
  ]);

  db.addNewRole(answer.name, answer.salary, answer.department).then(() => {
    db.findAllRoles().then(([rows]) => {
      console.table(rows);
      return employeeMenu();
    });
  });
};

// Updates existing role in table
const updateRole = async () => {
  const [rows1] = await db.findAllRoles();
  console.table(rows1);
  const roleOptions = rows1.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  console.log(roleOptions);

  const [rows2] = await db.findAllEmployees();
  const employeeOptions = rows2.map(mapEmployeeOptions);
  console.log(employeeOptions);
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee's role do you want to update?",
      choices: employeeOptions,
    },
    {
      type: "list",
      name: "role",
      message: "What is this employee's new role?",
      choices: roleOptions,
    },
  ]);
  console.log(answer);
  db.updateEmployeeRole(answer.role, answer.employee).then(() => {
    db.findAllEmployees().then(([rows]) => {
      console.table(rows);
      return employeeMenu();
    });
  });
};

// Exits out of the employee menu
const exitMenu = () => {
  console.log("You have exited the menu!");
  process.exit(0);
};

employeeMenu();


