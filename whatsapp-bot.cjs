const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer');

async function startBot() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // 🚀 Add these options
    });

    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] } // 🚀 Add to WhatsApp Web client
    });

    client.on('qr', qr => {
        console.log('Scan this QR code using WhatsApp Web on your phone:');
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('✅ WhatsApp Bot is running!');
    });

    client.on('message', async message => {
        let sender = await message.getContact();
        let senderName = sender.pushname || "Dear";
        let replyMessage = `Hello ${senderName}, thanks for sending a message. Please wait until I reply. Thanks!`;
        await message.reply(replyMessage);
    });

    client.initialize();
}

startBot();
