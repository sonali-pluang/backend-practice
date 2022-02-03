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

    channel.sendToQueue(QUEUE, Buffer.from("Message present in RabbitMQ"))
    console.log("message sent")
})

process.on ('exit', () =>{
    ch.close()
    console.log("clossing rabbitmq channel")
}) 