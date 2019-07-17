import React, { Component } from 'react';
import styled from 'styled-components'; 
export default class NavBar extends Component { // exporté sans default signifie que c'est une exportation nommée...
    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"> 
                    <a href="" className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">
                        Mon Pokédex
                    </a>
                </nav>
            </div>
        );
    }
}

// line 7 : construction NavBar depuis Bootstrap