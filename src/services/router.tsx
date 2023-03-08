import { RootComponent } from "../components/root";
import { AwardComponent } from "../components/award";
import { EducationComponent } from "../components/education";
import { ExperienceComponent } from "../components/experience";
import { MethodologyComponent } from "../components/methodology";
import { PrincipleComponent } from "../components/principle";
import { ProjectComponent } from "../components/project";
import { ReviewComponent } from "../components/review";
import { TechnologyComponent } from "../components/technology";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootComponent />,
        children: [
            {
                path: "award",
                element: <AwardComponent />

            }, {
                path: "education",
                element: <EducationComponent />
            }, {
                path: "experience",
                element: <ExperienceComponent />
            }, {
                path: "methodology",
                element: <MethodologyComponent />
            }, {
                path: "principle",
                element: <PrincipleComponent />
            }, {
                path: "project",
                element: <ProjectComponent />
            }, {
                path: "review",
                element: <ReviewComponent />
            }, {
                path: "technology",
                element: <TechnologyComponent />
            }]
    }
]);

const RouterComponent = () => {
    return <RouterProvider router={router} />
}

export default RouterComponent;