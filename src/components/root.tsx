import { Outlet, Link } from "react-router-dom"

import { HeaderComponent } from "./header"

export const RootComponent = () => {
    return <>
        <HeaderComponent />
        {/*
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="award">Award</Link></li>
            <li><Link to="education">Education</Link></li>
            <li><Link to="experience">Experience</Link></li>
            <li><Link to="methodology">Methodology</Link></li>
            <li><Link to="principle">Principle</Link></li>
            <li><Link to="project">Project</Link></li>
            <li><Link to="review">Review</Link></li>
            <li><Link to="technology">Technology</Link></li>
        </ul>
*/}
        <Outlet />
    </>
}