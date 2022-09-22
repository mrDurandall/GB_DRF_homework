import React from "react";
import {Link} from "react-router-dom";


const HeaderItem = () => {
    return (
        <div className="top">
            <h2>
                Заголовок!
            </h2>
            {/*<a href={'#'}>*/}
            {/*    Link 1*/}
            {/*</a>*/}
            {/*<a href={'#'}>*/}
            {/*    Link 2*/}
            {/*</a>*/}
            <Link to='/users'>Users</Link>
            <Link to='/projects'>Projects</Link>
            <Link to='/todos'>ToDo</Link>
            <hr/>
        </div>
    )
}

export default HeaderItem