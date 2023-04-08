const express = require('express')

const PORT = process.env.APP_PORT || 8080

const app = express()

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

app.get('/', (req, res) => {
    res.send("tes")
})

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})