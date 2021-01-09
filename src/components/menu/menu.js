import React, { Component } from 'react';
import MenuDatos from './MenuDatos';
import {Navbar, Nav, Container} from 'react-bootstrap';

// Creacion basica de un componente de prueba
class Menu extends Component {
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">UjaPack</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    {MenuDatos.map((item, i) => {
                        return(
                            <Nav.Link href={item.path}>
                                {item.titulo}
                            </Nav.Link>
                        );
                    })}
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>

        );
    }
}

export default Menu;