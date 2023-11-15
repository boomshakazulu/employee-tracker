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
          .query(`SELECT *FROM employee`)
      }
      getRoles() {
        return this.db
          .promise()
          .query(`SELECT * FROM role`)
      }
}

module.exports = new DBQuery(db);