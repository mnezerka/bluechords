import React from 'react';
import {Navbar} from 'react-bootstrap';

export default class BasicNav extends React.Component{
    render() {
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>BlueChords</Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        )
    }
}


