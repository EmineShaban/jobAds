const Ads = require('../models/Ads')


exports.create = (AdsData) => Ads.create(AdsData)
exports.getAll = () => Ads.find()
exports.getOne = (AdsID) => Ads.findById(AdsID)
// exports.getOneDetailed = (AdsID) => Ads.findById(AdsID)
exports.delete = (AdsID) => Ads.deleteOne({ _id: AdsID })
exports.update = (AdsID, AdsData) => Ads.updateOne({ _id: AdsID }, { $set: AdsData }, { runValidators: true })
// exports.updateOne = (AdsID, seatsNew) => Ads.updateOne({ _id: AdsID }, { $set: { "seats" : seatsNew } }, { runValidators: true })
// exports.addBuddies = (AdsID, userId) => Ads.updateOne({ _id: AdsID }, { $push: { "Buddies" : userId } }, { runValidators: true })
// // exports.addBuddies = (AdsID, userId) => Ads.updateOne({_id: AdsID}, {$push: {Buddies: userId}})

// exports.getAdsByID = (userId) => Ads.find({AdssHistory: userId})
exports.updateRooms = (AdsID, AdsData) => Ads.updateOne({ _id: AdsID }, { $set: AdsData }, { runValidators: true })
exports.applide = (userId, tripID) => Ads.updateOne({_id: userId}, {$push: {usersApplied: tripID}})
exports.getOne2 = (id) =>  Ads.findById(id).populate("usersApplied")
