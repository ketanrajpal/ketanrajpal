import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addPrinciple, Principle } from '../states/principle'
import sanity from "../services/sanity"

export const PrincipleComponent = () => {
    const state = useAppSelector(Principle)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (state.length > 0) return
        sanity.fetch(`*[_type == "principle"]|order(orderRank){
            title,
            description
        }`).then((data) => {
            dispatch(addPrinciple(data))
        }).catch(console.error)
    }, [state.length, dispatch])

    return state.length > 0 ? (<ul>
        {state.map((principle, index) => (<li key={index}>{JSON.stringify(principle)}</li>))}
    </ul>) : (<h1>Loading...</h1>)
}