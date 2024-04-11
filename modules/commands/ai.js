const axios = require('axios');

module.exports.config = {
  name: 'ai',
  version: '1.0.5',
  hasPermssion: 0,
  credits: 'Yan Maglinte',
  description: 'An AI command!',
  commandCategory: 'AI',
  usages: '[ask]',
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    api.setMessageReaction("⏳", event.messageID, () => {}, true);
    if (!args[0]) return api.sendMessage("Vui lòng nhập tin nhắn...", tid, mid);
    try {
        const res = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${content}`);
        const respond = res.data.response;
        api.setMessageReaction("", event.messageID, () => {}, true);
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("Đã xảy ra lỗi khi tìm nạp dữ liệu.", tid, mid);
    }
};