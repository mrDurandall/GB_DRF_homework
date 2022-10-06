import React from "react";
import {Link} from "react-router-dom";


const HeaderItem = () => {
    return (
        <div className="top">
            <h2>
                Заголовок!
            </h2>

            <Link to='/users'>Users</Link>
            <Link to='/projects'>Projects</Link>
            <Link to='/todos'>ToDo</Link>
            <Link to='/login'>Login</Link>
            <hr/>
        </div>
    )
}

export default HeaderItem