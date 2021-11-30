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
    if(message.content.startsWith(".frenk")) {
        if(message.author.bot) return;
        let secenek1 = new MessageMenuOption()
        .setLabel("Kırmızı")
        .setValue("kırmızı")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍒") 
        let secenek2 = new MessageMenuOption()
        .setLabel("Sarı")
        .setValue("sarı")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍋")
        let secenek3 = new MessageMenuOption()
        .setLabel("Mor")
        .setValue("mor")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍇")
        let secenek4 = new MessageMenuOption()
        .setLabel("Yeşil")
        .setValue("yeşil")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍏")
        let secenek7 = new MessageMenuOption()
        .setLabel("Turuncu")
        .setValue("turuncu")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🥕")
        let secenek6 = new MessageMenuOption()
        .setLabel("Mavi")
        .setValue("mavi")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🧊")
        let secenek10 = new MessageMenuOption()
        .setLabel("temizle")
        .setValue("temizle")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("885886965495504896")
        let menu = new MessageMenu()
        .setID("MENU")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Renk Rollerini Seçebilirsiniz")
        .addOption(secenek1)
        .addOption(secenek2)
        .addOption(secenek3)
        .addOption(secenek4)
        .addOption(secenek7)
        .addOption(secenek6)
        .addOption(secenek10)
        let menumesaj = await message.channel.send("Aşağıdaki menüye tıklayarak Renk Rollerini seçebilirsin!", menu)
        function menuselection(menu) {
            switch(menu.values[0]) {
                case "kırmızı":
                    menu.reply.send("<@&911583985811988501> Rolü verildi", true)
                    menu.clicker.member.roles.add("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584036386906153")
                    menu.clicker.member.roles.remove("911584760579645471")
                break;
                case "sarı":
                    menu.reply.send("<@&911584008859705364> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584008859705364") 
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584036386906153")
                    menu.clicker.member.roles.remove("911584760579645471")
                break;
                case "mor":
                    menu.reply.send("<@&911584013569892392> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584013569892392")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584036386906153")
                    menu.clicker.member.roles.remove("911584760579645471")
                break;
                case "yeşil":
                    menu.reply.send("<@&911584028426129458> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584028426129458")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584036386906153")
                    menu.clicker.member.roles.remove("911584760579645471")
                break;
                case "turuncu":
                    menu.reply.send("<@&911584036386906153> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584036386906153")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584760579645471")
                break;
                case "mavi":
                    menu.reply.send("<@&911584760579645471> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584760579645471")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584036386906153")
                break;
                case "temizle":
                  menu.reply.send("Roller alındı", true)
                  menu.clicker.member.roles.remove("911583985811988501")
                  menu.clicker.member.roles.remove("911584008859705364")
                  menu.clicker.member.roles.remove("911584013569892392")
                  menu.clicker.member.roles.remove("911584028426129458")
                  menu.clicker.member.roles.remove("911584036386906153")
                  menu.clicker.member.roles.remove("911584760579645471")
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


