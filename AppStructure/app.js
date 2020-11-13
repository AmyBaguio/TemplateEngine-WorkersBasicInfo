const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html")

const render = require("./lib/htmlRenderer");

let employee = []

function ValidateEmail(input) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
    return true;
  } else {
    return "Please enter a valid email address!";
  }
}


function getEmployees() {
  console.log("Please build your Team.");

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager's name?",
        name: "managerName",
      },
      {
        type: "input",
        message: "What is the manager's Id?",
        name: "managerId",
      },
      {
        type: "input",
        message: "What is the manager's email?",
        name: "managerEmail",
        validate: ValidateEmail,
      },
      {
        type: "input",
        message: "What is the manager's Office Number?",
        name: "managerOfficeNo",
      },
    ])
    .then((data) => {

      let manager = new Manager(
        data.managerName,
        data.managerId,
        data.managerEmail,
        data.managerOfficeNo
      );
      console.log(`${data.managerName} has been added!`);
      teamMember = fs.readFileSync("templates/manager.html");
      
      employee.push(manager);
      addAnother();
    });
}

function addEngineer() {
  console.log("Lets add your Engineer");

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the engineer's name?",
        name: "engineerName",
      },
      {
        type: "input",
        message: "What is the engineer's Id?",
        name: "engineerId",
      },
      {
        type: "input",
        message: "What is the engineer's email?",
        name: "engineerEmail",
        validate: ValidateEmail,
      },
      {
        type: "input",
        message: "What is the engineer's GitHub user name?",
        name: "engineerGitHub",
      },
    ])
    .then((data) => {
      let engineer = new Engineer(
        data.engineerName,
        data.engineerId,
        data.engineerEmail,
        data.engineerGitHub
      );
      console.log(`${data.engineerName} has been added!`);
      teamMember = fs.readFileSync("templates/engineer.html");
     
      employee.push(engineer);
      addAnother();

    });
}

function addIntern() {
  console.log("Lets add your Intern");

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the intern's name?",
        name: "internName",
      },
      {
        type: "input",
        message: "What is the intern's Id?",
        name: "internId",
      },
      {
        type: "input",
        message: "What is the intern's email?",
        name: "internEmail",
        validate: ValidateEmail,
      },
      {
        type: "input",
        message: "What school does the intern attend?",
        name: "internSchool",
      },
    ])
    .then((data) => {
      let intern = new Intern(
        data.internName,
        data.internId,
        data.internEmail,
        data.internSchool
      );
      console.log(`${data.internName} has been added!`);
      teamMember = fs.readFileSync("templates/intern.html");
      
      employee.push(intern);
      addAnother();
    });
}

function addAnother() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose the role of your next team member",
        name: "choice",
        choices: ["Add Engineer", "Add Intern", "Done Adding"],
      },
    ])
    .then(function (data) {
      if (data.choice === "Add Engineer") {
        addEngineer();
      } else if (data.choice === "Add Intern") {
        addIntern();
      } else {

        let teamHTML = render(employee);
        fs.writeFile(outputPath, teamHTML, "utf8", function (err) {
          if (err) {
            return console.log(err);
          }
          {
            console.log("Check the output folder to view Team Profile Generator");
          }
        });
      }
    });
}


getEmployees();

