import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addAward, Award } from '../states/award'
import sanity from "../services/sanity"

export const AwardComponent = () => {
    const state = useAppSelector(Award)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (state.length > 0) return
        sanity.fetch(`*[_type == "award"]|order(date desc) {
            name,
            "institution": institution->name,
            "event": event->name,
            rank,
            date
        }`).then((data) => {
            dispatch(addAward(data))
        }).catch(console.error)
    }, [state.length, dispatch])

    return state.length > 0 ? (<ul>
        {state.map((award, index) => (<li key={index}>{JSON.stringify(award)}</li>))}
    </ul>) : (<h1>Loading...</h1>)
}