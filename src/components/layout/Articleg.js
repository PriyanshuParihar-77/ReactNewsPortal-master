import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { PropTypes } from 'prop-types';
import '../../App.css'
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
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
class Articleg extends Component {
    constructor() {
        super()
        this.state = {
            iscolorred: false,
            clicked: false,
            descriptionDiv: "collapseddiv"
        }
    }
    componentDidMount() {
        this.props.getdataforcontent(decodeURIComponent(this.props.match.params.articleval))
        document.getElementById("mainlable").style.marginLeft = "0px";
        document.getElementById("labelid").style.display = "none";
    }

    expandMoreDiv = () => {
        this.setState({
            clicked: true,
            descriptionDiv: "expandeddiv"
        })
    }


    expandLessDiv = () => {
        this.setState({
            clicked: false,
            descriptionDiv: "collapseddiv"
        })
    }

    componentDidUpdate(previousProps, prevState) {
        if (previousProps.articledata != this.props.articledata) {

            var data
            if (this.props && this.props.articledata && this.props.articledata.response && this.props.articledata.response.content && this.props.articledata.response.content.id) {
                data = this.props.articledata.response.content.id
            }
            var meradata
            if (this.props.articledata.response && this.props.articledata.response.content &&
                this.props.articledata.response.content.blocks &&
                this.props.articledata.response.content.blocks.body["0"] &&
                this.props.articledata.response.content.blocks.body["0"].bodyTextSummary) {
                meradata = this.props.articledata.response.content.blocks.body["0"].bodyTextSummary
            }


            this.removeCommentBox = commentBox('5739474327699456-proj', {
                createBoxUrl(boxId, pageLocation) {
                    pageLocation.search = '';
                    pageLocation.hash = boxId;
                    return data;
                }
            })

            if (localStorage["articlefav"]) {
                var articleDatafav = JSON.parse(localStorage.getItem('articlefav'))
                if (this.props && this.props.articledata && this.props.articledata.response && this.props.articledata.response.content && this.props.articledata.response.content.id) {
                    {
                        for (var i = 0; i < articleDatafav.length; i++) {
                            if (articleDatafav[i].id === this.props.articledata.response.content.id) {
                                this.setState((prevState, props) => {
                                    return { iscolorred: true };
                                })
                            }
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
        toast(`Saving ${this.props.articledata.response.content.webTitle})`, {
            transition: this.ZoomInAndOut,
            autoClose: 1500,
            className: css({ color: 'black' })
        })
        if (this.props.articledata.response && this.props.articledata.response.content && this.props.articledata.response.content.blocks && this.props.articledata.response.content.blocks.main &&
            this.props.articledata.response.content.blocks.main.elements && this.props.articledata.response.content.blocks.main.elements["0"] &&
            this.props.articledata.response.content.blocks.main.elements["0"].assets[this.props.articledata.response.content.blocks.main.elements["0"].assets.length - 1]
        ) {
            this.props.dealwithfav(
                {
                    title: this.props.articledata.response.content.webTitle,
                    id: this.props.articledata.response.content.id,
                    type: 'Guardian',
                    sectionId: this.props.articledata.response.content.sectionId,
                    date: this.props.articledata.response.content.webPublicationDate.split('T')[0],
                    image: this.props.articledata.response.content.blocks.main.elements["0"].assets[this.props.articledata.response.content.blocks.main.elements["0"].assets.length - 1].file,
                    url: this.props.articledata.response.content.webUrl,
                }
            )
        }
        else {
            this.props.dealwithfav(
                {
                    title: this.props.articledata.response.content.webTitle,
                    id: this.props.articledata.response.content.id,
                    type: 'Guardian',
                    sectionId: this.props.articledata.response.content.sectionId,
                    date: this.props.articledata.response.content.webPublicationDate.split('T')[0],
                    image: "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png",
                    url: this.props.articledata.response.content.webUrl,
                }
            )


        }
        this.setState({ iscolorred: true })
    }

    removeArticlefromthispage = (id) => {
        toast(`Removing ${this.props.articledata.response.content.webTitle})`, {
            transition: this.ZoomInAndOut,
            autoClose: 1500,
            className: css({ color: 'black' })
        })

        var articleDatafav = JSON.parse(localStorage.getItem('articlefav'))
        for (var i = 0; i < articleDatafav.length; i++) {
            if (articleDatafav[i].id === this.props.articledata.response.content.id) {
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

                    <div className="contentart row">

                        {this.props.articledata.response && this.props.articledata.response.content && this.props.articledata.response.content.webTitle
                            && <h4 className="col-xs-12 col-sm-12 col-md-12 col-lg-12">Title:&nbsp;{this.props.articledata.response.content.webTitle}</h4>}

                        {this.props.articledata.response && this.props.articledata.response.content &&
                            this.props.articledata.response.content.webPublicationDate &&
                            <h6 className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '13px', marginBottom: '0px', fontStyle: 'italic', fontFamily: 'Arial, Helvetica, sans-serif' }}>{this.props.articledata.response.content.webPublicationDate.split('T')[0]}


                                {this.state.iscolorred && <IconContext.Provider value={{ style: { fill: 'red' }, color: 'red', size: '20px' }}>
                                    <span>
                                        <FaBookmark data-tip data-for="Bookmark" style={{ float: 'right', cursor: 'pointer' }} onClick={() => { this.removeArticlefromthispage(this.props.articledata.response.content.id) }} />
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
                                <EmailShareButton url={this.props.articledata.response.content.webUrl} subject="CSCI_571_NewsApp" className="share" style={{ float: 'right', paddingRight: '40px' }}>
                                    <EmailIcon size={23} round={true} data-tip data-for="Email" />
                                    <ReactTooltip id='Email' type='dark'>
                                        <span>Email</span>
                                    </ReactTooltip>
                                </EmailShareButton>
                                <TwitterShareButton url={this.props.articledata.response.content.webUrl} hashtags={["CSCI_571_NewsApp"]} className="share" style={{ float: 'right' }}>
                                    <TwitterIcon size={23} round={true} round={true} data-tip data-for="Twitter" />
                                    <ReactTooltip id='Twitter' type='dark'>
                                        <span>Twitter</span>
                                    </ReactTooltip>
                                </TwitterShareButton>
                                <FacebookShareButton url={this.props.articledata.response.content.webUrl} hashtag="#CSCI_571_NewsApp" className="share" style={{ float: 'right' }}>
                                    <FacebookIcon size={23} round={true} data-tip data-for="Facebook" />
                                    <ReactTooltip id='Facebook' type='dark'>
                                        <span>Facebook</span>
                                    </ReactTooltip>
                                </FacebookShareButton>

                            </h6>}

                        {this.props.articledata.response && this.props.articledata.response.content && this.props.articledata.response.content.blocks && this.props.articledata.response.content.blocks.main &&
                            this.props.articledata.response.content.blocks.main.elements && this.props.articledata.response.content.blocks.main.elements["0"] &&
                            this.props.articledata.response.content.blocks.main.elements["0"].assets[this.props.articledata.response.content.blocks.main.elements["0"].assets.length - 1]
                            ? <img className="col-xs-12 col-sm-12 col-md-12 col-lg-12" src={this.props.articledata.response.content.blocks.main.elements["0"].assets[this.props.articledata.response.content.blocks.main.elements["0"].assets.length - 1].file} />
                            :
                            <img src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" />}

                        {
                            this.props.articledata.response && this.props.articledata.response.content &&
                            this.props.articledata.response.content.blocks &&
                            this.props.articledata.response.content.blocks.body["0"] &&
                            this.props.articledata.response.content.blocks.body["0"].bodyTextSummary &&
                            <p className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className={this.state.descriptionDiv}>
                                    {this.props.articledata.response.content.blocks.body["0"].bodyTextSummary}
                                </div>
                            </p>

                        }
                        {!this.state.clicked && <MdExpandMore style={{ float: 'right', fontSize: '20px' }} onClick={this.expandMoreDiv} />}
                        {this.state.clicked && <MdExpandLess style={{ float: 'right', fontSize: '20px' }} onClick={this.expandLessDiv} />}



                    </div>
                </div>
                {
                    this.props && this.props.articledata && this.props.articledata.response && this.props.articledata.response.content && this.props.articledata.response.content.id &&
                    <div className="commentbox" />
                }
            </div>
        );
    }
}
export default Articleg;