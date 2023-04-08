const express = require('express')
const Moment = require('moment')

const PORT = process.env.APP_PORT || 8080

const app = express()

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use((req, res, next) => {
    console.log('Time : ', Moment().format("DD-MM-yyyy hh:mm:ss"))
    console.log('Request type : ', req.method)
    console.log('Request URL : ', req.originalUrl)
    console.log('Request Body : ', req.body)
    console.log('Request Query : ', req.query)
    next()
})

app.get('/', (req, res) => {
    res.send("tes")
})

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})