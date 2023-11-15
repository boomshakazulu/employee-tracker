const db = require('../config/connection')

class DBQuery {
    constructor(db){
      this.db = db;
    }
    addDept(data) {
        const name = [data.name];
        return this.db
          .promise()
          .query(`INSERT INTO department (department_name) VALUES(?)`,name);
      }
      addRole(data) {
        const values = [data.title, data.salary, data.department_id];
        return this.db
          .promise()
          .query(`INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`,values);
      }
    
      addEmp(data) {
        const values = [data.first, data.last, data.role_id, data.manager_id];
        return this.db
          .promise()
          .query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES(?,?,?,?)`,values)
      }
      updateEmpRoleById(data) {
        const values = [data.role_id, data.emp_id];
        return this.db
          .promise()
          .query(`UPDATE employee SET role_id = ? WHERE id = ?`,values)
      }
      getDepts() {
        return this.db
          .promise()
          .query(`SELECT * FROM department`)
      }
      getEmployeeById() {
        return this.db
          .promise()
          .query(`SELECT * FROM employee WHERE id = '${this.id}'`)
      }
      getEmps() {
        return this.db
          .promise()
          .query(
            `SELECT e.id as 'Employee_ID', 
            e.first_name AS 'First_Name',
            e.last_name AS 'Last_Name',
            department.department_name AS Department,
            role.salary AS Salary,
            role.title AS Role,
            CONCAT(mgmt.first_name,' ',mgmt.last_name) as Manager
            FROM employee e
            LEFT JOIN employee mgmt
            ON e.manager_id = mgmt.id 
            INNER JOIN role
            ON e.role_id = role.id 
            LEFT JOIN department 
            ON role.department_id = department.id
            ORDER BY e.id;`
          )
      }
      getEmpRaw() {
        return this.db
          .promise()
          .query(
            `SELECT e.id, 
             e.first_name,
             e.last_name
             FROM employee e`
            )
      }
      getRoles() {
        return this.db
          .promise()
          .query(`SELECT * FROM role`)
      }
      getManagers() {
        return this.db
          .promise()
          .query(
          `SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name
          FROM employee 
          WHERE manager_id IS NULL`
        )
      }      
}

module.exports = new DBQuery(db);