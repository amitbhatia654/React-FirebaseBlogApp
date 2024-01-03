import React, { useEffect, useState } from 'react'
import { useFirebase } from "../context/Firebase"
import PostsCard from './PostsCard';

export default function Home() {

    const firebase = useFirebase();
    const [allPosts, setAllPosts] = useState([])


    const refreshFunc = () => {
        firebase.getAllPosts().then((data) =>
            setAllPosts(data.docs))
    }

    useEffect(() => {
        firebase.getAllPosts().then((data) =>
            setAllPosts(data.docs))
    })

    return (
        <div className='container-fluid my-5'>
            <div className='row'>
                {allPosts.map((e) => {
                    return (
                        <div className='col-md-4 my-2  '>
                            <PostsCard
                                key={e.id}
                                id={e.id}
                                data={e.data()}
                                refreshFunc={refreshFunc} />
                        </div>)
                })}
            </div>
        </div >
    )
}
