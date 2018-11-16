const {success, error, checkAndChange} = require('./assets/function')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const config = require('./assets/config.json')

const mysql = require('promise-mysql')

mysql.createConnection({
    host : config.db.host,
    user : config.db.user,
    password : config.db.password,
    database : config.db.database

}).then((db) => {
      console.log('Connected')

      const app = express()

      let MenberRouter = express.Router()

      let Menbers = require('./assets/classes/members-class')(db, config)
      
      
      app.use(morgan('dev'))
      app.use(bodyParser.json()) // for parsing application/json
      app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
      
      
      MenberRouter.route('/:id')
      
            .get(async (req, res) => {
                  let menber = await Menbers.getById(req.params.id)
                  res.json(checkAndChange(menber))
            })
      
            .put(async (req, res) => {
      
                 let updateMenber = await Menbers.update(req.params.id, req.body.name)
                 res.json(checkAndChange(updateMenber))
            })
      
            .delete(async (req, res) => {
      
                  let deleteMenber = await Menbers.delete(req.params.id)
                  res.json(checkAndChange(deleteMenber))
            })
      
      MenberRouter.route('/')
      
            .get(async (req, res) => {
                  let allMenber = await Menbers.getAll(req.query.max)
                  res.json(checkAndChange(allMenber))
            })
      
            .post(async (req, res) => {
                  let addMenber = await Menbers.add(req.body.name)
                  res.json(checkAndChange(addMenber))
            })
      
      
      app.use(config.rootApi + '/members', MenberRouter)
      
      app.listen(config.port, () => console.log('Started on port 8081'))
}).catch((err) => {
      console.log('error during database')
      console.log(err.message)
})
