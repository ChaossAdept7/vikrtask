/**
 * Created by serj on 7/30/17.
 */

/* utils functions */

const getNews = (response)=>response['data']['response']['docs'];

let newsReducer = (news={success:false, status:"new"}, action)=>{
    switch (action.type) {
        case 'GETTING_NEWS_LIST':
            return {
                ...news,
                status:"pending",
                deleted:false,
                created:false,
                updated:false,
            };
            break;
        case 'GETTING_NEWS_LIST_FAILURE':
            return {
                ...news,
                status:"done",
                success:false,
                deleted:false
            };
            break;
        case 'GETTING_NEWS_LIST_SUCCESS':
            console.log(action);
            return {
                ...news,
                news_list:getNews(action),
                success:true,
                status:"done"
            };
            break;
        default:
            return news;
        break;
    }
}

export default newsReducer;