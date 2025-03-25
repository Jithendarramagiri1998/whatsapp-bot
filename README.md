# WhatsApp Auto-Reply Bot on AWS EC2 (Amazon Linux)

This guide covers setting up a WhatsApp auto-reply bot using Node.js and `whatsapp-web.js` on an AWS EC2 instance running Amazon Linux.

## Prerequisites
- AWS EC2 instance with Amazon Linux
- Node.js and npm installed
- Git installed
- WhatsApp account

## Step 1: Update and Install Required Packages
```sh
sudo yum update -y
sudo yum install -y git
```

## Step 2: Install Node.js and npm
```sh
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
```

## Step 3: Clone the Bot Repository
```sh
git clone https://github.com/your-repo/whatsapp-bot.git
cd whatsapp-bot
```

## Step 4: Install Dependencies
```sh
npm install
```

## Step 5: Run the Bot
```sh
node whatsapp-bot.js
```

### Expected Output
- A QR code will be displayed in the terminal.
- Scan the QR code using WhatsApp Web on your phone.
- Once scanned, you will see a message: **"WhatsApp Bot is running!"**
- The bot will auto-reply to incoming messages with: **"Hello [Name], thanks for sending a message. Please wait until I reply. Thanks!"**

---

## Common Errors and Solutions

### 1. `ReferenceError: require is not defined in ES module scope`
**Solution:**
- Ensure `package.json` includes:
  ```json
  {
    "type": "commonjs"
  }
  ```
- Rename the bot file to `.cjs`:  
  ```sh
  mv whatsapp-bot.js whatsapp-bot.cjs
  node whatsapp-bot.cjs
  ```

### 2. `Error: Running as root without --no-sandbox is not supported`
**Solution:**
Run Puppeteer with `--no-sandbox`:
```js
const client = new Client({
  puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});
```

### 3. `Error: An 'executablePath' or 'channel' must be specified for 'puppeteer-core'`
**Solution:**
Install the full version of Puppeteer:
```sh
npm install puppeteer
```

### 4. `Cannot find module 'whatsapp-web.js'`
**Solution:**
Ensure dependencies are installed:
```sh
npm install
```

---

## Step 6: Keep the Bot Running (Even After Closing the Terminal)
By default, the bot stops when you close the SSH session. To keep it running:

### Option 1: Use `nohup` (Simple Method)
```sh
nohup node whatsapp-bot.cjs &
```

### Option 2: Use `PM2` (Recommended)
PM2 is a process manager that keeps the bot running even after reboots.

1️⃣ Install PM2:
```sh
npm install -g pm2
```

2️⃣ Start the Bot with PM2:
```sh
pm2 start whatsapp-bot.cjs --name whatsapp-bot
```

3️⃣ Ensure the Bot Restarts Automatically:
```sh
pm2 save
pm2 startup
```
✅ Now, the bot runs **24/7** on your EC2 instance!

---

## Step 7: Stop the Bot (If Needed)
To stop the bot, use:
```sh
pm2 stop whatsapp-bot
pm2 delete whatsapp-bot
```

🎯 **Congratulations! Your WhatsApp Auto-Reply Bot is Now Running on AWS EC2!** 🚀
