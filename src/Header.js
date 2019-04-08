import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import "./App.css"
class Header extends Component{
    render(){
        return(
            <Link to='/'>
                <header>
                    <h1>Noteful</h1>
                </header>
            </Link>
        )
    }
}
export default Header