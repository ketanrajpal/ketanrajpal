const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const {
  WebConfigurations,
  Employment,
  Education,
  Awards,
  FollowMe,
  Technology,
  TechnologyTemplate,
} = require("./modules");

let content = "";

WebConfigurations((data) => {
  content = `
  ### :necktie: Ketan Rajpal
  ${
    data.filter((o) => {
      return o.name === "about";
    })[0].value
  }
  
  ### :beers: Download my resume [here](${
    data.filter((o) => {
      return o.name === "resume";
    })[0].value
  })
  
  `;
  content += `### :rocket: Technologies.
  `;
  Technology((data) => {
    content = TechnologyTemplate(data, "Front-End", content);
    content = TechnologyTemplate(data, "Back-End", content);
    content = TechnologyTemplate(data, "Framework & Database", content);
    content = TechnologyTemplate(data, "Deployment", content);
    content = TechnologyTemplate(data, "Testing Framework", content);
    content = TechnologyTemplate(data, "Digital Design", content);

    Employment((data) => {
      content += `### :briefcase: Professional Experience.
  `;
      data.forEach((record) => {
        content += `* **${record.designation}** :point_right: ${record.organisation}
  `;
      });
      Education((data) => {
        content += `### :mortar_board: Education.
  `;
        data.forEach((record) => {
          content += `* **${record.programme}** :point_right: ${record.university}
  `;
        });
        Awards((data) => {
          content += `### :trophy: Awards.
  `;
          data.forEach((record) => {
            content += `* **${
              record.position === 1 ? "1st" : "2nd"
            }** position in **${record.event}** :point_right: ${
              record.institution
            }
  `;
          });
          FollowMe((data) => {
            content += `### :star2: Follow me on.
  `;
            data.forEach((record, index) => {
              content += `:point_right:  [${record.name}](${record.link})  `;
            });
            fs.writeFileSync("README.md", content);
          });
        });
      });
    });
  });
});
