import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addTechnology, Technology } from '../reducers/technology'
import sanity from "../services/sanity"

export const TechnologyComponent = () => {
    const state = useAppSelector(Technology)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (state.length > 0) return
        sanity.fetch(`*[_type == "technology-type"]|order(orderRank){
            name,
            "technologies": *[_type=='technology' && references(^._id)].name
        }`).then((data) => {
            dispatch(addTechnology(data))
        }).catch(console.error)
    }, [state.length, dispatch])

    return state.length > 0 ? (<ul>
        {state.map((technology, index) => (<li key={index}>{JSON.stringify(technology)}</li>))}
    </ul>) : (<h1>Loading...</h1>)
}