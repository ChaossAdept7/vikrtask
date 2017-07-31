import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
    "GETTING_NEWS_LIST",
    "GETTING_NEWS_LIST_SUCCESS",
    "GETTING_NEWS_LIST_FAILURE",
]);

export default actionTypes;