import React, {Component, PropTypes} from 'react';
import {Route} from 'react-router-dom';
import ShowNewsItem from './ShowNewsItem'
import NewsList from './NewsList'

const Router = () => (<div className="app_container">
    <Route path="/news-list" component={NewsList} />
    <Route path="/show-news-item/:id" component={ShowNewsItem} />
</div>);

export default Router;

