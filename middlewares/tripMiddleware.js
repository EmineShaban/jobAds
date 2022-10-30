const adsServices = require('../services/adsServices')


exports.preloadTrip = async (req, res, next) => {
    const reklama = await adsServices.getOne(req.params.reklamaID).lean()

    req.reklama = reklama

    next()
}

exports.isTripAuthor = async (req, res, next) => {
    const reklama = await adsServices.getOne(req.params.reklamaID).lean()
    // console.log(req.user._id)
    // console.log(reklama)
    if (reklama?.owner != req.user._id) {
        return res.redirect('/')
    }
    next()
}