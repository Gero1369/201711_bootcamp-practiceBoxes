const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')
const bodyParser = require('body-parser')
const path = require('path')
const register = require('babel-register')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

// Next, define the MongoDB connection string for the local database instance and the database name edx-course-db. Also apply middleware for logging and body parsing:
const url = 'mongodb://localhost:27017/nml'
let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

// app.set('views', __dirname + '/views')
// app.set('view engine', 'hbs')
// app.engine('hbs', require('express-react-views').createEngine())

var appContainer = require('./components/list.jsx')

app.get('/', function(req, res) {
  req.messages.find({}, {sort: {_id: -1}}).toArray(function(err, docs){
    if (err) return next(err)
    res.render('index', {
      data: ReactDOMServer.renderToString(appContainer(<List {messages: docs}></List>)),
      props: `<script type="text/javascript">var messages=${JSON.stringify(docs)}</script>`
    })
  })

    // let servMessages = { data: messages }
    // let html = ReactDOMServer.renderToString(
    //     React.createElement(appContainer)
    // );
    res.send(html);
});

  app.use(express.static( path.join(__dirname,'public')))

// app.get('/', (req, res, next) => {
//   db.collection('messages')
//     .find({}, {sort: {_id: -1}})
//     .toArray((error, messages) => {
//       if (error) return next(error)
//       res.send(messages)
//   })
// })

mongodb.MongoClient.connect(url, (error, db) => {
  if (error) {
    console.log('error with DB: '+error)
    return process.exit(1)
  }

  app.get('/messages', (req, res, next) => {
    db.collection('messages')
      .find({}, {sort: {_id: -1}})
      .toArray((error, messages) => {
        if (error) return next(error)
        res.send(messages)
    })
  })

  app.post('/messages', (req, res, next) => {
    let newMessage = req.body
//         console.log(`************************
//           lets try to name: ${req.body.name}
//           body.text: ${req.body.text}
// ********************************`)
    db.collection('messages').insert(newMessage, (error, results) => {
      if (error) return next(error)
      res.send(results)
    })
  })

  // app.put('/messages/:id', (req, res, next) => {
  //   // if (!isValid(req.body)) return next(new Error('not valid body'))
  //   db.collection('messages')
  //     .update({_id: mongodb.ObjectID( req.params.id)}, {$set: req.body}, (error, results) => {
  //   if (error) return next(error)
  //   res.send(results)
  //  })
  // })

//   In DELETE, use URL parameter for the ID again. This time, the MongoDB method is remove but it also takes the URL parameter ID wrapped in mongodb.ObjectID for proper object type in the query.
app.delete('/messages/:id', (req, res, next) => {
  db.collection('messages').remove({_id:mongodb.ObjectID( req.params.id )}, (error, results) => {
    if (error) return next(error)
  res.send(results)
 })
})
  
app.use(errorhandler())
app.listen(3000, ()=> console.log('server is running'))
//   app.listen(3000, () => {
//     console.log(`server is running`)
//  })
})