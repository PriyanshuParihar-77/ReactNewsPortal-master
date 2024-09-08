import React, { Component, Fragment } from 'react';
import './App.css';
import axios from 'axios';
import Navbar1 from './components/layout/Navbar'
import Navbar2 from './components/layout/Navbar2'
import Cards from './components/layout/Cards'
import Cards2 from './components/layout/Cards2'
import ResultsG from './components/layout/ResultsG'
import ResultsN from './components/layout/ResultsN'
import Articlen from './components/layout/Articlen'
import Articleg from './components/layout/Articleg'
import World from './components/layout/World'
import Politics from './components/layout/Politics'
import Business from './components/layout/Business'
import Technology from './components/layout/Technology'
import Sports from './components/layout/Sports'
import Favourite from './components/layout/Favourite'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import Spinner from './components/layout/Spinner';

class App extends Component {
    userData = {};
    articleDatafav = {}
    constructor() {
        super()
        if (localStorage["user"]) {
            this.userData = JSON.parse(localStorage.getItem('user'));
            if (localStorage["articlefav"]) {
                this.articleDatafav = JSON.parse(localStorage.getItem('articlefav'));
                this.state = {
                    text1: null,
                    type: this.userData.type,
                    newstype: [],
                    article: {},
                    articleurlny: {},
                    what: '',
                    valbody: [],
                    articleb: this.articleDatafav,
                    loading: false
                }
            }
            else {
                this.state = {
                    text1: null,
                    type: this.userData.type,
                    newstype: [],
                    article: {},
                    articleurlny: {},
                    what: '',
                    valbody: [],
                    articleb: [],
                    loading: false
                }
            }
        }
        else {
            this.state = {
                text1: null,
                type: "",
                newstype: [],
                article: {},
                articleurlny: {},
                what: '',
                valbody: [],
                articleb: [],
                loading: false
            }

        }

        this.dealwithremoval = this.dealwithremoval.bind(this)
        this.dealwithfav = this.dealwithfav.bind(this)
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
        const res = await axios.get(`http://backendhw8-env.eba-qt8jtpq3.us-east-1.elasticbeanstalk.com/searchNytimes?val=${val}`)
        this.setState({ articleurlny: res.data })
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
            const res = await axios.get(`http://backendhw8-env.eba-qt8jtpq3.us-east-1.elasticbeanstalk.com/Guardian`);
            this.setState({ newstype: res.data.response.results });
            this.setState({ type: 'guardian', text1: false })
            localStorage.setItem('user', JSON.stringify(this.state));
        }
        else if (text == true) {
            const res = await axios.get(`http://backendhw8-env.eba-qt8jtpq3.us-east-1.elasticbeanstalk.com/Nytimes`);
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
    dealwithfav = (obj) => {
        console.log(obj)
        var oldItems = JSON.parse(localStorage.getItem('articlefav')) || [];

        var repeated = oldItems.filter(function (a) { return a.id === obj.id }).length;
        console.log(repeated)
        if (!repeated) {
            var desc = obj.title;
            var maxLength = 60
            var stringtrim = " "
            if (desc.length > 60) {
                if (desc.length > stringtrim.length) {
                    stringtrim = desc.substr(0, maxLength + 1);
                    stringtrim = stringtrim.substr(0, Math.min(stringtrim.length, stringtrim.lastIndexOf(" ")))
                    stringtrim += "..."
                    obj.title = stringtrim
                }
            }
            else {
                stringtrim = desc
                obj.title = stringtrim
            }


            this.setState({
                articleb: [...this.state.articleb, {
                    title: obj.title,
                    id: obj.id,
                    type: obj.type,
                    sectionId: obj.sectionId,
                    date: obj.date,
                    image: obj.image,
                    url: obj.url
                }]
            })
            oldItems.push({
                title: obj.title,
                id: obj.id,
                type: obj.type,
                sectionId: obj.sectionId,
                date: obj.date,
                image: obj.image,
                url: obj.url
            })
            localStorage.setItem('articlefav', JSON.stringify(oldItems));

        }
        else {
            alert('already added')
        }

    }


    dealwithremoval = (id) => {
        this.setState({ articleb: this.state.articleb.filter(article => article.id !== id) })
    }

    what = () => {
        document.getElementById("labelid").style.display = "flex";
        document.getElementById("dp").style.width = "250px";
        document.querySelector(".form-inline").style.cssFloat = "right";
        document.querySelector(".form-inline").style.width = "278px"
        document.getElementById("mainlable").style.marginLeft = "-10px";
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
            <Router>
                <div className="App">
                    <Switch>
                        <Route
                            exact path='/' render={props => (
                                <Fragment>
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
                                            <Redirect to="/ResultsG" />
                                    }

                                    {
                                        this.state.loading ? <Spinner /> :
                                            this.state.type === 'nytimes' && this.state.what === "gaayi" &&
                                            <Redirect to="/ResultsN" />
                                    }
                                </Fragment>
                            )}
                        />
                        <Route
                            exact path='/world' render={() => <World />} />
                        <Route
                            exact path='/politics' render={() => <Politics />} />
                        <Route
                            exact path='/business' render={() => <Business />} />
                        <Route
                            exact path='/technology' render={() => <Technology />} />
                        <Route
                            exact path='/sports' render={() => <Sports />} />

                        <Route path='/favourite' render={props => (
                            <Fragment>
                                <Navbar2 searchUsers={this.searchUsers} text1={this.state.text1} barsearchUsers={this.barsearchUsers} what={this.what} />

                                <Favourite {...props} what={this.state.what} data={this.state.articleb} dealwithremoval={this.dealwithremoval} />}
                            </Fragment>
                        )} />

                        <Route path='/ResultsG' render={props => (
                            <Fragment>
                                <Navbar1 searchUsers={this.searchUsers} text1={this.state.text1} barsearchUsers={this.barsearchUsers} what={this.what} />
                                <ResultsG {...props} newstype={this.state.newstype} />
                            </Fragment>
                        )} />

                        <Route path='/ResultsN' render={props => (
                            <Fragment>
                                <Navbar1 searchUsers={this.searchUsers} text1={this.state.text1} barsearchUsers={this.barsearchUsers} what={this.what} />
                                <ResultsN {...props} newstype={this.state.newstype} />
                            </Fragment>
                        )} />

                        <Route path='/article/:articleval' render={props => (
                            <Fragment>
                                <Navbar1 searchUsers={this.searchUsers} text1={this.state.text1} barsearchUsers={this.barsearchUsers} what={this.what} />
                                {this.state.type === "guardian" && <Articleg {...props} getdataforcontent={this.getdataforcontent} articledata={this.state.article} dealwithfav={this.dealwithfav} dealwithremoval={this.dealwithremoval} />}
                                {this.state.type === "nytimes" && <Articlen {...props} setstateforNy={this.setstateforNy} articledata={this.state.articleurlny} dealwithfav={this.dealwithfav} dealwithremoval={this.dealwithremoval} />}
                            </Fragment>
                        )} />

                    </Switch>
                </div>
            </Router>
        )
    }
};


export default App;
