/**
 * Temp Solution to extract userId from Session.
 * @param cookie
 * @param sessionStore
 * @returns {user|*|packet.user|connection.user|config.user|testFlags.user}
 */
var util = require('util');
module.exports.getUser = function(cookie, sessionStore) {
    var userCookie = cookie;
    var i1 = userCookie.indexOf('express.sid=s%3')+16;
    var i2 = userCookie.indexOf('.', i1);
    var sessionKey = userCookie.substring(i1, i2);
    var userSession = JSON.parse(sessionStore.sessions[sessionKey]);
    var userId = userSession.passport.user;
    return userSession.passport.user;
}
