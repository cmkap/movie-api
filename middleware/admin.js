module.exports = function ( req, res, next) {
    // 401 Unauthorized- no authtoken
    // 403 Forbidden - no permission
    console.log(req.user.isAdmin)
    if (!req.user.isAdmin) return res.status(403).send('Access denied')

    next()
}