const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const token = ayarlar.token

client.on('ready', () => {
  console.log(`${client.user.tag} İsmiyle Giriş Yapıldı!`);
})

client.login(token)