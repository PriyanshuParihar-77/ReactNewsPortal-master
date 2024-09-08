import React, { Component } from 'react'
import '../../App.css'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types';
import { decorator, tsThisType } from '@babel/types';
import { IconContext } from "react-icons";
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

class Cards2 extends Component {
    state = {
        show: false
    };
    clicked = false

    handleClose = (event) => {
        this.setState({ show: false })
    }
    handleShow = (event) => {
        this.setState({ show: true })
    }
    handleTarget = (event) => {

        if (event.target.tagName === "SPAN" || event.target.tagName === "SVG" || event.target.tagName === "CIRCLE") {
            console.log(event.target.tagName)
            event.stopPropagation()
            event.preventDefault()
            return;
        }
        else {
            this.props.history.push('/article/' + encodeURIComponent(this.props.user.id))
        }
    }

    render() {
        return (
            <div className="container fluid card" style={{ cursor: 'pointer' }} >
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontWeight: 'bold' }}>{this.props.user.webTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3 align='center'>Share Via</h3>
                        <FacebookShareButton url={this.props.user.webUrl} hashtag="#CSCI_571_NewsApp" className="share" style={{ marginLeft: '70px' }}>
                            <FacebookIcon size={50} round={true} />
                        </FacebookShareButton>

                        <TwitterShareButton url={this.props.user.webUrl} hashtags={["CSCI_571_NewsApp"]} className="share" style={{ marginLeft: '100px' }}>
                            <TwitterIcon size={50} round={true} />
                        </TwitterShareButton>

                        <EmailShareButton url={this.props.user.webUrl} subject="CSCI_571_NewsApp" className="share" style={{ float: 'right', marginRight: '70px' }}>
                            <EmailIcon size={50} round={true} />
                        </EmailShareButton>
                    </Modal.Body>

                </Modal>
                <div className="content row" onClick={this.handleTarget}>

                    <img className="col-xs-12 col-sm-12 col-md-12 col-lg-3" src={this.props.user.blocks.main.elements["0"].assets[[this.props.user.blocks.main.elements["0"].assets.length - 1]].file} />

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-9">
                        <h4>{this.props.user.webTitle}<span onClick={e => e.stopPropagation()}><MdShare onClick={this.handleShow} style={{ cursor: 'pointer' }} /></span></h4>


                        <p>{this.props.user.blocks.body["0"].bodyTextSummary}</p>
                        <span style={{ float: 'left', marginTop: '10px', fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif' }}>{this.props.user.webPublicationDate.split('T')[0]}
                        </span>
                        <span style={{ float: 'right', marginRight: '20px', marginTop: '10px', display: 'inline', fontSize: '20px' }} >
                            {this.props.user.sectionId === "world" &&
                                <span style={{ backgroundColor: bgColors.Purple }} className={'badge badge-secondary'} > {this.props.user.sectionId.toUpperCase()}</span>}
                            {this.props.user.sectionId === "politics" &&
                                <span style={{ backgroundColor: bgColors.Green }} className={'badge badge-secondary'} > {this.props.user.sectionId.toUpperCase()}</span>}
                            {this.props.user.sectionId === "business" &&
                                <span style={{ backgroundColor: bgColors.Blue }} className={'badge badge-secondary'} > {this.props.user.sectionId.toUpperCase()}</span>}
                            {this.props.user.sectionId === "technology" &&
                                <span style={{ color: '#000000', backgroundColor: bgColors.Yellowgreen }} className={'badge badge-secondary'} > {this.props.user.sectionId.toUpperCase()}</span>}
                            {this.props.user.sectionId === "sport" &&
                                <span style={{ color: '#000000', backgroundColor: bgColors.Orange }} className={'badge badge-secondary'} > {this.props.user.sectionId.toUpperCase()}</span>}
                            {this.props.user.sectionId !== "sport" && this.props.user.sectionId !== "world" && this.props.user.sectionId !== "politics" && this.props.user.sectionId !== "business" &&
                                this.props.user.sectionId !== "technology" &&
                                <span style={{ backgroundColor: bgColors.Grey }} className={'badge badge-secondary'} >{this.props.user.sectionId.toUpperCase()}</span>}

                        </span>

                    </div >

                </div >

            </div >

        )
    }
}
export default withRouter(Cards2)
