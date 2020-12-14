import React, { Component } from "react";
import '../sidebar/sideNav.css';
import logo from '../../img/translogo.png';

export default class Sidebar extends Component {
    render() {
        return (
            <div>
            <div className="sidenav">
                <div className="navbar-brand">
                   <a href="/"> <img src={logo}></img></a>
                </div>
            <div className="container-fluid nav-menu ">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/encrypt">Encrypt</a>
                    </li>
            </ul>
            <div className="foot">
            <label></label>
        </div>
            </div>
            </div>
            </div>
        )
    }
}









