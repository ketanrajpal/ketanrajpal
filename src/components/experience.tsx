import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addExperience, Experience } from '../states/experience'
import sanity from "../services/sanity"

export const ExperienceComponent = () => {
    const state = useAppSelector(Experience)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (state.length > 0) return
        sanity.fetch(`*[_type == "experience"]|order(present desc, endDate desc) {
            company,
            companyUrl,
            title,
            location,
            startDate,
            endDate,
            present,
            description
        }`).then((data) => {
            dispatch(addExperience(data))
        }).catch(console.error)
    }, [state.length, dispatch])

    return state.length > 0 ? (<ul>
        {state.map((experience, index) => (<li key={index}>{JSON.stringify(experience)}</li>))}
    </ul>) : (<h1>Loading...</h1>)
}