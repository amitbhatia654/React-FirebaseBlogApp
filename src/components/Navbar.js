import React from 'react'
import { NavLink } from 'react-router-dom'

import { useFirebase } from "../context/Firebase"

export default function Navbar() {
    const firebase = useFirebase();
    // console.log(firebase.isUserLoggedIn.email, 'form ')
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light fixed-top mynav">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">BlogApp </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                            </li>

                            {firebase.isUserLoggedIn &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={"/createPost"}>Create Post</NavLink >
                                </li>
                            }

                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}


                        {firebase.isUserLoggedIn ? <div>welcome <span className='fs-5 fw-bold'>{firebase.isUserLoggedIn?.email}</span><button className='mx-3 btn btn-primary' onClick={() => firebase.SignOutUser()}>SignOut</button></div> : (<>
                            <NavLink className="nav-link fs-2" to={"/login"}>Login /</NavLink >
                            <NavLink className="nav-link mx-2 fs-2" to={"/register"}>SignUp</NavLink >
                        </>
                        )


                        }



                    </div>
                </div>
            </nav>
            <div className='mycard'></div>
        </div>
    )
}
