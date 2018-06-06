const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const log = console.log
var port = process.env.PORT || 4000

// Body parser: https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// CORS on ExpressJS: https://github.com/expressjs/cors
app.use(cors())
// Cookie parser: https://github.com/expressjs/cookie-parser
app.use(cookieParser())

// For fontend route
var frontendDir = path.join(path.dirname(path.dirname(__dirname)), 'frontend')
app.use('/home', express.static(path.join(frontendDir, 'build')))
app.get('/home', function(req, res) {
  res.sendFile(path.join(frontendDir, 'build', 'index.html'))
})
app.get('/', function(req, res) {
  res.redirect('/home')
})

app.listen(port, function() {
  log('Server listening at port %d', port)
})

import Data from './data'
let db: Data = new Data()
let filters: any = {}
/**
 * Greeting
 */
import Greeting from './greeting/'
app.post('/webhook', (req: any, res: any) => {
  try {
    let form = req.body.queryResult
    let session = req.body.session
    if (!filters.hasOwnProperty(session)) {
      filters[session] = {}
    }

    let intent = form.intent
    if (intent.displayName == 'floor') {
      let floor = form.parameters.number
      filters[session].floor = floor

      db.checkFilterAndGetResult(filters[session], res)
    } else if (intent.displayName == 'budget') {
      let budget = form.parameters.budget
      filters[session].price = db.getPriceIndex(budget)

      db.checkFilterAndGetResult(filters[session], res)
    } else if (intent.displayName == 'direction') {
      let direction = form.parameters.direction
      filters[session].direction = direction

      db.checkFilterAndGetResult(filters[session], res)
    } else if (intent.displayName == 'reset') {
      filters[session] = {}
      db.checkFilterAndGetResult(filters[session], res)
    } else if (intent.displayName == 'decision') {
      filters[session] = {}
      let apartment = db.getRoomInfo(form.parameters.apartment)

      if (apartment == null) {
        db.checkFilterAndGetResult(filters[session], res, true)
      } else {
        let card: any = {
          title: `Bạn vừa chọn căn hộ ${apartment.id}. Bạn chắc chứ?`,
          subtitle: `Căn hộ ${apartment.id}, giá: ${apartment.price}, hướng ${apartment.direction}`,
          imageUri: apartment.img,
          buttons: [
            {
              text: 'Tôi chắc chắn'
            },
            {
              text: 'Tôi muốn chọn lại'
            }
          ]
        }

        let fulfillmentMessages = []
        fulfillmentMessages.push({
          card: card
        })
        res.json({ fulfillmentMessages })
      }
    } else {
      filters[session] = {}
      new Greeting().initConversation(db).then(output => {
        res.json(output)
      })
    }
  } catch (error) {
    console.error(error)
  }
})
