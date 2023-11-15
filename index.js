const inquirer = require("inquirer");
const query = require('./lib/query');
const helper = require('./lib/helper');
const { printTable } = require('console-table-printer');

//function for viewing employees
const viewEmps = async () => {
    const emps = await query.getEmps()
    printTable(emps[0]);
    init();
}

//function for viewing Roles
const viewRoles = async () => {
    const roles= await query.getRoles()
    printTable(roles[0]);
    init();
}

//function for viewing departments
const viewDepts = async () => {
    const depts = await query.getDepts()
    printTable(depts[0]);
    init();
}

//function for updating roles
const updateEmpRole = async () => {
    const roleArr = await helper.roleChoices();
    const empArr = await helper.empChoices();
    const emp = await inquirer.prompt([
        {
        type: "list",
        name: "emp_id",
        message: "What is the Employee do you want to update?",
        choices: empArr,
        loop: false,
        },
        {
        type: "list",
        name: 'role_id',
        message: "What is the Employees Role?",
        choices: roleArr,
        loop: false,
        }
    ]);  
    await query.updateEmpRoleById(emp);
    init();    
}

//creates new roles
const newRole = async () => {
    const choicesArr = await helper.deptChoices();  
    const role = await inquirer.prompt([
        {
        type: "input",
        name: "title",
        message: "What is the name of the Role?",
        validate: (title) =>{
            if (title) {
              return true;
            } else {
              console.log(" Please Enter a Role Name!")
              return false;
            }
        },
        },
       {
        type: "input",
        name: 'salary',
        message: "What is the Salary of the Role?",
        validate: (salary) =>{
            if(salary && !isNaN(salary)){
              return true;
            } else {
              console.log(" Please Enter a Role Salary");
            }
        }
       },
       {
        type: "list",
        name: 'department_id',
        message: "What Department is the Role associated with?",
        choices: choicesArr,
        loop: false,
      }
     ]);
  
    await query.addRole(role); 
    init();     
}
//creates new employee
const newEmp = async () => {
    const roleArr = await helper.roleChoices(); 
    const mgmtArr = await helper.mgmtChoices();  
    const emp = await inquirer.prompt([
    {
        type: "input",
        name: "first",
        message: "What is the Employees First Name?",
        validate: (first) =>{
            if (first && isNaN(first)) {
              return true;
            } else {
              console.log(" Please Enter a Name!")
              return false;
            }
        },
    },
    {
        type: "input",
        name: "last",
        message: "What is the Employees Last Name?",
        validate: (last) =>{
            if (last && isNaN(last)) {
              return true;
            } else {
              console.log(" Please Enter a Name!")
              return false;
            }
        },
    },
    {
        type: "list",
        name: 'role_id',
        message: "What is the Employees Role?",
        choices: roleArr,
        loop: false,
    },
    {
        type: "list",
        name: 'manager_id',
        message: "Who is the Employees Manager?",
        choices: mgmtArr,
        loop: false,
    }
    ]);  
    await query.addEmp(emp);  
    init();     
}
//creates new department
const newDept = async () => {  
    const deptartment = await inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the name of the Department",
        validate: (name) =>{
            if (name) {
              return true;
            } else {
              console.log("Please Enter a Department Name!")
            return false;
            }
        },
    },
    ]);  
    await query.addDept(deptartment);  
    init();
  }


const init = () => {
   inquirer.prompt([
        {
            type: 'list',
            name: 'request',
            message: 'What would you like to do?',
            choices: ['Add a Department', 
                'Add an Employee', 
                'Add a Role',
                'Update Employees Role',
                'View All Departments', 
                'View All Employees', 
                'View All Roles', 
            ],
            loop: false,
        },
    ]).then((data)=>{
        const{request} = data;
    switch (request) {
        case 'Add a Department':
            newDept();
            break;
        case 'Add a Role':
            newRole();
            break;
        case 'Add an Employee':
            newEmp();
            break;
        case 'Update Employees Role':
            updateEmpRole();
            break;
        case 'View All Departments':
            viewDepts();
            break;
        case 'View All Employees':
            viewEmps();
            break;
        case 'View All Roles':    
        viewRoles();
            break;                           
        default:
            break;
    }
})
}
  
  init();