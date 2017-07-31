/**
 * Created by serj on 7/26/17.
 */
import actionTypes from './../constants/actionsTypes'
import {put, takeEvery, call, all} from 'redux-saga/effects'

const APIKey = 'cc8b92812cfe4ee1bba8c917802ea1ad';
const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${APIKey}`;
var myHeaders = new Headers();

var myInit = { method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' };
/* GET NEWS START */
function getNews(date){
    /* get year and month - here they should be already validated on non - empiness */
    let {year, month} = date;
    if(month.length === 1)
        month = '0'+month;
    let adjustedUrl = `${url}&sort=newest`;
    if(year.length > 0 && month.length > 0){
        adjustedUrl = `${url}&end_date=${year}${month}01&sort=newest`;
    }
    return fetch(adjustedUrl, myInit).then((response)=>response.json()).catch((e)=>console.log(e))
}

/* make work here  */
function* getNewsAPI(action) {
    try {
        const data = yield getNews(action.payload);
        yield put({type: actionTypes.GETTING_NEWS_LIST_SUCCESS, data})
    } catch (e) {
        yield put({type: actionTypes.GETTING_NEWS_LIST_FAILURE})
    }
}

/* listen to get news event */
function* getNewsSaga() {
    yield takeEvery(actionTypes.GETTING_NEWS_LIST, getNewsAPI)
}

/* GET NEWS END */

export default function* sagas() {
    yield all([
        getNewsSaga()
    ])
}
