module.exports = {
    isEmpltyObj: (obj) => {
        return Object.keys(obj).length > 0 ? false : true;
    },
    notification: (message, status, code, data) => {
        return {
            message,
            status,
            code,
            ...data
        }
    },
    getDMY: (date) => {
        date = JSON.stringify(date);
        date = date.split("T")[0].split("-").reverse().join("-");
        return date;
    },
    isNull: (data) => {
        return !data ? true : false;
    },
    isErrors: (errors) => {
        return Object.keys(errors).length > 0 ? true : false;
    }
}