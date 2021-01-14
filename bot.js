const Discord = require("discord.js");
const client = new Discord.Client();
const Client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const token = ayarlar.token
const fs = require('fs')

client.on('ready', () => {
  console.log(`${client.user.tag} İsmiyle Giriş Yapıldı!`);
})

Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    Client.commands.set(cmd.help.name, cmd);
    console.log(`Yüklenen Komut: ${cmdFileName}`);
    if (cmd.help.aliases) {
      cmd.help.aliases.forEach(alias => {
        Client.aliases.set(alias, cmd.help.name);
      });
    };
  });
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`${eventName} is loaded for events.`);
    Client.on(eventName, event.bind(null, Client));
  });
});

client.login(token)