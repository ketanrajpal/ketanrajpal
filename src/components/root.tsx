import { Outlet, Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { Setting, changeTheme } from '../reducers/setting'

export const RootComponent = () => {
    const state = useAppSelector(Setting)
    const dispatch = useAppDispatch()

    const HandleChangeMode = () => {
        dispatch(changeTheme(state.theme === 'dark' ? 'light' : 'dark'))
    }

    return <div className='HomeComponent'>
        <div className="header-component">
            <div className="heading">Ketan Rajpal.</div>
            <div className="contact"><button>Keep in touch</button></div>
            <div className="navigation"><button>Menu</button></div>
        </div>

        <button onClick={HandleChangeMode}>Dark Mode</button>


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




        <Outlet /></div>
}