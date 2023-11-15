const query = require('./query');

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

  const empChoices = async () => {
    const newArr = await query.getEmps();
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