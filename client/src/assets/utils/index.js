import React from "react";

export const utils = {
    getTime: function(date) {
        date = new Date(date);
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return `${hour}:${minutes}:${seconds}`
    },
    getDMY: (date) => {
        date = JSON.stringify(date);
        date = date.split("T")[0].split("-").reverse().join("-").split("\"").join("");
        return date;
    }
}