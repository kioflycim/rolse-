const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
const matthe = require('discord-buttons')
matthe(client)

var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

require("./util/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.login(process.env.token);

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


client.on("message", (message) => {

  if (message.content !== "!button" || message.author.id === "796263552771817472" || message.author.bot) return;
  
  let Vk = new matthe.MessageButton()
    .setStyle('red') // Rengi ayarlayabilirsiniz.
    .setLabel('Normal Codes') // Adını Değiştirebilirsiniz.
    .setID('V/K'); // Elleme Bunu

  let Dc = new matthe.MessageButton()
    .setStyle('green') // Rengi ayarlayabilirsiniz.
    .setLabel('Club Announcement') // Adını Değiştirebilirsiniz.
    .setID('D/C'); // Elleme Bunu
  
  let Gartic = new matthe.MessageButton()
    .setStyle("blurple") // Rengi ayarlayabilirsiniz.
    .setLabel('Discord Updates') // Adını Değiştirebilirsiniz.
    .setID('Gartic'); // Elleme Bunu
  
  message.channel.send(`
  <:tac:830580890097680464> **Selam, Sunucumuzdaki "Kod & Duyuru" Rollerini Almak İçin Butonlara Tıklamanız Yeterlidir.**
  **__ROLLER__**;
  \`>\`  **Sahip olmak için butona tıkla.**
  \`>\` <@&868629974008074250> **Sahip olmak için 3 davet yapmalısın.**
  \`>\` <@&868630077540282409> **Sahip olmak için 5 davet yapmalısın.**
  \`>\` <@&868630730786373702> **Sahip olmak için 7 davet yapmalısın.**
  \`>\` <@&868645220944863283> **Sahip olmak için 10 davet yapmalısın.**
  \`>\`  **Sahip olmak için butona tıkla.**
  \`>\`  **Sahip olmak için butona tıkla.**
  `, { 
    buttons: [ Vk, Dc, Gartic]
});
});
  
client.on('clickButton', async (button) => {
  // V/K
    if (button.id === 'V/K') {
        if (button.clicker.member.roles.cache.get("882964627716210730")) {
            await button.clicker.member.roles.remove("882964627716210730")
            await button.reply.think(true);
            await button.reply.edit("Normal Codes Rolü Üzerinizden Alındı!")
        } else {
            await button.clicker.member.roles.add("882964627716210730")
            await button.reply.think(true);
            await button.reply.edit("Normal Codes Üzerinize Verildi!")
        }
    }

  // D/C
    if (button.id === 'D/C') {
        if (button.clicker.member.roles.cache.get("882964627716210730")) {
            await button.clicker.member.roles.remove("882964627716210730")
            await button.reply.think(true);
            await button.reply.edit(`Club Announcement Üzerinizden Alındı!`)
        } else {
            await button.clicker.member.roles.add("")
            await button.reply.think(true);
            await button.reply.edit(`Club Announcement Rolü Üzerinize Verildi!`)
        }

    }
  // GARTIC
    if (button.id === 'Gartic') {
        if (button.clicker.member.roles.cache.get("cfg.roles.gartic")) {
            await button.clicker.member.roles.remove("cfg.roles.gartic")
            await button.reply.think(true)
            await button.reply.edit(`Discord Updates Rolü Üzerinizden Alındı!`)
        } else {
            await button.clicker.member.roles.add("cfg.roles.gartic")
            await button.reply.think(true);
            await button.reply.edit("Discord Updates Rolü Üzerinize Verildi!")
        }
    }
});