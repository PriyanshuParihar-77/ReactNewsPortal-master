import React, { Component } from "react";
import Switch from "react-switch";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaRegBookmark } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { matchPath } from 'react-router'
class SwitchExample extends Component {
    //ek baar chalta hain bas..
    userData = {}
    constructor() {
        super();

        if (localStorage["user"]) {
            this.userData = JSON.parse(localStorage.getItem('user'));
            this.state = {
                checked: !this.userData.text1
            }
        }
        else {
            this.state = { checked: null };
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(checked) {
        this.setState({ checked });
        this.props.searchUsers(this.state.checked)
    }

    componentWillReceiveProps(newProps) {
        //ye nytimes true bhej hain parent se..
        if (newProps.text1 == true) {
            this.setState({ checked: false })
        }
        else {
            this.setState({ checked: true })
        }
    }


    render() {
        return (
            <label id="mainlable" htmlFor="material-switch" style={{ float: 'right', marginRight: '10px', marginTop: '7px', display: 'flex' }}>
                <Link id="linkhain" to="/favourite" style={{ paddingTop: '1px', color: 'white', paddingRight: '10px' }}>
                    <IconContext.Provider value={{ size: '20px' }}>
                        <FaRegBookmark size='20' />
                    </IconContext.Provider>
                </Link>
                <div id="labelid" style={{ display: 'flex' }}>
                    <span style={divStyle}>NYTimes</span>
                    <Switch onChange={this.handleChange} checked={this.state.checked}
                        onColor="#2693e6"
                        onHandleColor="#ffffff"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={25}
                        width={48}
                        className="react-switch"
                        id="material-switch" />)
                <span style={divStyle}>Guardian</span>
                </div>
            </label>
        );
    }
}
const divStyle = {
    paddingTop: '0.5rem',
    paddingBottom: '.5rem',
    paddingLeft: '0.5rem',
    paddingRight: '1.0rem',
    fontSize: '1.25rem',
    lineHeight: 'inherit',
    whiteSpace: 'nowrap',
    color: 'white'
};
export default SwitchExample