// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email, role) {
      this.id = id;
      this.name = name;
      this.email = email;
      
      this.role = "Employee"; // Returns 'Employee'
    }
    getId() {
      return this.id;
    }
  
    getName() {
      return this.name;
    }
  
    getEmail() {
      return this.email;
    }
  
    getTitle() {
      return this.title;
    }
    getRole() {
      return this.role;
    }
  }
  module.exports = Employee;