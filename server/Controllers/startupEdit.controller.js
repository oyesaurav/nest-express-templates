const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const startupdb = require('../Models/startup.schema')

const startupEdit = async (req, res, next) => {
  await startupdb.findOne({ email: req.body.email })
    .exec()
    .then((startup) => {
      if (!startup) {
        res.status(409).json({
          message: "Startup not registered",
        })
      } else {
        startupdb.updateOne({ _id: req.body._id }, {
          $set: {
            Name: req.body.name || startup.Name,
            phone_number: req.body.phone_number || startup.phone_number,
            Headline: req.body.Headline || startup.Headline,
            location: req.body.location || startup.location,
            overview: {
              website: req.body.website || startup.overview.website,
              ceo: req.body.ceo || startup.overview.ceo,
              employees: req.body.employees || startup.overview.employees,
              sector: req.body.sector || startup.overview.sector,
              stage: req.body.stage || startup.overview.stage,
              founded: req.body.founded || startup.overview.founded,
              location: req.body.location || startup.overview.location
            },
            problem: {
              heading: req.body.pheading || startup.problem.heading,
              shortdescription: req.body.pshortdescription || startup.problem.shortdescription,
              subheading: req.body.psubheading || startup.problem.subheading,
              body: req.body.pbody || startup.problem.body,
              problemUrl: req.body.problemUrl || startup.problem.problemUrl,
            },
            solution: {
              heading: req.body.sheading || startup.solution.heading,
              shortdescription: req.body.sshortdescription || startup.solution.shortdescription,
              subheading: req.body.ssubheading || startup.solution.subheading,
              body: req.body.sbody || startup.solution.body,
              solutionUrl: req.body.solutionUrl || startup.solution.problemUrl,
            },
            futurePlans: {
              heading: req.body.fheading || startup.futurePlans.heading,
              shortdescription: req.body.fshortdescription || startup.futurePlans.shortdescription,
              subheading: req.body.fsubheading || startup.futurePlans.subheading,
              body: req.body.fbody || startup.futurePlans.body,
              plansUrl: req.body.plansUrl || startup.futurePlans.plansUrl,
            },
            storybehind: {
              heading: req.body.sbheading || startup.storybehind.heading,
              shortdescription: req.body.sbshortdescription || startup.storybehind.shortdescription,
              subheading: req.body.sbsubheading || startup.storybehind.subheading,
              body: req.body.sbbody || startup.storybehind.body,
              storyUrl: req.body.storyUrl || startup.storybehind.storyUrl,
            }
          }
        })
          .exec()
          .then(result => {
            return res.status(200).json({message : "Startup details updated"})
          })
          .catch((err) => {
            console.log(err)
            res.status(500).json({
              message: err.toString(),
            })
          })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: err.toString(),
      })
    })
}

const addTeam = async (req, res, next) => {
  await startupdb.findOne({ _id: req.body.id })
    .exec()
    .then((startup) => {
      if (!startup) {
        res.status(409).json({
          message: "Startup not registered",
        })
      } else {
        const members = []
        req.body.team.forEach((element) => {
          members.push({
            name: element.name,
            designation: element.designation,
            photourl: element.photourl
          })
        })
        startupdb.updateOne({ _id: startup._id }, {
          $push: {
            team: {
              $each : members
            }
          }
        })
        .exec()
        .then(result => {
          return res.status(200).json({message : "Team updated"})
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({
            message: err.toString(),
          })
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: err.toString(),
      })
    })
}

const delTeam = async (req, res, next) => {
  await startupdb.findOne({ _id: req.body.id })
    .exec()
    .then((startup) => {
      if (!startup) {
        res.status(409).json({
          message: "Startup not registered",
        })
      } else {
        startupdb.updateOne({ _id: startup._id }, {
          $pull: {
            team: { _id: req.body.memberid}
          }
        })
        .exec()
        .then(result => {
          return res.status(200).json({message : "Team updated"})
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({
            message: err.toString(),
          })
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: err.toString(),
      })
    })
}

const addPinnedUpdates = async (req, res, next) => {
  await startupdb.findOne({ email: req.body.email })
    .exec()
    .then((startup) => {
      if (!startup) {
        res.status(409).json({
          message: "Startup not registered",
        })
      } else {
        startupdb.updateOne({ _id: startup._id }, {
          $push: {
            pinnedUpdates : {updateId : req.body.updateId} 
          }
        })
          .exec()
          .then(result => {
            return res.status(200).json({message : "Update pinned"})
          })
          .catch((err) => {
            console.log(err)
            res.status(500).json({
              message: err.toString(),
            })
          })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: err.toString(),
      })
    })
}

const delPinnedUpdates = async (req, res, next) => {
  await startupdb.findOne({ email: req.body.email })
    .exec()
    .then((startup) => {
      if (!startup) {
        res.status(409).json({
          message: "Startup not registered",
        })
      } else {
        startupdb.updateOne({ _id: startup._id }, {
          $pull: {
            pinnedUpdates : {updateId : req.body.updateId} 
          }
        })
          .exec()
          .then(result => {
            return res.status(200).json({message : "Update deleted"})
          })
          .catch((err) => {
            console.log(err)
            res.status(500).json({
              message: err.toString(),
            })
          })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: err.toString(),
      })
    })
}

module.exports = {
  startupEdit,
  addPinnedUpdates,
  delPinnedUpdates,
  addTeam,
  delTeam,
}
