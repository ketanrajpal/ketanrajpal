import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addMethodology, Methodology } from '../reducers/methodology'
import sanity from "../services/sanity"

export const MethodologyComponent = () => {
    const state = useAppSelector(Methodology)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (state.length > 0) return
        sanity.fetch(`*[_type == "methodology"]|order(orderRank){
            title,
            description
        }`).then((data) => {
            dispatch(addMethodology(data))
        }).catch(console.error)
    }, [state.length, dispatch])

    return state.length > 0 ? (<ul>
        {state.map((methodology, index) => (<li key={index}>{JSON.stringify(methodology)}</li>))}
    </ul>) : (<h1>Loading...</h1>)
}