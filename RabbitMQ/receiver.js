import amqp from "amqplib/callback_api.js"

let ch = null
const CONN_URL = "amqp://localhost"
amqp.connect(CONN_URL, (err, connection)=>{
    if(err)
        throw err

    connection.createChannel((err, channel) => {
        if(err) throw err;
        ch = channel

        const QUEUE = "test"
        ch.assertQueue(QUEUE)
    
        ch.consume(QUEUE, (msg) =>{
            console.log(`message received ${msg.content}`)
        }, {
            noAck: true
        })
    })

})