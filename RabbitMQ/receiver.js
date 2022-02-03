import amqp from "amqplib/callback_api.js"

let ch = null
const CONN_URL = "http://localhost:15672/"
amqp.connect(CONN_URL, (err, connection)=>{
    if(err)
        throw err

    connection.createChannel((err, channel) => {
        if(err) throw err;
    })

    const QUEUE = "test"
    channel.assertQueue(QUEUE)

    channel.consume(QUEUE, (msg) =>{
        console.log(`message received ${msg.content}`)
    })

})