const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorHelper')
const adsServices = require('../services/adsServices')
const userService = require('../services/userService')
const { preloadTrip, isTripAuthor } = require('../middlewares/tripMiddleware')
router.get('/search', async (req, res) => {

res.render('ads/search')
})
router.get('/catalog', async (req, res) => {
        const adsOffer = await adsServices.getAll().lean()

    res.render('ads/catalog', {adsOffer})
})

router.get('/create', isAuth, (req, res) => {
    res.render('ads/create')
})


router.post('/create', isAuth, async (req, res) => {
    try {
        const reklama = await adsServices.create({ ...req.body, owner: req.user })
        await userService.addTrip(req.user._id, reklama._id)
        res.redirect('/ads/catalog')
    } catch (error) {
        return res.render('ads/create', { error: getErrorMessage(error), reklama:req.body })
    }
})

router.get(
    '/:reklamaID/details',
    async (req, res) => {
        try {
            const reklama = await adsServices.getOne(req.params.reklamaID).lean()
            const ownerAds = await userService.getOne(reklama.owner).lean()
            const isAuthor = reklama.owner == req.user?._id
            const isAlreadyJoin = reklama.usersApplied?.find(element => element == req.user?._id) == req.user?._id
            const count = reklama.usersApplied.length
            // const aaa = await adsServices.getOne2(reklama.usersApplied[0]).lean()

            const joined = await adsServices.getOne2(reklama._id).lean()
            let aaa =  joined.usersApplied
        console.log(aaa)

            res.render('ads/details', { ...reklama, ownerAds, isAuthor, isAlreadyJoin, count, ...joined })
        } catch (error) {
            return res.render(`ads/details`, { error: getErrorMessage(error) })
        }
    })


router.get(
    '/:reklamaID/delete',
    isAuth,
    isTripAuthor,
    async (req, res) => {
        await adsServices.delete(req.params.reklamaID)
        res.redirect('/ads/catalog')
    })

router.get(
    '/:reklamaID/edit',
    isAuth,
    isTripAuthor,
    async (req, res) => {
        try {
            const reklama = await adsServices.getOne(req.params.reklamaID).lean()
            res.render('ads/edit', { ...reklama })
        } catch (error) {
            return res.render(`reklama/details`, { error: getErrorMessage(error) })
        }
    })


router.post(
    '/:reklamaID/edit',
    isAuth,
    isTripAuthor,
    async (req, res) => {
        try {
            await adsServices.update(req.params.reklamaID, req.body)
            res.redirect(`/ads/${req.params.reklamaID}/details`)
        } catch (error) {
            res.render('ads/edit', { ...req.body, error: getErrorMessage(error) })
        }
    })

router.get(
    '/:reklamaID/join',
    isAuth,
    preloadTrip,
    async (req, res) => {
        try {
            await adsServices.applide(req.reklama._id, req.user._id)
            // req.reklama.freeRooms -= 1
            await userService.addAds(req.user._id, req.reklama._id)
            res.redirect(`/ads/${req.params.reklamaID}/details`)
        } catch (error) {
            res.render(`ads/${req.params.reklamaID}/details`, { ...req.body, error: getErrorMessage(error) })
        }
    })


router.get('*', (req, res) => {
    res.render('404')
})

module.exports = router