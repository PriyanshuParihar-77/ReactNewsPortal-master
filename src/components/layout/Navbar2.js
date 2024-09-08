import Select from 'react-select';
import React, { useState, Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button } from 'react-bootstrap';
import SwitchExample2 from './SwitchExample2';
import { Link } from 'react-router-dom'
import { Search, Dropdown } from "semantic-ui-react";
import _ from "lodash";
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { NavLink as RRNavLink } from 'react-router-dom';
import { FaRegBookmark } from 'react-icons/fa';
import '../../App.css'
const Navbar2 = ({ barsearchUsers: barsearchUsers, searchUsers: searchUsers, text1: text1, what: what }) => {
    const [results, setResults] = useState([]);
    const [name, setName] = useState('')

    const handleSearchChange = async (event, value) => {
        try {
            const response = await fetch(

                `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=en-US&q=${value.searchQuery}`,
                {
                    headers: {
                        "Ocp-Apim-Subscription-Key": "5634121ddbb64aa1a99d0d08766e9408"
                    }
                }
            );
            const data = await response.json();
            const resultsRaw = data.suggestionGroups[0].searchSuggestions;
            const results = resultsRaw.map(result => ({ title: result.displayText, url: result.url }));

            setResults(results);
        } catch (error) {
            console.error(`Error fetching search ${value}`);
        }
    };

    const handleSchemaChange = (e, { value }) => {
        setName(value);
        barsearchUsers(value)
    }


    return (
        <Navbar class="container-fluid row" className='navbar bg-primary' expand="lg">
            <Dropdown id="dp"
                style={{ width: '250px' }}
                onSearchChange={_.debounce(handleSearchChange, 1000, {
                    leading: true
                })}
                placeholder="Select data schema"
                fluid
                selection
                options={results.map(ds => {
                    return {
                        key: ds.title,
                        text: ds.title,
                        value: ds.title
                    }
                })}
                value={name}
                placeholder='Enter Keyword...' fluid search selection
                onChange={handleSchemaChange}
            />

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link exact={true}><Link to="/" onClick={() => {
                        what()
                        setName('')
                    }}>Home</Link></Nav.Link>
                    <Nav.Link activeClassName="active" tag={RRNavLink}><Link to="/world">World</Link></Nav.Link>

                    <Nav.Link activeClassName="active" tag={RRNavLink}><Link to="/politics">Politics</Link></Nav.Link>

                    <Nav.Link activeClassName="active" tag={RRNavLink}><Link to="/business">Business</Link></Nav.Link>

                    <Nav.Link activeClassName="active" tag={RRNavLink}><Link to="/technology">Technology</Link></Nav.Link>

                    <Nav.Link activeClassName="active" tag={RRNavLink}><Link to="/sports">Sports</Link></Nav.Link>

                </Nav>
                <Form inline>
                    <SwitchExample2 searchUsers={searchUsers} text1={text1} />
                </Form>

            </Navbar.Collapse>

        </Navbar >
    )
}
export default Navbar2