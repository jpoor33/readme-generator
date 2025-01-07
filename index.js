import inquirer from 'inquirer';
import fs from 'fs';
import badges from 'badge-maker';

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Please add a Readme title',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Please describe your project',
        name: 'description'
    },
    {
        type: 'input',
        message: 'Please add installation instructions',
        name: 'install-instructions'
    },
    {
        type: 'input',
        message: 'Please add usage information',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'Please add contribution guidelines',
        name: 'contribution'
    },
    {
        type: 'input',
        message: 'Please add tests',
        name: 'tests' 
    },
    {
        type: 'list',
        message: 'Please choose a license',
        name: 'license',
        choices: ['MIT', 'GPL', 'Ms-PL', 'BSD', 'CDDL', 'EPL','None']
    },
    {
        type: 'input',
        message: 'Please add your GitHub profile',
        name: 'github'
    },
    {
        type: 'input',
        message:'Please add your email address',
        name:'email'
    }
];

// Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    if (license !== 'None') {
      return `![GitHub license](https://img.shields.io/badge/license-${license.replace(
        ' ',
        '_'
      )}-blue.svg)`;
    }
    return '';
  }
  
// Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
    if (license !== 'None') {
      return '\n* [License](#license)\n';
    }
    return '';
  }

// TODO: Create a function to write a README file
function writeToFile(fileName, data) {
    let content = `# ${data.title}\n\n`;

    //generate the license badge and link
    const licenseBadge = renderLicenseBadge(data.license);
    const licenseLink = renderLicenseLink(data.license);

    // Include the license badge at the top if a license is selected
    if (licenseBadge) {
        content += `${licenseBadge}\n\n`;
    }

    // Create a Table of Contents
    content += `## Table of Contents\n`;
    content += `- [Description](#description)\n`;
    content += `- [Installation Instructions](#installation-instructions)\n`;
    content += `- [Usage](#usage)\n`;
    content += `- [Contribution Guidelines](#contribution-guidelines)\n`;
    content += `- [Tests](#tests)\n`;
    content += `- [License](#license)\n`;
    content += `- [Questions](#questions)\n\n`

    // Create each section
    content += `## Description\n${data.description}\n\n`;
    content += `## Installation Instructions\n${data['install-instructions']}\n\n`;
    content += `## Usage\n${data.usage}\n\n`;
    content += `## Contribution Guidelines\n${data.contribution}\n\n`;
    content += `## Tests\n${data.tests}\n\n`;

    // Include the link if a license is selected
    if (data.license !== 'None') {
    content += `## License\nThis project is licensed under: ${licenseBadge}\n`;
    } else {
    content += `## License\nThis project is not licensed.\n`;
    }

    content += `## Questions\n If you have any questions, please reach out to me at:\n\n`;
    content += `- GitHub: [${data.github}](https://github.com/${data.github})\n`;
    content += `- Email: [${data.email}](mailto:${data.email})\n\n`;

    // Write the content to the specified file
    fs.writeFile(fileName, content, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('`Readme created! Go check it out!`');
        }
    });
}

// TODO: Create a function to initialize the app
function init() {
inquirer.prompt(questions)
.then((response) => {
    writeToFile('readme.md', response);
});
}

// Function call to initialize app
init();