import React, { useEffect, useState } from 'react'
import { useFirebase } from "../context/Firebase"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export default function PostsCard({ id, data, refreshFunc }) {
    const firebase = useFirebase();
    const navigate = useNavigate()
    const [imgUrl, setImgUrl] = useState(null)

    const { register, handleSubmit, setValue } = useForm();




    useEffect(() => {
        firebase.getImageUrl(data.imageUrl).then((url) => setImgUrl(url))
    }, [])

    const handleDelete = async (id) => {
        const res = await firebase.deletePost(id)
        if (res == "post Deleted Successfully")
            refreshFunc()
    }

    return (
        <div>

            <div className="container my-3" >
                <div className='row'>
                    <div className='col-md-4 border'>

                        <h5 className='text-danger'> {data.userEmail}</h5>

                        <img src={imgUrl} className="card-img-top" alt="Post Images" />
                        <h5 className="card-title">Title : {data.title}</h5>
                        <div className="card-body">
                            <p className="card-text">Description : {data.description}</p>
                        </div>

                        {firebase.isUserLoggedIn?.uid === data.userId &&
                            <button className='btn btn-danger mx-1' onClick={() => handleDelete(id)}>Delete</button>}

                        {firebase.isUserLoggedIn?.uid === data.userId &&
                            <button className='btn btn-danger' onClick={() => navigate(`editPost/${id}`)} >Edit</button>}
                    </div>
                </div>
            </div >

        </div>
    )
}
