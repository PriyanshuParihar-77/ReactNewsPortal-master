import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { PropTypes } from 'prop-types';
import '../../App.css';
import Favourite from './Favourite';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import { Icon, InlineIcon } from '@iconify/react';
import mdShare from '@iconify/icons-ion/md-share';
import commentBox from 'commentbox.io';
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip'
import { css } from 'glamor';
import Transition from 'react-transition-group/Transition';


class Articlen extends Component {
    constructor() {
        super()
        this.state = {
            iscolorred: false
        }
    }
    componentDidMount() {
        this.props.setstateforNy(decodeURIComponent(this.props.match.params.articleval))
        document.getElementById("mainlable").style.marginLeft = "0px";
        document.getElementById("labelid").style.display = "none";
    }
    componentDidUpdate(previousProps, prevState) {
        if (previousProps.articledata != this.props.articledata) {
            var data
            if (this.props && this.props.articledata && this.props.articledata.response && this.props.articledata.response.docs[0] && this.props.articledata.response.docs[0].web_url) {
                data = this.props.articledata.response.docs[0].web_url

            }

            this.removeCommentBox = commentBox('5739474327699456-proj', {
                className: 'commentbox',
                defaultBoxId: data
            })
            if (localStorage["articlefav"]) {
                var articleDatafav = JSON.parse(localStorage.getItem('articlefav'))
                if (this.props && this.props.articledata && this.props.articledata.response && this.props.articledata.response.docs[0] && this.props.articledata.response.docs[0].web_url) {
                    for (var i = 0; i < articleDatafav.length; i++) {
                        if (articleDatafav[i].id === this.props.articledata.response.docs[0].web_url) {
                            this.setState((prevState, props) => {
                                return { iscolorred: true };
                            })
                        }
                    }
                }
            }
        }
    }


    componentWillUnmount() {

        this.removeCommentBox();
    }

    addArticle = () => {
        toast(`Saving ${this.props.articledata.response.docs[0].headline.main})`, {
            transition: this.ZoomInAndOut,
            autoClose: 1500,
            className: css({ color: 'black' })
        })
        if (this.props.articledata.response && this.props.articledata.response.docs[0] &&
            this.props.articledata.response.docs[0] && this.props.articledata.response.docs[0].multimedia
            && this.props.articledata.response.docs[0].multimedia[0] &&
            this.props.articledata.response.docs[0].multimedia[0].url) {
            this.props.dealwithfav(
                {
                    title: this.props.articledata.response.docs[0].headline.main,
                    id: this.props.articledata.response.docs[0].web_url,
                    type: 'Nytimes',
                    sectionId: this.props.articledata.response.docs[0].news_desk,
                    date: this.props.articledata.response.docs[0].pub_date.split('T')[0],
                    image: "https://static01.nyt.com/" + this.props.articledata.response.docs[0].multimedia[0].url,
                    url: this.props.articledata.response.docs[0].web_url
                })
        }
        else {
            this.props.dealwithfav(
                {
                    title: this.props.articledata.response.docs[0].headline.main,
                    id: this.props.articledata.response.docs[0].web_url,
                    type: 'Nytimes',
                    sectionId: this.props.articledata.response.docs[0].news_desk,
                    date: this.props.articledata.response.docs[0].pub_date.split('T')[0],
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg",
                    url: this.props.articledata.response.docs[0].web_url
                })
        }

        this.setState({ iscolorred: true })
    }


    removeArticlefromthispage = (id) => {
        toast(`Deleting ${this.props.articledata.response.docs[0].headline.main})`, {
            transition: this.ZoomInAndOut,
            autoClose: 1500,
            className: css({ color: 'black' })
        })

        var articleDatafav = JSON.parse(localStorage.getItem('articlefav'))
        for (var i = 0; i < articleDatafav.length; i++) {
            if (articleDatafav[i].id === this.props.articledata.response.docs[0].web_url) {
                var index = i
                articleDatafav.splice(index, 1)
                break
            }
        }
        localStorage.setItem("articlefav", JSON.stringify(articleDatafav))
        this.props.dealwithremoval(id)
        this.setState({ iscolorred: false })
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



    render() {
        return (
            <div>
                <ToastContainer align="center" hideProgressBar="true" position={toast.POSITION.TOP_CENTER}
                />
                <div className="card container fluid">
                    <div className="contentart content row">

                        {this.props.articledata && this.props.articledata.response && this.props.articledata.response.docs && this.props.articledata.response.docs[0] && this.props.articledata.response.docs[0].headline && this.props.articledata.response.docs[0].headline.main
                            && <h4 className="col-xs-12 col-sm-12 col-md-12 col-lg-12">Title:&nbsp;{this.props.articledata.response.docs[0].headline.main}</h4>}


                        {this.props.articledata.response && this.props.articledata.response.docs[0] &&
                            this.props.articledata.response.docs[0].pub_date &&
                            <h6 className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '13px', marginBottom: '0px', fontStyle: 'italic', fontFamily: 'Arial, Helvetica, sans-serif' }}>{this.props.articledata.response.docs[0].pub_date.split('T')[0]}


                                {this.state.iscolorred && <IconContext.Provider value={{ style: { fill: 'red' }, color: 'red', size: '20px' }}>
                                    <span>
                                        <FaBookmark data-tip data-for="Bookmark" style={{ float: 'right', cursor: 'pointer' }} onClick={() => { this.removeArticlefromthispage(this.props.articledata.response.docs[0].web_url) }} />
                                        <ReactTooltip id='Bookmark' type='dark'>
                                            <span>Bookmark</span>
                                        </ReactTooltip>
                                    </span>
                                </IconContext.Provider>
                                }

                                {!this.state.iscolorred && <IconContext.Provider value={{ color: 'red', size: '20px' }}>
                                    <span>
                                        <FaRegBookmark data-tip data-for="Bookmark" style={{ float: 'right', cursor: 'pointer' }} onClick={this.addArticle} />
                                        <ReactTooltip id='Bookmark' type='dark'>
                                            <span>Bookmark</span>
                                        </ReactTooltip>
                                    </span>
                                </IconContext.Provider>
                                }

                                <EmailShareButton url={this.props.articledata.response.docs[0].web_url} subject="CSCI_571_NewsApp" className="share" style={{ float: 'right', paddingRight: '40px' }}>
                                    <EmailIcon size={23} round={true} data-tip data-for="Email" />
                                    <ReactTooltip id='Email' type='dark'>
                                        <span>Email</span>
                                    </ReactTooltip>
                                </EmailShareButton>
                                <TwitterShareButton url={this.props.articledata.response.docs[0].web_url} hashtags={["CSCI_571_NewsApp"]} className="share" style={{ float: 'right' }}>
                                    <TwitterIcon size={23} round={true} round={true} data-tip data-for="Twitter" />
                                    <ReactTooltip id='Twitter' type='dark'>
                                        <span>Twitter</span>
                                    </ReactTooltip>
                                </TwitterShareButton>
                                <FacebookShareButton url={this.props.articledata.response.docs[0].web_url} hashtag="#CSCI_571_NewsApp" className="share" style={{ float: 'right' }}>
                                    <FacebookIcon size={23} round={true} data-tip data-for="Facebook" />
                                    <ReactTooltip id='Facebook' type='dark'>
                                        <span>Facebook</span>
                                    </ReactTooltip>
                                </FacebookShareButton>

                            </h6>}

                        {
                            this.props.articledata.response && this.props.articledata.response.docs[0] && this.props.articledata.response.docs[0] &&
                                this.props.articledata.response.docs[0].multimedia && this.props.articledata.response.docs[0].multimedia[0] && this.props.articledata.response.docs[0].multimedia[0].url ?

                                <img className="col-xs-12 col-sm-12 col-md-12 col-lg-12" src={"https://static01.nyt.com/" + this.props.articledata.response.docs[0].multimedia[0].url} />

                                :
                                //this.props.articledata.response && this.props.articledata.response.docs[0] && this.props.articledata.response.docs[0] && this.props.articledata.response.docs[0].multimedia && this.props.articledata.response.docs[0].multimedia.length == 0 &&
                                <img className="col-xs-12 col-sm-12 col-md-12 col-lg-12" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" />
                        }


                        {this.props.articledata.response && this.props.articledata.response.docs[0] && this.props.articledata.response.docs[0].abstract &&
                            <p className="col-xs-12 col-sm-12 col-md-12 col-lg-12"> {this.props.articledata.response.docs[0].abstract}</p>}
                    </div>
                </div>

                <div className="commentbox" />
            </div>
        );
    }
}

export default Articlen