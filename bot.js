const TelegramBot = require('node-telegram-bot-api')
const BOT_TOKEN = "1074295711:AAGJeSbZLe9b0D6erBscgJokTfP2XrXzYtk"
const bot = new TelegramBot(BOT_TOKEN, { polling: true })
const commandList = [
    {
        cmd: '/help', desc: '查看机器人的使用说明', output() { return ''; }
    },
    {
        cmd: '/status', desc: '查看机器人的状态', output: '',
    },
    {
        cmd: '/create', desc: '创建一个对话', output: '',
    },
    {
        cmd: '/hello', desc: '和机器人打招呼', output: (message) => {
            return "你好," + message
        },
    }
]
commandList.forEach(commamd=>{
    const reg = new RegExp(commamd.cmd + "(.+)")
    bot.onText(reg, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message
      
        const chatId = msg.chat.id;
        const message = match[1]?match[1].trim():''; // the captured "whatever"
        const result = typeof(commamd.output) == 'function'?commamd.output.call(this,chatId,message,msg):commamd.output;
        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, result);
      });
})
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, '你的消息暂时无法处理:' + msg);
  });
module.exports = bot