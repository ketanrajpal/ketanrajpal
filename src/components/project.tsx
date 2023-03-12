import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addProject, Project } from '../reducers/project'
import sanity from "../services/sanity"

export const ProjectComponent = () => {
    const state = useAppSelector(Project)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (state.length > 0) return
        sanity.fetch(`*[_type == "project"]|order(orderRank){
            title,
            "slug":slug.current,
            description,
            url,
            "tags":tags[]->name,
            "technologies":technologies[]->name,
        }`).then((data) => {
            dispatch(addProject(data))
        }).catch(console.error)
    }, [state.length, dispatch])

    return state.length > 0 ? (<ul>
        {state.map((project, index) => (<li key={index}>{JSON.stringify(project)}</li>))}
    </ul>) : (<h1>Loading...</h1>)
}