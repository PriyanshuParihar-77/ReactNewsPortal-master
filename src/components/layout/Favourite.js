import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { PropTypes } from 'prop-types';
import '../../App.css';
import { FaTrash } from 'react-icons/fa';
import { MdShare } from 'react-icons/md';
import Navbar1 from './Navbar';
import ResultsG from './ResultsG'
import ResultsN from './ResultsN'
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import World from './World'
import Politics from './Politics'
import Business from './Business'
import Technology from './Technology'
import Sports from './Sports'
import App from '../../App.js'
import { matchPath } from 'react-router'
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import { Icon, InlineIcon } from '@iconify/react';
import { Modal } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import Transition from 'react-transition-group/Transition';
import { ToastContainer, toast, cssTransition } from 'react-toastify';

var bgColors = {
    "Purple": "#7B4DFE",
    "Green": "#419488",
    "Blue": "#4696EC",
    "Yellowgreen": "#CEDC39",
    "Orange": "#F6C244",
    "Grey": "#6E757C",
    "Guardian": "#14284A",
    "Nytimes": "#BDBDBD"
};

class Favourite extends Component {
    userData = {};

    articleDatafav = []
    isMovieWatchPathActive = false
    constructor() {
        super()
        /*
        this.isMovieWatchPathActive = !!matchPath(
            props.location.pathname,
            '/favourite')
*/
        if (localStorage["articlefav"]) {
            this.articleDatafav = JSON.parse(localStorage.getItem('articlefav'));
            this.state = {
                data: this.articleDatafav,
                show: false,
                val: '',
                url: ''
            }
        }
        else {
            if (this.props) {
                this.state = {
                    data: this.props.data,
                    show: false,
                    val: '',
                    url: ''
                }
            }
            else {
                this.state = {
                    data: [],
                    show: false,
                    val: '',
                    url: ''
                }
            }
        }
    }

    handleClose = () => {
        this.setState({ show: false })
        //document.querySelector(".")
    }
    handleShow = (user) => {
        this.setState({ show: true, val: user.title, url: user.url })
    }

    componentDidMount() {
        document.getElementById("mainlable").style.marginLeft = "0px";
        document.getElementById("labelid").style.display = "none";
        /*
        if (this.isMovieWatchPathActive) {
            document.getElementById("linkhain").childNodes[0].replaceWith()
            setAttribute("style", "fill: white");
            //document.getElementById("linkhain").childNodes[0].style.fill = 'red';
        }*/
    }

    ZoomInAndOut = ({ children, position, ...props }) => (
        <Transition
            {...props}
            onEnter={node => node.classList.add('zoomIn', 'animate')}
            onExit={node => {
                node.classList.remove('zoomIn', 'animate');
                node.classList.add('zoomOut', 'animate');
            }}
        >
            {children}
        </Transition>
    );

    Remove = (val) => {
        console.log(val.title)
        toast(`Removing ${val.title})`, {
            transition: this.ZoomInAndOut,
            autoClose: 1500,
            className: css({ color: 'black' })
        })

        const index = this.articleDatafav.indexOf(val)
        this.articleDatafav.splice(index, 1)
        localStorage.setItem("articlefav", JSON.stringify(this.articleDatafav))
        this.props.dealwithremoval(val.id)
    }


    render() {
        return (
            this.state.data.length > 0 ?
                (
                    <div className="container-fluid">
                        <ToastContainer align="center" hideProgressBar="true" position={toast.POSITION.TOP_CENTER} />
                        <h1 style={{ paddingLeft: '20px', marginBottom: '0px', paddingTop: '5px' }}>Favourites</h1>
                        <div class="row seconddiv">
                            {
                                this.state.data && this.state.data.slice(0, 4).map(item =>
                                    <div className='card2 col-12 col-xs-12 col-sm-12 col-lg-3 justify-content-around'>
                                        <h4>{item.title}&nbsp;<FaTrash onClick={() => { this.Remove(item) }} style={{ cursor: 'pointer' }} /><MdShare onClick={() => this.handleShow(item)} style={{ cursor: 'pointer' }} /></h4>
                                        <Modal show={this.state.show} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title style={{ fontWeight: 'bold' }}>{this.state.val}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h3 align='center'>Share Via</h3>
                                                <FacebookShareButton url={this.state.url} hashtag="#CSCI_571_NewsApp" className="share" style={{ marginLeft: '70px' }}>
                                                    <FacebookIcon size={50} round={true} />
                                                </FacebookShareButton>

                                                <TwitterShareButton url={this.state.url} hashtags={["CSCI_571_NewsApp"]} className="share" style={{ marginLeft: '100px' }}>
                                                    <TwitterIcon size={50} round={true} />
                                                </TwitterShareButton>

                                                <EmailShareButton url={this.state.url} subject="CSCI_571_NewsApp" className="share" style={{ float: 'right', marginRight: '70px' }}>
                                                    <EmailIcon size={50} round={true} />
                                                </EmailShareButton>
                                            </Modal.Body>

                                        </Modal>

                                        <Link to={`/article/${encodeURIComponent(item.id)}`} style={{ textDecoration: 'none', color: 'black' }}>

                                            <img src={item.image} />

                                            <span style={{ float: 'left', marginLeft: '16.875px', marginTop: '10px', marginBottom: '20px', fontSize: '16px', fontStyle: 'italic', fontFamily: 'Arial, Helvetica, sans-serif' }}>{item.date}
                                            </span>


                                            <span style={{ float: 'right', paddingTop: '10px', paddingRight: '16.875px', fontSize: '20px' }}>
                                                {(item.sectionId === "world" || item.sectionId === "World") &&
                                                    <span style={{ backgroundColor: bgColors.Purple }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "politics" || item.sectionId === "Politics") &&
                                                    <span style={{ backgroundColor: bgColors.Green }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "business" || item.sectionId === "Business") &&
                                                    <span style={{ backgroundColor: bgColors.Blue }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "technology" || item.sectionId === "Technology") &&
                                                    <span style={{ color: '#000000', backgroundColor: bgColors.Yellowgreen }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "sport" || item.sectionId === "Sport" || item.sectionId === "sports" || item.sectionId === "Sports") &&
                                                    <span style={{ color: '#000000', backgroundColor: bgColors.Orange }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {item.sectionId !== "sports" && item.sectionId !== "Sports" && item.sectionId !== "sport" &&
                                                    item.sectionId !== "Sport" && item.sectionId !== "world" && item.sectionId !== "World" && item.sectionId !== "politics"
                                                    && item.sectionId !== "Politics" && item.sectionId !== "business" && item.sectionId !== "Business" &&
                                                    item.sectionId !== "technology" && item.sectionId !== "Technology" &&
                                                    <span style={{ backgroundColor: bgColors.Grey }} className={'badge badge-secondary'} >{item.sectionId.toUpperCase()}</span>}

                                                {item.type === 'Guardian' &&
                                                    <span style={{ backgroundColor: bgColors.Guardian, marginLeft: '5px' }} className={'badge badge-secondary'} >{item.type.toUpperCase()}</span>}
                                                {item.type === 'Nytimes' &&
                                                    <span style={{ color: '#000000', backgroundColor: bgColors.Nytimes, marginLeft: '5px' }} className={'badge badge-secondary'} >{item.type.toUpperCase()}</span>}



                                            </span>
                                        </Link>
                                    </div>
                                )

                            }
                        </div>



                        <div class="thirddiv row">
                            {
                                this.state.data && this.state.data.slice(4, 8).map(item =>
                                    <div className='card2 col-12 col-xs-12 col-sm-12 col-lg-3 justify-content-around'>
                                        <h4>{item.title}&nbsp;<FaTrash onClick={() => { this.Remove(item) }} style={{ cursor: 'pointer' }} /><MdShare onClick={() => this.handleShow(item)} style={{ cursor: 'pointer' }} /></h4>
                                        <Modal show={this.state.show} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title style={{ fontWeight: 'bold' }}>{this.state.val}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h3 align='center'>Share Via</h3>
                                                <FacebookShareButton url={this.state.url} hashtag="#CSCI_571_NewsApp" className="share" style={{ marginLeft: '70px' }}>
                                                    <FacebookIcon size={50} round={true} />
                                                </FacebookShareButton>

                                                <TwitterShareButton url={this.state.url} hashtags={["CSCI_571_NewsApp"]} className="share" style={{ marginLeft: '100px' }}>
                                                    <TwitterIcon size={50} round={true} />
                                                </TwitterShareButton>

                                                <EmailShareButton url={this.state.url} subject="CSCI_571_NewsApp" className="share" style={{ float: 'right', marginRight: '70px' }}>
                                                    <EmailIcon size={50} round={true} />
                                                </EmailShareButton>
                                            </Modal.Body>

                                        </Modal>

                                        <Link to={`/article/${encodeURIComponent(item.id)}`} style={{ textDecoration: 'none', color: 'black' }}>

                                            <img src={item.image} />

                                            <span style={{ float: 'left', marginLeft: '16.875px', marginTop: '10px', marginBottom: '20px', fontSize: '16px', fontStyle: 'italic', fontFamily: 'Arial, Helvetica, sans-serif' }}>{item.date}
                                            </span>


                                            <span style={{ float: 'right', paddingTop: '10px', paddingRight: '16.875px', fontSize: '20px' }}>
                                                {(item.sectionId === "world" || item.sectionId === "World") &&
                                                    <span style={{ backgroundColor: bgColors.Purple }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "politics" || item.sectionId === "Politics") &&
                                                    <span style={{ backgroundColor: bgColors.Green }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "business" || item.sectionId === "Business") &&
                                                    <span style={{ backgroundColor: bgColors.Blue }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "technology" || item.sectionId === "Technology") &&
                                                    <span style={{ color: '#000000', backgroundColor: bgColors.Yellowgreen }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "sport" || item.sectionId === "Sport" || item.sectionId === "sports" || item.sectionId === "Sports") &&
                                                    <span style={{ color: '#000000', backgroundColor: bgColors.Orange }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {item.sectionId !== "sports" && item.sectionId !== "Sports" && item.sectionId !== "sport" &&
                                                    item.sectionId !== "Sport" && item.sectionId !== "world" && item.sectionId !== "World" && item.sectionId !== "politics"
                                                    && item.sectionId !== "Politics" && item.sectionId !== "business" && item.sectionId !== "Business" &&
                                                    item.sectionId !== "technology" && item.sectionId !== "Technology" &&
                                                    <span style={{ backgroundColor: bgColors.Grey }} className={'badge badge-secondary'} >{item.sectionId.toUpperCase()}</span>}

                                                {item.type === 'Guardian' &&
                                                    <span style={{ backgroundColor: bgColors.Guardian, marginLeft: '5px' }} className={'badge badge-secondary'} >{item.type.toUpperCase()}</span>}
                                                {item.type === 'Nytimes' &&
                                                    <span style={{ color: '#000000', backgroundColor: bgColors.Nytimes, marginLeft: '5px' }} className={'badge badge-secondary'} >{item.type.toUpperCase()}</span>}


                                            </span>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>

                        <div class="fourthdiv row">
                            {
                                this.state.data && this.state.data.slice(8, 12).map(item =>
                                    <div className='card2 col-12 col-xs-12 col-sm-12 col-lg-3 justify-content-around'>
                                        <h4>{item.title}&nbsp;<FaTrash onClick={() => { this.Remove(item) }} style={{ cursor: 'pointer' }} /><MdShare onClick={() => this.handleShow(item)} style={{ cursor: 'pointer' }} /></h4>
                                        <Modal show={this.state.show} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title style={{ fontWeight: 'bold' }}>{this.state.val}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h3 align='center'>Share Via</h3>
                                                <FacebookShareButton url={this.state.url} hashtags="#CSCI_571_NewsApp" className="share" style={{ marginLeft: '70px' }}>
                                                    <FacebookIcon size={50} round={true} />
                                                </FacebookShareButton>

                                                <TwitterShareButton url={this.state.url} hashtags={["CSCI_571_NewsApp"]} className="share" style={{ marginLeft: '100px' }}>
                                                    <TwitterIcon size={50} round={true} />
                                                </TwitterShareButton>

                                                <EmailShareButton url={this.state.url} subject="CSCI_571_NewsApp" className="share" style={{ float: 'right', marginRight: '70px' }}>
                                                    <EmailIcon size={50} round={true} />
                                                </EmailShareButton>
                                            </Modal.Body>

                                        </Modal>

                                        <Link to={`/article/${encodeURIComponent(item.id)}`} style={{ textDecoration: 'none', color: 'black' }}>

                                            <img src={item.image} />

                                            <span style={{ float: 'left', marginLeft: '16.875px', marginTop: '10px', marginBottom: '20px', fontSize: '16px', fontStyle: 'italic', fontFamily: 'Arial, Helvetica, sans-serif' }}>{item.date}
                                            </span>


                                            <span style={{ float: 'right', paddingTop: '10px', paddingRight: '16.875px', fontSize: '20px' }}>
                                                {(item.sectionId === "world" || item.sectionId === "World") &&
                                                    <span style={{ backgroundColor: bgColors.Purple }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "politics" || item.sectionId === "Politics") &&
                                                    <span style={{ backgroundColor: bgColors.Green }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "business" || item.sectionId === "Business") &&
                                                    <span style={{ backgroundColor: bgColors.Blue }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "technology" || item.sectionId === "Technology") &&
                                                    <span style={{ color: '#000000', backgroundColor: bgColors.Yellowgreen }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {(item.sectionId === "sport" || item.sectionId === "Sport" || item.sectionId === "sports" || item.sectionId === "Sports") &&
                                                    <span style={{ color: '#000000', backgroundColor: bgColors.Orange }} className={'badge badge-secondary'} > {item.sectionId.toUpperCase()}</span>}
                                                {item.sectionId !== "sports" && item.sectionId !== "Sports" && item.sectionId !== "sport" &&
                                                    item.sectionId !== "Sport" && item.sectionId !== "world" && item.sectionId !== "World" && item.sectionId !== "politics"
                                                    && item.sectionId !== "Politics" && item.sectionId !== "business" && item.sectionId !== "Business" &&
                                                    item.sectionId !== "technology" && item.sectionId !== "Technology" &&
                                                    <span style={{ backgroundColor: bgColors.Grey }} className={'badge badge-secondary'} >{item.sectionId.toUpperCase()}</span>}

                                                {item.type === 'Guardian' &&
                                                    <span style={{ backgroundColor: bgColors.Guardian, marginLeft: '5px' }} className={'badge badge-secondary'} >{item.type.toUpperCase()}</span>}
                                                {item.type === 'Nytimes' &&
                                                    <span style={{ color: '#000000', backgroundColor: bgColors.Nytimes, marginLeft: '5px' }} className={'badge badge-secondary'} >{item.type.toUpperCase()}</span>}

                                            </span>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
                : (
                    <div className="container-fluid row">
                        <ToastContainer align="center" hideProgressBar="true" position={toast.POSITION.TOP_CENTER} />
                        <h3 align="center" className="col-xs-12 col-sm-12 col-lg-12" style={{ paddingTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>
                            You have no saved articles
    </h3>
                    </div>)


        )
    }
}
export default Favourite;


