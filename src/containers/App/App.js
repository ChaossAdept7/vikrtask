import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import Router from './../Router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Route , Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import $ from 'jquery';
import {getNewsList} from './../../redux/actions';
import DateSelect from './DateSelect';

export function getURLParameter(url, name) {
    return (new RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}

let iconsStyle = {color:"white"};
const recentsIcon = <FontIcon style={iconsStyle} className="material-icons">{(new Date()).getFullYear()}</FontIcon>;
const muiTheme = getMuiTheme(lightBaseTheme);


class App extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        open: false,
        dates:{
            year:"Select ",
            month:"Select "
        }
    };

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    handleChange = (event, index, value, name) => {
        this.setState({
            dates:{
                ...this.state.dates,
                [name]:value
            }
        })
    };

    handleApply = () => {
        let {dates} = this.state;
        let {year, month} = dates;
        let {push} = this.props.history;
        /* we do not want to select empty items */
        if(year == "" || year == "Select "){
            alert("Select Year to proceed");
            return false;
        }
        /* we do not want to select empty items */
        if(month == "" || month == "Select "){
            alert("Select Month to proceed");
            return false;
        }
        /* prepate query to adress bar  */
        let query = `?${$.param(dates)}`;
        /* save in adress */
        push(`${query}`);
        this.props.getNewsList({year, month});
    };

    componentDidMount(){
       let {search_year:year="", search_month:month=""} = this.props;
        /* update from url */
        this.setState({
            dates:{
                year,
                month
            }
        });
        this.props.getNewsList({year, month});
    }

    render() {
        let filters =  <DateSelect
            values={this.state.dates}
            handleChange={this.handleChange}
            handleApply={this.handleApply}
        />;

        if(this.props.location.pathname.indexOf('news-list') == -1){
            filters = null;
        }

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="app_grid_container">
                    <header className="header">
                        <AppBar
                            onLeftIconButtonTouchTap={this.handleToggle}
                            iconElementRight={filters}
                        >
                        </AppBar>
                    </header>
                    <main className="main">
                        <Router />
                        <Drawer
                            docked={false}
                            width={200}
                            open={this.state.open}
                            onRequestChange={(open) => this.setState({open})}
                        >
                            <MenuItem onTouchTap={this.handleClose}>
                                <Link to={`/news-list`}>News List</Link>
                            </MenuItem>
                        </Drawer>
                    </main>
                    <div className="footer">
                        <Paper style={{background:"rgb(0, 188, 212)!important", }} zDepth={3}>
                            <BottomNavigation style={{background:"rgb(0, 188, 212)"}} selectedIndex={this.state.selectedIndex}>
                                <BottomNavigationItem
                                    label="Year"
                                    icon={recentsIcon}
                                />
                            </BottomNavigation>
                        </Paper>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
//ownProps.match.params
export default withRouter(connect((store, ownProps)=>{
    let {search} = ownProps.location;
    if(search.length > 0)
        return {
            search_year:getURLParameter(search, 'year'),
            search_month:getURLParameter(search, 'month'),
            news:store.news
        }
    return {
        news:store.news
    }
}, {getNewsList})(App));
