import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addContent, Setting } from '../reducers/setting'
import sanity from "../services/sanity"

export const HomeComponent = () => {
    const state = useAppSelector(Setting)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (state.content.length > 0) return
        sanity.fetch(`*[_type == "setting"]{
            title,
            "slug":slug.current,
            description,
        }`).then((data) => {
            dispatch(addContent(data))
        }).catch(console.error)
    }, [state.content.length, dispatch])

    const HandleSettingContent = (slug: string) => {
        const content = state.content;
        return content.filter((item: { slug: string }) => item.slug === slug)[0].description
    }

    return <div className='HomeComponent'>
        {state.content.length > 0 ? (
            <h1>{HandleSettingContent('title')}</h1>
        ) : (<h1>Loading...</h1>)}
    </div>
}