module.exports = function (req, res, next) {
    var _cookie = res.cookie;
    res.cookie = function cookie(name, value, options) {
        options = options || {};
        if (typeof options.secure === 'undefined') {
            options.secure = (req.protocol === 'https');
        }
        if (typeof options.httpOnly === 'undefined') {
            options.httpOnly = true;
        }
        _cookie(name, value, options);
    };
    next();
};
