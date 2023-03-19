import fs from 'fs';

import { award_markdown } from "./components/award";
import { education_markdown } from './components/education';
import { experience_markdown } from './components/experience';
import { project_markdown } from './components/project';
import { review_markdown } from './components/review';
import { setting_markdown } from './components/setting';


(async () => {
    console.log('Generating README.md...');
    const readme_file = fs.createWriteStream('../README.md');

    // write description to readme
    const setting = await setting_markdown();
    readme_file.write(`### :necktie: Ketan Rajpal\n`);
    readme_file.write(setting.description);

    // write sub heading to readme
    readme_file.write(`\n\n*${setting.sub_heading}*\n`);

    // write experience to readme
    const experience = await experience_markdown();
    readme_file.write(`\n\n### :briefcase: Professional Experience.\n`);
    readme_file.write(experience);

    // write education to readme
    const education = await education_markdown();
    readme_file.write(`\n\n### :mortar_board: Education.\n`);
    readme_file.write(education);

    // write projects to readme
    const project = await project_markdown();
    readme_file.write(`\n\n### :computer: Featured Projects.\n`);
    readme_file.write(project);

    // write reviews to readme
    const review = await review_markdown();
    readme_file.write(`\n\n### :star: Reviews.\n`);
    readme_file.write(review);

    // write awards to readme
    const award = await award_markdown();
    readme_file.write(`\n\n### :trophy: Awards.\n`);
    readme_file.write(award);

    readme_file.end();
    console.log('README.md generated successfully.');

})();
