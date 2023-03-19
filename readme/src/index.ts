import fs from 'fs';

import { award_markdown } from "./components/award";
import { education_markdown } from './components/education';
import { experience_markdown } from './components/experience';
import { project_markdown } from './components/project';
import { review_markdown } from './components/review';
import { setting_markdown } from './components/setting';
import { technology_markdown } from './components/technology';


(async () => {
    console.log('Generating README.md...');

    let markdown = '';

    // write description to readme
    const setting = await setting_markdown();
    markdown += `### :necktie:  Ketan Rajpal\n`;
    markdown += setting.description;

    // write sub heading to readme
    markdown += `\n\n*${setting.sub_heading}*\n`;

    // write technologies to readme
    markdown += `\n\n### :toolbox:  Technologies.\n`;
    markdown += await technology_markdown();

    // write experience to readme
    markdown += `\n\n### :briefcase:  Professional Experience.\n`;
    markdown += await experience_markdown();

    // write education to readme
    markdown += `\n\n### :mortar_board:  Education.\n`;
    markdown += await education_markdown();

    // write projects to readme
    markdown += `\n\n### :computer:  Featured Projects.\n`;
    markdown += await project_markdown();

    // write reviews to readme
    markdown += `\n\n### :star:  Reviews.\n`;
    markdown += await review_markdown();

    // write awards to readme
    markdown += `\n\n### :trophy:  Awards.\n`;
    markdown += await award_markdown();

    const readme_file = fs.createWriteStream('../README.md');
    readme_file.write(markdown);
    readme_file.end();

    console.log('README.md generated successfully.');
})();
