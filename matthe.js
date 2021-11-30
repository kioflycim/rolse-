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
  console.log(`[ MATTHE ] bot başarıyla aktif edildi: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

require("./util/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`[ MATTHE ] ${files.length} adet komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`[ MATTHE ] yüklenen komut: ${props.help.name}`);
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

client.on("message", async message => {
    if(message.content.startsWith("!menu")) {
        if(message.author.bot) return;
        let secenek1 = new MessageMenuOption()
        .setLabel("Abone Ol")
        .setValue("ABONEOL")
        .setDescription("Kanalıma abone ol.")
        .setDefault()
        .setEmoji("🔴")
        let secenek2 = new MessageMenuOption()
        .setLabel("Like At")
        .setValue("LIKEAT")
        .setDescription("Videoya like at.")
        .setDefault()
        .setEmoji("🔵")
        let secenek3 = new MessageMenuOption()
        .setLabel("Bildirimleri Aç")
        .setValue("BILDIRIM")
        .setDescription("Kanalımın bildirimlerini aç.")
        .setDefault()
        .setEmoji("🟡")
        let secenek4 = new MessageMenuOption()
        .setLabel("Yorum Yap")
        .setValue("YORUMYAP")
        .setDescription("Videoya yorum yap.")
        .setDefault()
        .setEmoji("⚪")
        let secenek5 = new MessageMenuOption()
        .setLabel("Sen Kralsın")
        .setValue("KRALSIN")
        .setDescription("Kralsın krall <3")
        .setDefault()
        .setEmoji("👑")
        let menu = new MessageMenu()
        .setID("MENU")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Bana tıkla ve bişeye bas ._.")
        .addOption(secenek1)
        .addOption(secenek2)
        .addOption(secenek3)
        .addOption(secenek4)
        .addOption(secenek5)
        const embed = new MessageEmbed()
        .setTitle("Menü mü?!")
        .setDescription("Evet menü. Birini seç.")
        .setFooter("tanisalim mi")
        .setColor("BLUE")
        .setTimestamp()
        let menumesaj = await message.channel.send(embed, menu)
        function menuselection(menu) {
            switch(menu.values[0]) {
                case "ABONEOL":
                    menu.reply.send("Anaaa abone oldun mu, harika !!!", true)
                break;
                case "LIKEAT":
                    menu.reply.send("Layk şelalesiiiiiiiii", true)
                break;
                case "BILDIRIM":
                    menu.reply.send("Video yayınlanınca direk koş ha, anlamı kalmaz yoksa :P", true)
                break;
                case "YORUMYAP":
                    menu.reply.send("Yorumunu okicam, söz :D", true)
                break;
                case "KRALSIN":
                    menu.reply.send("Yalan yok, kralsın <3", true)
                break;
            }
        }
        client.on("clickMenu", menu => {
            if(menu.message.id == menumesaj.id) {
                if(menu.clicker.id == message.author.id) {
                    menuselection(menu)
                }else{
                    menu.reply.send("Menü sahibi değilsin.", true)
                }
            }
        })
    }
}) 


