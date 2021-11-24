const admin = function (req, res, next) {
    if(!req.user.isAdmin){
        return res.status(403).send("You don't have permission to perform this action!");
    }

    next();
}

module.exports = admin;