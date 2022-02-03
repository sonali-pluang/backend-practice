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

        ch.sendToQueue(QUEUE, Buffer.from("Data in RabbitMQ"))
        console.log("message sent")
    })
})

process.on ('exit', () =>{
    ch.close()
    console.log("clossing rabbitmq channel")
}) 