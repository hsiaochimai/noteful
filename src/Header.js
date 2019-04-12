import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import "./App.css"
const Header=()=>{
        return(
            <Link to='/'>
                <header>
                    <h1>Noteful</h1>
                </header>
            </Link>
        )
    }
Header.propTypes={
    name: PropTypes.string
}
export default Header