import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import {style} from './../generalPaperStyles';
import CircularProgress from 'material-ui/CircularProgress';
export let url = "http://www.nytimes.com/";

const NewsItem = ({newsItem, selectNewsItem}) => {

    let {headline, lead_paragraph, multimedia, pub_date, snippet} = newsItem;
    let images = [];
    let imageContent = null;
    if(multimedia.length > 0){
        images = multimedia.filter((el)=>el.type == 'image' && el.subtype == 'wide');
        imageContent = images.map((el,i)=>{
            return <img key={i} src={`${url}${el.url}`} />
        });
    }

    return <Paper style={style} zDepth={2}>
        <div onClick={()=>selectNewsItem(newsItem['_id'])} style={{ padding:"10px", borderRadius:"5px", margin:"5px", cursor:"pointer"}}>
            <h3>{headline.main}</h3>
            {imageContent}
            <p><b>{pub_date}</b> {lead_paragraph||snippet}</p>
        </div>
    </Paper>
}

class NewsList extends Component {

    constructor(props) {
        super(props);
    }

    selectNewsItem = (id) => {
        localStorage.removeItem('news');
        let {push} = this.props.history;
        /* add item to localstorage*/
        let newsFilter = this.props.news.news_list.filter((el)=>el['_id']==id);
        localStorage.setItem('news', JSON.stringify(newsFilter));
        push(`/show-news-item/${id}`);
    };

    render() {
        let {status} = this.props.news;
        let content = null;
        let style_ = {position:'absolute', height:"75%", overflowY:"auto"};
        if(status == 'pending'){
            content = <div><CircularProgress /></div>
            style_ = {padding:"30px"}
        }else{
            let {search_year:year, search_month:month, news} = this.props;
            let {news_list=[]} = news;
            content =
                    news_list.map((el, i)=><NewsItem
                        key={i}
                        newsItem={el}
                        selectNewsItem={this.selectNewsItem}

                    />)
        }

        return <div style={style_}>
            <Paper style={style} zDepth={3}>
                <div style={{position:'relative'}}>
                    {content}
                </div>
            </Paper>
        </div>
    }

}



export default connect((store, ownProps)=>{
    return {
        news:store.news
    }
})(NewsList);

