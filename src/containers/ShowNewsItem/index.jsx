import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {style} from './../generalPaperStyles';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {handleStateChange} from './../stateHandlers';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import {url} from './../NewsList'

class ShowNewsItem extends Component {

    constructor(props) {
        super(props);
        this.handleStateChange = handleStateChange.bind(this, 'userData');
    }

    state = {
        open: false,
        userData:{},
        isUpdate:false
    };

    handleBack = () => {
        let {push} = this.props.history;
        push('/news-list');
    };

    render() {
        let {id=""} = this.props;
        let currentNewsItem = JSON.parse(localStorage.getItem('news'))[0];
        /* we want to show header, images, tags, link to original article */
        let {multimedia=[], headline, snippet, web_url, source, pub_date, word_count} = currentNewsItem;
        let imgContainer = null;
        if(multimedia.length> 0){
            /* if there are large img - we want to use them */
            let images = multimedia.filter((el)=>el.type == 'image' && el.subtype == 'xlarge');

            /* if there are no large img - we want to use middle */
            if(images.length == 0)
                images = multimedia.filter((el)=>el.type == 'image' && el.subtype == 'wide');

            imgContainer = images.map((el,i)=>{
                return <img key={i} src={`${url}${el.url}`} />
            });
        }
        return <div style={{bottom:"72px", position:'absolute', height:"80%", overflowY:"auto"}}>
            <Paper style={style}>
                <div>
                    <RaisedButton primary={true} label="Back" onClick={this.handleBack} />
                </div>

                <div>
                    <h1>{headline.main}</h1>
                    <div style={{display:"flex", padding:"10px"}}>
                        {imgContainer}
                        <div  style={{ padding:"10px"}}>
                            <p><b>Description</b> : {snippet}</p>
                            <b>Link to original site</b>:<a style={{color:"blue"}} href={web_url}>{web_url}</a>
                            <div><b>Publication date</b>: {pub_date}</div>
                            <div><b>Words count</b>:{word_count}</div>
                            <div><b>Source</b>:{source}</div>
                        </div>
                    </div>

                </div>
            </Paper>
        </div>
    }

}

export default connect((store, ownProps)=> ({
    id:ownProps.match.params.id,
    news: store.news
}))(ShowNewsItem);

