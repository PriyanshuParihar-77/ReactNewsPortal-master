import React, { Component, Fragment } from 'react';
import '../../App.css';
import axios from 'axios';
import Navbar1 from './Navbar'
import Cards from './Cards'
import Cards2 from './Cards2'
import ResultsG from './ResultsG'
import ResultsN from './ResultsN'
import Spinner from './Spinner'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
class Business extends Component {
    userData = {};
    constructor() {
        super()
        if (localStorage["user"]) {
            this.userData = JSON.parse(localStorage.getItem('user'));
            this.state = {
                text1: null,
                type: this.userData.type,
                newstype: [],
                article: [],
                articleurlny: [],
                what: '',
                valbody: [],
                loading: false
            }
        }
        else {
            this.state = {
                text1: null,
                type: '',
                newstype: [],
                article: [],
                articleurlny: [],
                what: '',
                valbody: [],
                loading: false
            }
        }
    }


    componentDidMount() {
        if (this.state.type === 'guardian') {
            this.searchUsers(false)
            this.setState({ text1: false })
        }
        else if (this.state.type === 'nytimes') {
            this.searchUsers(true)
            this.setState({ text1: true })
        }

        else {
            this.setState({
                type: 'guardian',
                text1: false
            })
            this.searchUsers(false)
        }
    }

    setstateforNy = async (val) => {
        this.setState({ loading: true })
        //const res = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(%22${val}%22)%20&api-key=2GY7A4N6WecQAiwk8gR8HtrkBTb5wlSn`);
        const res = JSON.parse(await axios.get(`http://backendhw8-env.eba-qt8jtpq3.us-east-1.elasticbeanstalk.com/searchNytimes?val=${val}`))
        this.setState({ articleurlny: res.data })
        console.log(this.state.articleurlny)
        this.setState({ loading: false })
    }

    getdataforcontent = async (val) => {
        this.setState({ loading: true })
        //const res = await axios.get(`https://content.guardianapis.com/${val}?api-key=2ab573c1-5426-4d28-96c4-bf13d2a166b5&show-blocks=all`);
        const res = await axios.get(`http://backendhw8-env.eba-qt8jtpq3.us-east-1.elasticbeanstalk.com/searchGuardian?val=${val}`)
        this.setState({ article: res.data })
        this.setState({ loading: false })
    }


    searchUsers = async (text) => {
        this.setState({ loading: true })
        if (text == false) {
            //const res = await axios.get(`https://content.guardianapis.com/search?api-key=2ab573c1-5426-4d28-96c4-bf13d2a166b5&section=(sport|business|technology|politics)&show-blocks=all`);
            const res = await axios.get(`http://backendhw8-env.eba-qt8jtpq3.us-east-1.elasticbeanstalk.com/GuardianBus`);
            this.setState({ newstype: res.data.response.results });
            this.setState({ type: 'guardian', text1: false })
            localStorage.setItem('user', JSON.stringify(this.state));
        }
        else if (text == true) {
            const res = await axios.get(`http://backendhw8-env.eba-qt8jtpq3.us-east-1.elasticbeanstalk.com/NytimesBus`);
            this.setState({ newstype: res.data.results });
            this.setState({ type: 'nytimes', text1: true })
            localStorage.setItem('user', JSON.stringify(this.state));
        }
        this.setState({ loading: false })
    }

    barsearchUsers = async (val) => {
        this.setState({ loading: true })
        if (this.state.type === "guardian") {
            this.setState({ what: 'aaayi' })
            const res = await axios.get(`http://backendhw8-env.eba-qt8jtpq3.us-east-1.elasticbeanstalk.com/barsearchGuardian?val=${val}`)
            this.setState({ newstype: res.data.response.results })
        }

        else if (this.state.type === "nytimes") {
            this.setState({ what: 'gaayi' })
            const res = await axios.get(`http://backendhw8-env.eba-qt8jtpq3.us-east-1.elasticbeanstalk.com/barsearchNytimes?val=${val}`)
            this.setState({ newstype: res.data.response.docs })
        }
        this.setState({ loading: false })
    }
    what = () => {
        document.getElementById("labelid").style.display = "flex";
        document.getElementById("dp").style.width = "250px";
        document.getElementById("mainlable").style.marginLeft = "370px";
        this.setState({ what: "" })
        if (this.state.type === 'guardian') {
            this.searchUsers(false)
            this.setState({ text1: false })
        }
        else if (this.state.type === 'nytimes') {
            this.searchUsers(true)
            this.setState({ text1: true })
        }
        else {
            this.setState({
                type: 'guardian',
                text1: false
            })
            this.searchUsers(false)
        }
    }

    render() {
        return (
            <div>
                <Navbar1 searchUsers={this.searchUsers} text1={this.state.text1} barsearchUsers={this.barsearchUsers} what={this.what} />
                {
                    this.state.loading ? <Spinner /> :
                        this.state.type === 'nytimes' && this.state.what === "" &&
                        this.state.newstype.slice(0, 10).map((user) => (
                            user.title && user.section && user.published_date && user.abstract && user.multimedia && user.multimedia[0] && user.multimedia[0].url &&
                            <Cards user={user} />
                        ))
                }
                {
                    this.state.loading ? <Spinner /> :
                        this.state.type === 'guardian' && this.state.what === "" &&
                        this.state.newstype.map((user) => (
                            user.webTitle && user.sectionId && user.webPublicationDate && user.blocks.body && user.blocks
                            && user.blocks.body[0] && user.blocks.body[0].bodyTextSummary && user.blocks.main.elements["0"]
                            && user.blocks.main.elements && user.blocks.main.elements["0"].assets[user.blocks.main.elements["0"].assets.length - 1] &&
                            <Cards2 user={user} />
                        ))
                }

                {
                    this.state.loading ? <Spinner /> :
                        this.state.type === 'guardian' && this.state.what === "aaayi" &&
                        <ResultsG newstype={this.state.newstype} />
                }

                {
                    this.state.loading ? <Spinner /> :
                        this.state.type === 'nytimes' && this.state.what === "gaayi" &&
                        <ResultsN newstype={this.state.newstype} />
                }
            </div>
        )
    }
}



export default Business;
