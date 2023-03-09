import { Outlet, Link } from "react-router-dom"
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addSetting, Setting } from '../reducers/setting'
import sanity from "../services/sanity"

export const RootComponent = () => {
    const state = useAppSelector(Setting)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (state.length > 0) return
        sanity.fetch(`*[_type == "setting"]{
            title,
            "slug":slug.current,
            description,
        }`).then((data) => {
            dispatch(addSetting(data))
        }).catch(console.error)
    }, [state.length, dispatch])


    return <>
        <div className="header-component">
            <div className="heading">Ketan Rajpal.</div>
            <div className="contact"><button>Keep in touch</button></div>
            <div className="navigation"><button>Menu</button></div>
        </div>


        <ul>
            <li><Link to="award">Award</Link></li>
            <li><Link to="education">Education</Link></li>
            <li><Link to="experience">Experience</Link></li>
            <li><Link to="methodology">Methodology</Link></li>
            <li><Link to="principle">Principle</Link></li>
            <li><Link to="project">Project</Link></li>
            <li><Link to="review">Review</Link></li>
            <li><Link to="technology">Technology</Link></li>
        </ul>

        {state.length > 0 ? (<ul>
            {state.map((review, index) => (<li key={index}>{JSON.stringify(review)}</li>))}
        </ul>) : (<h1>Loading...</h1>)}



        <Outlet /></>
}