import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const Navbar = ({icon, title}) =>  {

    return (
        <nav className='navbar bg-primary'>
            <h1>
                <i className={icon}></i> {title}
            </h1>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
            </ul>
        </nav>
    )
}

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
};

Navbar.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
}

export default Navbar
