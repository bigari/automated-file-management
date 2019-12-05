const WebSocket = require('ws')
const sendHttp = require('./http')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    console.log(`Received message => ${message}`)
    const messageJson = JSON.parse(message)
    const res = await sendHttp(messageJson)
    if (res) {
        ws.send(
            JSON.stringify({
                url: messageJson.url,
                verb: messageJson.verb,
                data: res
            })
        )
    }

  })
  ws.send('ho!')
})