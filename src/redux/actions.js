/**
 * Created by serj on 7/26/17.
 */
import actionTypes from './../constants/actionsTypes'

export function getNewsList(data) {
    return {
        type: actionTypes.GETTING_NEWS_LIST,
        payload:data
    }
}

