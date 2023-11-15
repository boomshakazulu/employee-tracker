const query = require('./query');
//grabs the department choices for inquirer
const deptChoices = async () => {
    const newArr = await query.getDepts();
    const choices = newArr[0];
    let choicesArr = [];
    choices.forEach(e => {
        let data = {
            name: e.department_name,
            value: e.id
        }
        choicesArr.push(data);
    });  
    return choicesArr;
}
//grabs the manager choices for inquirer useful when creating a new employee  
const mgmtChoices = async () => {
    const newArr = await query.getManagers();
    const choices = newArr[0];
    let choicesArr = [];
    choices.forEach(e => {
        let data = {
            name: e.manager_name,
            value: e.id
        }
        choicesArr.push(data);
    });
    return choicesArr;
}
 //generates the choices for roles. used when both creating an employee and when changing roles 
const roleChoices = async () => {
    const newArr = await query.getRoles();
    const choices = newArr[0];
    let choicesArr = [];
    choices.forEach(e => {
        let data = {
            name: e.title,
            value: e.id
        }
        choicesArr.push(data);
    });
    return choicesArr;
}
//generates employee choices for enquirer
  const empChoices = async () => {
    const newArr = await query.getEmpRaw();
    const choices = newArr[0];
    let choicesArr = [];
    choices.forEach(e => {
        let data = {
            name: e.first_name + ' ' + e.last_name,
            value: e.id
        }
        choicesArr.push(data);
    });
    return choicesArr;
  }
  
  module.exports = {deptChoices, mgmtChoices, roleChoices, empChoices};