import fs from 'fs';

import { award_markdown } from "./components/award";
import { education_markdown } from './components/education';
import { experience_markdown } from './components/experience';
import { project_markdown } from './components/project';
import { review_markdown } from './components/review';


(async () => {
    console.log('Generating README.md...');

    const award = await award_markdown();
    const education = await education_markdown();
    const experience = await experience_markdown();
    const project = await project_markdown();
    const review = await review_markdown();

    const readme_file = fs.createWriteStream('../README.md');

    // write experience to readme
    readme_file.write(`\n\n### :briefcase: Experience.\n`);
    readme_file.write(experience);

    // write education to readme
    readme_file.write(`\n\n### :mortar_board: Education.\n`);
    readme_file.write(education);

    // write projects to readme
    readme_file.write(`\n\n### :computer: Featured Projects.\n`);
    readme_file.write(project);

    // write reviews to readme
    readme_file.write(`\n\n### :star: Reviews.\n`);
    readme_file.write(review);

    // write awards to readme
    readme_file.write(`\n\n### :trophy: Awards.\n`);
    readme_file.write(award);

    readme_file.end();
    console.log('README.md generated successfully.');

})();
