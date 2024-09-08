
import React, { Component } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types';
import { decorator, tsExpressionWithTypeArguments } from '@babel/types';
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import { Icon, InlineIcon } from '@iconify/react';
import { Modal } from 'react-bootstrap'
import { MdShare } from 'react-icons/md';

var bgColors = {
    "Purple": "#7B4DFE",
    "Green": "#419488",
    "Blue": "#4696EC",
    "Yellowgreen": "#CEDC39",
    "Orange": "#F6C244",
    "Grey": "#6E757C",
};


class ResultsG extends Component {
    state = {
        show: false,
        val: '',
        url: ''
    };
    handleClose = () => {
        this.setState({ show: false })
        //document.querySelector(".")
    }
    handleShow = (user) => {
        this.setState({ show: true, val: user.webTitle, url: user.webUrl })
    }

    componentDidMount() {
        document.getElementById("mainlable").style.marginLeft = "0px";
        document.getElementById("labelid").style.display = "none";
    }

    render() {
        return (

            <div className="container-fluid">
                <h1 style={{ paddingLeft: '20px', marginBottom: '0px', paddingTop: '5px' }}>Results</h1>


                <div className="row seconddiv">
                    {
                        this.props.newstype.slice(0, 4).map((user, index) =>
                            user.id && user.webTitle && user.sectionId && user.webPublicationDate && user.blocks && user.blocks.main &&
                            user.blocks.main.elements["0"] && user.blocks.main.elements &&
                            user.blocks.main.elements["0"] && index < 4 &&

                            <div id={user.id} key={user.id} class="card2 col-12 col-xs-12 col-sm-12 col-lg-3 justify-content-around">

                                <h4 key={user.id}>{user.webTitle}<MdShare key={user.id} onClick={() => this.handleShow(user)} style={{ cursor: 'pointer' }} /></h4>
                                <Modal key={user.id} show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header key={user.id} closeButton>
                                        <Modal.Title key={user.id} style={{ fontWeight: 'bold' }}>{this.state.val}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h3 key={user.id} align='center'>Share Via</h3>
                                        <FacebookShareButton key={user.id} url={this.state.url} hashtag="#CSCI_571_NewsApp" className="share" style={{ marginLeft: '70px' }}>
                                            <FacebookIcon key={user.id} size={50} round={true} />
                                        </FacebookShareButton>

                                        <TwitterShareButton key={user.id} url={this.state.url} hashtags={["CSCI_571_NewsApp"]} className="share" style={{ marginLeft: '100px' }}>
                                            <TwitterIcon key={user.id} size={50} round={true} />
                                        </TwitterShareButton>

                                        <EmailShareButton key={user.id} url={this.state.url} subject="CSCI_571_NewsApp" className="share" style={{ float: 'right', marginRight: '70px' }}>
                                            <EmailIcon key={user.id} size={50} round={true} />
                                        </EmailShareButton>
                                    </Modal.Body>

                                </Modal>

                                <Link to={`/article/${encodeURIComponent(user.id)}`} style={{ textDecoration: 'none', color: 'black' }}>

                                    {user.blocks && user.blocks.main &&
                                        user.blocks.main.elements["0"] && user.blocks.main.elements &&
                                        user.blocks.main.elements["0"].assets[user.blocks.main.elements["0"].assets.length - 1] ?
                                        <img src={user.blocks.main.elements["0"].assets[[user.blocks.main.elements["0"].assets.length - 1]].file} />
                                        : <img src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" />
                                    }
                                    <span style={{ float: 'left', marginLeft: '16.875px', marginTop: '10px', marginBottom: '20px', fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif' }}>{user.webPublicationDate.split('T')[0]}
                                    </span>
                                    <span style={{ float: 'right', marginRight: '16.875px', marginTop: '10px', marginBottom: '20px', fontSize: '20px' }}>
                                        {user.sectionId === "world" &&
                                            <span style={{ backgroundColor: bgColors.Purple }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "politics" &&
                                            <span style={{ backgroundColor: bgColors.Green }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "business" &&
                                            <span style={{ backgroundColor: bgColors.Blue }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "technology" &&
                                            <span style={{ color: '#000000', backgroundColor: bgColors.Yellowgreen }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "sport" &&
                                            <span style={{ color: '#000000', backgroundColor: bgColors.Orange }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId !== "sport" && user.sectionId !== "world" && user.sectionId !== "politics" && user.sectionId !== "business" &&
                                            user.sectionId !== "technology" &&
                                            <span style={{ backgroundColor: bgColors.Grey }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}

                                    </span>
                                </Link>
                            </div>


                        )}

                </div>

                <div class="thirddiv row">
                    {
                        this.props.newstype.slice(4, 8).map((user) =>
                            user.id && user.webTitle && user.sectionId && user.webPublicationDate && user.blocks && user.blocks.main &&
                            user.blocks.main.elements["0"] && user.blocks.main.elements &&
                            user.blocks.main.elements["0"] &&

                            <div id={user.id} key={user.id} class='card2 col-12 col-xs-12 col-sm-12 col-lg-3'>

                                <h4 key={user.id}>{user.webTitle}<MdShare key={user.id} onClick={() => this.handleShow(user)} style={{ cursor: 'pointer' }} /></h4>
                                <Modal key={user.id} show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header key={user.id} closeButton>
                                        <Modal.Title key={user.id} style={{ fontWeight: 'bold' }}>{this.state.val}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h3 key={user.id} align='center'>Share Via</h3>
                                        <FacebookShareButton key={user.id} url={this.state.url} hashtag="#CSCI_571_NewsApp" className="share" style={{ marginLeft: '70px' }}>
                                            <FacebookIcon key={user.id} size={50} round={true} />
                                        </FacebookShareButton>

                                        <TwitterShareButton key={user.id} url={this.state.url} hashtags={["CSCI_571_NewsApp"]} className="share" style={{ marginLeft: '100px' }}>
                                            <TwitterIcon key={user.id} size={50} round={true} />
                                        </TwitterShareButton>

                                        <EmailShareButton key={user.id} url={this.state.url} subject="CSCI_571_NewsApp" className="share" style={{ float: 'right', marginRight: '70px' }}>
                                            <EmailIcon key={user.id} size={50} round={true} />
                                        </EmailShareButton>
                                    </Modal.Body>

                                </Modal>
                                <Link to={`/article/${encodeURIComponent(user.id)}`} style={{ textDecoration: 'none', color: 'black' }}>

                                    {user.blocks && user.blocks.main &&
                                        user.blocks.main.elements["0"] && user.blocks.main.elements &&
                                        user.blocks.main.elements["0"].assets[user.blocks.main.elements["0"].assets.length - 1] ?
                                        <img src={user.blocks.main.elements["0"].assets[[user.blocks.main.elements["0"].assets.length - 1]].file} />
                                        : <img src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" />
                                    }
                                    <span style={{ float: 'left', marginLeft: '16.875px', marginTop: '10px', marginBottom: '20px', fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif' }}>{user.webPublicationDate.split('T')[0]}
                                    </span>
                                    <span style={{ float: 'right', marginRight: '16.875px', marginTop: '10px', marginBottom: '20px', fontSize: '20px' }}>
                                        {user.sectionId === "world" &&
                                            <span style={{ backgroundColor: bgColors.Purple }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "politics" &&
                                            <span style={{ backgroundColor: bgColors.Green }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "business" &&
                                            <span style={{ backgroundColor: bgColors.Blue }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "technology" &&
                                            <span style={{ backgroundColor: bgColors.Yellowgreen }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "sport" &&
                                            <span style={{ backgroundColor: bgColors.Orange }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId !== "sport" && user.sectionId !== "world" && user.sectionId !== "politics" && user.sectionId !== "business" &&
                                            user.sectionId !== "technology" &&
                                            <span style={{ backgroundColor: bgColors.Grey }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}

                                    </span>
                                </Link>

                            </div>

                        )}
                </div>

                <div class="fourthdiv row">
                    {
                        this.props.newstype.slice(8, 10).map((user, index) =>
                            user.id && user.webTitle && user.sectionId && user.webPublicationDate && user.blocks && user.blocks.main &&
                            user.blocks.main.elements["0"] && user.blocks.main.elements &&
                            user.blocks.main.elements["0"] &&

                            <div id={user.id} key={user.id} class='card2 col-12 col-xs-12 col-sm-12 col-lg-3 justify-content-around'>
                                <h4 key={user.id}>{user.webTitle}<MdShare onClick={() => this.handleShow(user)} style={{ cursor: 'pointer' }} /></h4>
                                <Modal key={user.id} show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header key={user.id} closeButton>
                                        <Modal.Title key={user.id} style={{ fontWeight: 'bold' }}>{this.state.val}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h3 key={user.id} align='center'>Share Via</h3>
                                        <FacebookShareButton key={user.id} url={this.state.url} hashtag="#CSCI_571_NewsApp" className="share" style={{ marginLeft: '70px' }}>
                                            <FacebookIcon key={user.id} size={50} round={true} />
                                        </FacebookShareButton>

                                        <TwitterShareButton key={user.id} url={this.state.url} hashtags={["CSCI_571_NewsApp"]} className="share" style={{ marginLeft: '100px' }}>
                                            <TwitterIcon key={user.id} size={50} round={true} />
                                        </TwitterShareButton>

                                        <EmailShareButton key={user.id} url={this.state.url} subject="CSCI_571_NewsApp" className="share" style={{ float: 'right', marginRight: '70px' }}>
                                            <EmailIcon key={user.id} size={50} round={true} />
                                        </EmailShareButton>
                                    </Modal.Body>

                                </Modal>
                                <Link to={`/article/${encodeURIComponent(user.id)}`} style={{ textDecoration: 'none', color: 'black' }}>

                                    {user.blocks && user.blocks.main &&
                                        user.blocks.main.elements["0"] && user.blocks.main.elements &&
                                        user.blocks.main.elements["0"].assets[user.blocks.main.elements["0"].assets.length - 1] ?
                                        <img src={user.blocks.main.elements["0"].assets[[user.blocks.main.elements["0"].assets.length - 1]].file} />
                                        : <img src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" />
                                    }
                                    <span style={{ float: 'left', marginLeft: '16.875px', marginTop: '10px', marginBottom: '20px', fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif' }}>{user.webPublicationDate.split('T')[0]}
                                    </span>
                                    <span style={{ float: 'right', marginRight: '16.875px', marginTop: '10px', marginBottom: '20px', fontSize: '20px' }}>
                                        {user.sectionId === "world" &&
                                            <span style={{ backgroundColor: bgColors.Purple }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "politics" &&
                                            <span style={{ backgroundColor: bgColors.Green }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "business" &&
                                            <span style={{ backgroundColor: bgColors.Blue }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "technology" &&
                                            <span style={{ backgroundColor: bgColors.Yellowgreen }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId === "sport" &&
                                            <span style={{ backgroundColor: bgColors.Orange }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}
                                        {user.sectionId !== "sport" && user.sectionId !== "world" && user.sectionId !== "politics" && user.sectionId !== "business" &&
                                            user.sectionId !== "technology" &&
                                            <span style={{ backgroundColor: bgColors.Grey }} className={'badge badge-secondary'} > {user.sectionId.toUpperCase()}</span>}

                                    </span>
                                </Link>
                            </div>
                        )}
                </div>

            </div >
        )

    }
}
export default ResultsG
