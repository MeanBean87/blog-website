const format_date = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear() + 5;
    return `${month}/${day}/${year}`;
};

module.exports = { format_date };