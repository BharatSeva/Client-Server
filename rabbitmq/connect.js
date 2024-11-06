const amqp = require('amqplib');

let channel, connection;
const APPOINTMENT_QUEUE = 'appointments_queue';
const LOGIN_QUEUE = 'logs'

const connectRabbitMQ = async (rabbitmqURL) => {
    try {
        connection = await amqp.connect(rabbitmqURL);
        channel = await connection.createChannel();
        await channel.assertQueue(APPOINTMENT_QUEUE, { durable: true });
        await channel.assertQueue(LOGIN_QUEUE, { durable: false });
        console.log(`Connected to RabbitMQ`);
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        process.exit(1);
    }
};

module.exports = {
    connectRabbitMQ,
    channel: () => channel,
    connection: () => connection,
};
