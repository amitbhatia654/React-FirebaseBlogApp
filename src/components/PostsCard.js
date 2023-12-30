import React, { useEffect, useState } from 'react'
import { useFirebase } from "../context/Firebase"

export default function PostsCard({ id, data, refreshFunc }) {
    const firebase = useFirebase();
    const [imgUrl, setImgUrl] = useState(null)

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [postId, setpostId] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        firebase.getImageUrl(data.imageUrl).then((url) => setImgUrl(url))
    }, [])

    const handleDelete = async (id) => {
        const res = await firebase.deletePost(id)
        if (res == "post Deleted Successfully")
            refreshFunc()
    }


    const handleUpdate = async (e) => {
        e.preventDefault()


        console.log(title, "the tile is")

        setLoading(true)
        const result = await firebase.UpdatePost(postId, title, image, description)
        setLoading(false)
        alert("post Updated Succesfully")
        refreshFunc()

    }
    return (
        <div>
            <div className="container my-3" >
                <div className='row'>
                    <div className='col-md-4 border'>

                        <h5> UserEmail :{data.userEmail}</h5>

                        <img src={imgUrl} className="card-img-top" alt="..." />
                        <h5 className="card-title">Title : {data.title}</h5>
                        <div className="card-body">
                            <p className="card-text">Description : {data.description}</p>
                        </div>


                        {firebase.isUserLoggedIn?.uid === data.userId &&
                            <button className='btn btn-danger mx-1' onClick={() => handleDelete(id)}>Delete</button>}

                        {firebase.isUserLoggedIn?.uid === data.userId &&
                            <button className='btn btn-danger' onClick={() => (setTitle(data.title), setDescription(data.description), setpostId(id))} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>}


                    </div>
                </div>
            </div >



            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">



                            <div className='container'>
                                <div className='row'>

                                    <div className='col-md-12 border'>
                                        <form onSubmit={handleUpdate}>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputName" className="form-label">title </label>
                                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" required onChange={(e) => setTitle(e.target.value)} value={title} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Cover Pic</label>
                                                <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange={(e) => setImage(e.target.files[0])} />
                                            </div>


                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                                <input type="text" className="form-control" id="exampleInputPassword1" required value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>

                                            {loading && "Updating Post Please Wait ..."}
                                            <br></br>

                                            <button type="submit" className="btn btn-primary" disabled={loading}  >Update Post </button>

                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                        </form>

                                    </div>
                                </div>
                            </div>



                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>




        </div>
    )
}
