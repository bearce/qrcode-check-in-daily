import React from 'react';
import Axios from 'axios';

export const getGuestsAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/guests`
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const getGuestAPI = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/guests/${id}`
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const getHistorysAPI = (query) => {
    let url = `${process.env.REACT_APP_API_ENDPOINT}/api/historys`;

    if(query.indexOf("userId") !== -1) {
        query = query.split("=");
        url = `${url}/${query[query.indexOf("userId") + 2]}`
    }

    return new Promise((resolve, reject) => {
        return Axios({
            method: "GET",
            url: url
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}

export const check_IN_OUT_API = (id) => {
    return new Promise((resolve, reject) => {
        return Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_ENDPOINT}/api/historys`,
            data: {
                guestId: id
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
}