
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);


let teamHTML = "";
//let employees = [];

function ValidateEmail(input) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
    return true;
  } else {
    return "Please enter a valid email address!";
  }
}

function start() {
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
      const manager = new Manager(
        data.managerName,
        data.managerId,
        data.managerEmail,
        data.managerOfficeNo
      );
      console.log(`${data.managerName} has been added!`);
      teamMember = fs.readFileSync("templates/manager.html");
      teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
      //teamHTML.push(manager);
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
      const engineer = new Engineer(
        data.engineerName,
        data.engineerId,
        data.engineerEmail,
        data.engineerGitHub
      );
      console.log(`${data.engineerName} has been added!`);
      teamMember = fs.readFileSync("templates/engineer.html");
      teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
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
      const intern = new Intern(
        data.internName,
        data.internId,
        data.internEmail,
        data.internSchool
      );
      console.log(`${data.internName} has been added!`);
      teamMember = fs.readFileSync("templates/intern.html");
      teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
      // teamHTML.push(intern);
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
        const mainHTML = fs.readFileSync("templates/main.html");
        teamHTML = eval("`" + mainHTML + "`");

        fs.writeFile("output/team.html", teamHTML, function (err) {
          if (err) {
            return console.log(err);
          }
          {
            console.log("Check the output folder for the team.html");
          }
        });
      }
    });
}

start();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
