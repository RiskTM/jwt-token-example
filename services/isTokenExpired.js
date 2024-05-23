/*
* Input: err from jwt.verify() 
* 
* Output: boolean depending on expired date
*/
const isTokenExpired = (err) => {
        const now = new Date();
        const dateExpired = err.expiredAt;
        return now > dateExpired;  
}

module.exports = {isTokenExpired};