USE employeetracker_db;

INSERT INTO department (department_name)

VALUES
("Legal"),
("Sales"),
("Finance");

INSERT INTO role (title, salary, department_id)

VALUES
("Legal Team Lead", 300000, 1),
("Lawyer", 200000, 1),
("Sales Lead", 150000, 2),
("Salesperson", 120000, 2),
("Account Lead", 100000, 3),
("Accountant", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES
("Billy", "Brown", 1, NULL),
("Sarah", "Jennings", 2, 1),
("Kevin", "White", 3, 1),
("Maria", "Kurdy", 4, 1),
("Jennifer", "Welsh", 5, 1),
("Michael", "Richards", 6, 1);