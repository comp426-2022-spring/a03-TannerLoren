const express = require('express')
const app = express()

const min = require('minimist')
const args = min(process.argv.slice(2))

args['port']
const port = args.port || 5000

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/', (req, res) => {
    let flip = coinFlip()
    res.statusCode = 200
    res.json({ 'flip': flip })
})

app.get('/app/flips/:number', (req, res) => {
    let flips = coinFlips(req.params.number)
    let total = countFlips(flips)
    res.statusCode = 200
    res.json({ 'raw': flips, 'summary': total })
})

app.get('/app/flip/call/heads', (req, res) => {
    let heads = flipACoin('heads')
    res.statusCode = 200
    res.json(heads)
})

app.get('/app/flip/call/tails', (req, res) => {
    let tails = flipACoin('tails')
    res.statusCode = 200
    res.json(tails)
})

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

