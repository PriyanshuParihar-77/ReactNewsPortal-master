
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
    "Blue": "#4696EC    ",
    "Yellowgreen": "#CEDC39",
    "Orange": "#F6C244",
    "Grey": "#6E757C",
};

class ResultsN extends Component {
    state = {
        show: false,
        val: '',
        url: ''
    };
    handleClose = () => {
        this.setState({ show: false })
    }
    handleShow = (user) => {
        this.setState({ show: true, val: user.headline.main, url: user.web_url })
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
                        this.props.newstype.slice(0, 4).map((user) =>
                            user.headline && user.headline.main && user.news_desk && user.pub_date && user.multimedia && user.multimedia[0] &&
                            user.multimedia[0].url &&
                            <div class="card2 col-12 col-xs-12 col-sm-12 col-lg-3 justify-content-around">
                                <h4>{user.headline.main}<MdShare onClick={() => this.handleShow(user)} style={{ cursor: 'pointer' }} /></h4>
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
                                <Link to={`/article/${encodeURIComponent(user.web_url)}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    {user.multimedia[0].url !== "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" ?
                                        <img src={"https://static01.nyt.com/" + user.multimedia[0].url} /> :
                                        <img src={user.multimedia[0].url} />}



                                    <span style={{ float: 'left', marginLeft: '16.875px', marginTop: '10px', marginBottom: '20px', fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif' }}>{user.pub_date.split('T')[0]}
                                    </span>
                                    <span style={{ float: 'right', marginRight: '16.875px', marginTop: '10px', marginBottom: '20px', fontSize: '20px' }}>
                                        {user.news_desk.toLowerCase() === "world" &&
                                            <span style={{ backgroundColor: bgColors.Purple }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "politics" &&
                                            <span style={{ backgroundColor: bgColors.Green }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "business" &&
                                            <span style={{ backgroundColor: bgColors.Blue }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "technology" &&
                                            <span style={{ color: '#000000', backgroundColor: bgColors.Yellowgreen }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "sports" &&
                                            <span style={{ color: '#000000', backgroundColor: bgColors.Orange }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() !== "sports" && user.news_desk.toLowerCase() !== "world" && user.news_desk.toLowerCase() !== "politics" && user.news_desk.toLowerCase() !== "business" &&
                                            user.news_desk.toLowerCase() !== "technology" &&
                                            <span style={{ backgroundColor: bgColors.Grey }} className={'badge badge-secondary'} >{user.news_desk.toUpperCase()}</span>}
                                    </span>
                                </Link>
                            </div>

                        )}
                </div>



                <div className="thirddiv row">
                    {
                        this.props.newstype.slice(4, 8).map((user) =>
                            user.headline && user.headline.main && user.news_desk && user.pub_date && user.multimedia && user.multimedia[0] &&
                            user.multimedia[0].url &&
                            <div class="card2 col-12 col-xs-12 col-sm-12 col-lg-3 justify-content-around">
                                <h4>{user.headline.main}<MdShare onClick={() => this.handleShow(user)} style={{ cursor: 'pointer' }} /></h4>
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
                                <Link to={`/article/${encodeURIComponent(user.web_url)}`} style={{ textDecoration: 'none', color: 'black' }}>

                                    {user.multimedia[0].url !== "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" ?
                                        <img src={"https://static01.nyt.com/" + user.multimedia[0].url} /> :
                                        <img src={user.multimedia[0].url} />}


                                    <span style={{ float: 'left', marginLeft: '16.875px', marginTop: '10px', marginBottom: '20px', fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif' }}>{user.pub_date.split('T')[0]}
                                    </span>
                                    <span style={{ float: 'right', marginRight: '16.875px', marginTop: '10px', marginBottom: '20px', fontSize: '20px' }}>
                                        {user.news_desk.toLowerCase() === "world" &&
                                            <span style={{ backgroundColor: bgColors.Purple }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "politics" &&
                                            <span style={{ backgroundColor: bgColors.Green }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "business" &&
                                            <span style={{ backgroundColor: bgColors.Blue }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "technology" &&
                                            <span style={{ color: '#000000', backgroundColor: bgColors.Yellowgreen }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "sports" &&
                                            <span style={{ color: '#000000', backgroundColor: bgColors.Orange }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() !== "sports" && user.news_desk.toLowerCase() !== "world" && user.news_desk.toLowerCase() !== "politics" && user.news_desk.toLowerCase() !== "business" &&
                                            user.news_desk.toLowerCase() !== "technology" &&
                                            <span style={{ backgroundColor: bgColors.Grey }} className={'badge badge-secondary'} >{user.news_desk.toUpperCase()}</span>}
                                    </span>
                                </Link>
                            </div>

                        )}
                </div>


                <div className="fourthdiv row">
                    {
                        this.props.newstype.slice(8, 10).map((user) =>
                            user.headline && user.headline.main && user.news_desk && user.pub_date && user.multimedia && user.multimedia[0] &&
                            user.multimedia[0].url &&
                            <div class="card2 col-12 col-xs-12 col-sm-12 col-lg-3 justify-content-around">
                                <h4>{user.headline.main}<MdShare onClick={() => this.handleShow(user)} style={{ cursor: 'pointer' }} /></h4>
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
                                <Link to={`/article/${encodeURIComponent(user.web_url)}`} style={{ textDecoration: 'none', color: 'black' }}>

                                    {user.multimedia[0].url !== "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" ?
                                        <img src={"https://static01.nyt.com/" + user.multimedia[0].url} /> :
                                        <img src={user.multimedia[0].url} />}

                                    <span style={{ float: 'left', marginLeft: '16.875px', marginTop: '10px', marginBottom: '20px', fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif' }}>{user.pub_date.split('T')[0]}
                                    </span>
                                    <span style={{ float: 'right', marginRight: '16.875px', marginTop: '10px', marginBottom: '20px', fontSize: '20px' }}>
                                        {user.news_desk.toLowerCase() === "world" &&
                                            <span style={{ backgroundColor: bgColors.Purple }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "politics" &&
                                            <span style={{ backgroundColor: bgColors.Green }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "business" &&
                                            <span style={{ backgroundColor: bgColors.Blue }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "technology" &&
                                            <span style={{ color: '#000000', backgroundColor: bgColors.Yellowgreen }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() === "sports" &&
                                            <span style={{ color: '#000000', backgroundColor: bgColors.Orange }} className={'badge badge-secondary'} > {user.news_desk.toUpperCase()}</span>}
                                        {user.news_desk.toLowerCase() !== "sports" && user.news_desk.toLowerCase() !== "world" && user.news_desk.toLowerCase() !== "politics" && user.news_desk.toLowerCase() !== "business" &&
                                            user.news_desk.toLowerCase() !== "technology" &&
                                            <span style={{ backgroundColor: bgColors.Grey }} className={'badge badge-secondary'} >{user.news_desk.toUpperCase()}</span>}
                                    </span>
                                </Link>
                            </div>

                        )}
                </div>

            </div>
        )
    }
}
export default ResultsN
