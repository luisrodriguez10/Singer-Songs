import React from "react";
import { Link } from 'react-router-dom';

const Nav = (props) =>{
    const pathname = props.location.pathname
    return (
        <nav>
            <Link to='/' className={pathname === '/' ? 'selected' : ''}><h2>Singer - Songs Dictionary</h2></Link>
            <Link to='/singers' className={pathname === '/singers' ? 'selected' : ''}>Singer</Link>
            <Link to='/genres' className={pathname === '/genres' ? 'selected' : ''}>Genres</Link>
            <Link to='/songs' className={pathname === '/songs' ? 'selected' : ''}>Songs</Link>
        </nav>
    )
}

export default Nav;