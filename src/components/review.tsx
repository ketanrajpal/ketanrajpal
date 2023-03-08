import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addReview, Review } from '../states/review'
import sanity from "../services/sanity"

export const ReviewComponent = () => {
    const state = useAppSelector(Review)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (state.length > 0) return
        sanity.fetch(`*[_type == "review"]|order(orderRank){
            name,
            designation,
            organisation,
            description,
            "image": image.asset->url
        }`).then((data) => {
            dispatch(addReview(data))
        }).catch(console.error)
    }, [state.length, dispatch])

    return state.length > 0 ? (<ul>
        {state.map((review, index) => (<li key={index}>{JSON.stringify(review)}</li>))}
    </ul>) : (<h1>Loading...</h1>)
}