const router = require('express').Router()
const adsServices = require('../services/adsServices')
const { isAuth } = require('../middlewares/authMiddleware')
const userService = require('../services/userService')

router.get('/', async (req, res) => {
    const adsOffer = await adsServices.getAll().lean()
    let adsOffer1 = adsOffer.slice(0, 3)
    // const count = adsOffer1.map(el => el.usersApplied.length)

    // console.log(count)
    // hotelOffer.sort((a, b) => b.freeRooms - a.freeRooms)
    res.render('home', {adsOffer1})
})

// router.get('/profile', isAuth, async (req, res) => {
//     const user = await userService.getOne(req.user?._id).lean()
//     const booked = await bookingServices.getAll(user.bookedHotels).lean()
//     const publicationTitles = booked.map(x => x.hotel).join(', ')
//     console.log(publicationTitles)
//     res.render('home/profile', { ...user, publicationTitles })
// })

module.exports = router