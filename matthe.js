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


const dbuttons = require("discord-buttons");
const { MessageMenu, MessageMenuOption } = require("discord-buttons")
client.on("message", async message => {
    if(message.content.startsWith(".renk")) {
        if(message.author.bot) return;
        let secenek1 = new MessageMenuOption()
        .setLabel("Kırmızı")
        .setValue("kırmızı")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍒") 
        let secenek2 = new MessageMenuOption()
        .setLabel("Mor")
        .setValue("mor")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍇")
        let secenek3 = new MessageMenuOption()
        .setLabel("Sarı")
        .setValue("Sarı")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍋")
        let secenek4 = new MessageMenuOption()
        .setLabel("Açık Pembe")
        .setValue("açık Pembe")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🌸")
        let secenek5 = new MessageMenuOption()
        .setLabel("Koyu Pembe")
        .setValue("koyu pembe")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🌷")
        let secenek6 = new MessageMenuOption()
        .setLabel("Mavi")
        .setValue("mavi")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🧊")
        let secenek7 = new MessageMenuOption()
        .setLabel("Açık Mavi")
        .setValue("açık mavi")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🎐")
        let secenek8 = new MessageMenuOption()
        .setLabel("Yeşili")
        .setValue("yeşili")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍏")
        let secenek9 = new MessageMenuOption()
        .setLabel("Su yeşili")
        .setValue("Su yeşili")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍈")
        let secenek10 = new MessageMenuOption()
        .setLabel("Siyah")
        .setValue("siyah")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🖤")
        let secenek11 = new MessageMenuOption()
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
        .addOption(secenek5)
        .addOption(secenek6)
        .addOption(secenek7)
        .addOption(secenek8)
        .addOption(secenek9)
        .addOption(secenek10)
        .addOption(secenek11)
        let menumesaj = await message.channel.send("Aşağıdaki menüye tıklayarak Renk Rollerini seçebilirsin!", menu)
        function menuselection(menu) {
          switch(menu.values[0]) {
                case "kırmızı":
                    menu.reply.send("<@&884123850944688169> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123850944688169")
                    menu.clicker.member.roles.remove("884123855919136778")
                    menu.clicker.member.roles.remove("884123857366188093") 
                    menu.clicker.member.roles.remove("884123856690905158")
                    menu.clicker.member.roles.remove ("885265772430110760")  
                    menu.clicker.member.roles.remove ("884123855164166245")
                    menu.clicker.member.roles.remove ("884123851930345493")
                    menu.clicker.member.roles.remove ("884123852819533925")
                    menu.clicker.member.roles.remove("884123853515800606")
                     break;
                case "mor":
                    menu.reply.send("<@&884123855919136778> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123855919136778")
                    menu.clicker.member.roles.remove("884123855164166245")
                    menu.clicker.member.roles.remove("884123857366188093") 
                    menu.clicker.member.roles.remove("884123856690905158")
                    menu.clicker.member.roles.remove ("885265772430110760")  
                    menu.clicker.member.roles.remove ("884123850944688169")
                    menu.clicker.member.roles.remove ("884123851930345493")
                    menu.clicker.member.roles.remove ("884123852819533925")
                    menu.clicker.member.roles.remove("884123853515800606")
                break;
                case "Sarı":
                    menu.reply.send("<@&884123857366188093> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123857366188093")
                    menu.clicker.member.roles.remove("884123855164166245")
                    menu.clicker.member.roles.remove("884123855919136778")
                    menu.clicker.member.roles.remove("884123856690905158")
                    menu.clicker.member.roles.remove ("885265772430110760")  
                    menu.clicker.member.roles.remove ("884123850944688169")
                    menu.clicker.member.roles.remove ("884123851930345493")
                    menu.clicker.member.roles.remove ("884123852819533925")
                    menu.clicker.member.roles.remove("884123853515800606")
                break;
                case "Koyu Pembe":
                  menu.reply.send("<@&884123856690905158> Rolü verildi", true)
                  menu.clicker.member.roles.add("884123856690905158")
                  menu.clicker.member.roles.remove("884123855164166245")
                  menu.clicker.member.roles.remove("884123855919136778")
                  menu.clicker.member.roles.remove("884123857366188093")
                  menu.clicker.member.roles.remove ("885265772430110760")  
                  menu.clicker.member.roles.remove ("884123850944688169")
                  menu.clicker.member.roles.remove ("884123851930345493")
                  menu.clicker.member.roles.remove ("884123852819533925")
                  menu.clicker.member.roles.remove("884123853515800606")
                break;
                case "Mavi":
                    menu.reply.send("<@&885265772430110760> Rolü verildi", true)
                    menu.clicker.member.roles.add("885265772430110760")
                    menu.clicker.member.roles.remove("884123855164166245")
                    menu.clicker.member.roles.remove("884123855919136778") 
                    menu.clicker.member.roles.remove("884123857366188093")
                    menu.clicker.member.roles.remove("884123856690905158")
                    menu.clicker.member.roles.remove ("884123850944688169")
                    menu.clicker.member.roles.remove ("884123851930345493")
                    menu.clicker.member.roles.remove ("884123852819533925")
                    menu.clicker.member.roles.remove("884123853515800606")
                break;
                case "Açık Mavi":
                    menu.reply.send("<@&884123850944688169> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123850944688169")
                    menu.clicker.member.roles.remove("884123855164166245")
                    menu.clicker.member.roles.remove("884123855919136778") 
                    menu.clicker.member.roles.remove("884123857366188093") 
                menu.clicker.member.roles.remove("884123856690905158")
menu.clicker.member.roles.remove ("885265772430110760")  
menu.clicker.member.roles.remove ("884123851930345493")
menu.clicker.member.roles.remove ("884123852819533925")
menu.clicker.member.roles.remove("884123853515800606")
                break;
           case "Yeşil":
                  menu.reply.send("<@&884123851930345493> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123851930345493")
menu.clicker.member.roles.remove("884123855164166245")
menu.clicker.member.roles.remove("884123855919136778") 
              menu.clicker.member.roles.remove("884123857366188093") 
              menu.clicker.member.roles.remove("884123856690905158")
menu.clicker.member.roles.remove ("885265772430110760")  
menu.clicker.member.roles.remove ("884123850944688169")
menu.clicker.member.roles.remove ("884123852819533925")
menu.clicker.member.roles.remove("884123853515800606")
           break;
           case "Su Yeşili":
                  menu.reply.send("<@&884123852819533925> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123852819533925")
                    menu.clicker.member.roles.remove("884123855164166245")
                    menu.clicker.member.roles.remove("884123855919136778")
                    menu.clicker.member.roles.remove("884123857366188093") 
                    menu.clicker.member.roles.remove("884123856690905158")
                    menu.clicker.member.roles.remove ("885265772430110760")  
                    menu.clicker.member.roles.remove ("884123850944688169")
                    menu.clicker.member.roles.remove ("884123851930345493")
                    menu.clicker.member.roles.remove("884123853515800606")
break;
           case "Siyah":
                  menu.reply.send("<@&885265772430110760> Rolü verildi", true)
                    menu.clicker.member.roles.add("885265772430110760")
menu.clicker.member.roles.remove("884123855164166245")
menu.clicker.member.roles.remove("884123855919136778") 
              menu.clicker.member.roles.remove("884123857366188093") 
              menu.clicker.member.roles.remove("884123856690905158")
menu.clicker.member.roles.remove ("")  
menu.clicker.member.roles.remove ("884123850944688169")
menu.clicker.member.roles.remove ("884123851930345493")
menu.clicker.member.roles.remove ("884123852819533925")

break;
                case "temizle":
                  menu.reply.send("Roller alındı", true)
menu.clicker.member.roles.remove("884123855164166245")
menu.clicker.member.roles.remove("884123855919136778")
              menu.clicker.member.roles.remove("884123857366188093")
              menu.clicker.member.roles.remove("884123856690905158")
menu.clicker.member.roles.remove ("885265772430110760")  
menu.clicker.member.roles.remove ("884123850944688169")
menu.clicker.member.roles.remove ("884123851930345493")
menu.clicker.member.roles.remove ("884123852819533925")
menu.clicker.member.roles.remove("884123853515800606")
            }
        }
        client.on("clickMenu", menu => {
            if(menu.message.id == menumesaj.id) {
                    menuselection(menu)
            }
        })
    }
});

client.on("message", async message => {
    if(message.content.startsWith(".burç")) {
        if(message.author.bot) return;
        let secenek1 = new MessageMenuOption()
        .setLabel("Koç")
        .setValue("koç")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♈") 
        let secenek2 = new MessageMenuOption()
        .setLabel("Boğa")
        .setValue("boğa")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♉")
        let secenek3 = new MessageMenuOption()
        .setLabel("İkizler")
        .setValue("ikizler")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♊")
        let secenek4 = new MessageMenuOption()
        .setLabel("Yengeç")
        .setValue("yengeç")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍏")
        let secenek5 = new MessageMenuOption()
        .setLabel("Aslan")
        .setValue("aslan")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♌")
         let secenek6 = new MessageMenuOption()
        .setLabel("Başak")
        .setValue("başak")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♍")
        let secenek7 = new MessageMenuOption()
        .setLabel("Terazi")
        .setValue("terazi")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♎")
        let secenek8 = new MessageMenuOption()
        .setLabel("Akrep")
        .setValue("akrep")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♏")
         let secenek9 = new MessageMenuOption()
        .setLabel("Yay")
        .setValue("yay")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♐")
         let secenek10 = new MessageMenuOption()
        .setLabel("Oğlak")
        .setValue("oğlak")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♑")
         let secenek11 = new MessageMenuOption()
        .setLabel("Kova")
        .setValue("kova")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♒")
        let secenek12 = new MessageMenuOption()
        .setLabel("Balık")
        .setValue("balık")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♓")
        let secenek13 = new MessageMenuOption()
        .setLabel("temizle")
        .setValue("temizle")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🗑️")
        let menu = new MessageMenu()
        .setID("MENU")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Renk Rollerini Seçebilirsiniz")
        .addOption(secenek1)
        .addOption(secenek2)
        .addOption(secenek3)
        .addOption(secenek4)
        .addOption(secenek5)
        .addOption(secenek6)
        .addOption(secenek7)
        .addOption(secenek8)
        .addOption(secenek9)
        .addOption(secenek10)
        .addOption(secenek11)
        .addOption(secenek12)
        .addOption(secenek13)
        let menumesaj = await message.channel.send("Aşağıdaki menüye tıklayarak Burç Rollerini seçebilirsin!", menu)
        function menuselection(menu) {
            switch(menu.values[0]) {
                case "koç":
                    menu.reply.send("<@&810934535435976754> Rolü verildi", true)
                    menu.clicker.member.roles.add("810934535435976754")
                    menu.clicker.member.roles.remove("810842301919920181")
                    menu.clicker.member.roles.remove("810919779460186153")
                    menu.clicker.member.roles.remove("810846156791218177")
                    menu.clicker.member.roles.remove("810930370988081192")
                    menu.clicker.member.roles.remove("810934587307196517")
                break;
                case "boğa":
                    menu.reply.send("<@&810934587307196517> Rolü verildi", true)
                    menu.clicker.member.roles.add("810934587307196517") 
                    menu.clicker.member.roles.remove("810934535435976754")
                    menu.clicker.member.roles.remove("810842301919920181")
                    menu.clicker.member.roles.remove("810919779460186153")
                    menu.clicker.member.roles.remove("816656564756676628")
                    menu.clicker.member.roles.remove("810930370988081192")
                break;
                case "ikizler":
                    menu.reply.send("<@&810842301919920181> Rolü verildi", true)
                    menu.clicker.member.roles.add("810842301919920181")
                    menu.clicker.member.roles.remove("810934535435976754")
                    menu.clicker.member.roles.remove("810934587307196517")
                    menu.clicker.member.roles.remove("810919779460186153")
                    menu.clicker.member.roles.remove("816656564756676628")
                    menu.clicker.member.roles.remove("810930370988081192")
                break;
                case "yengeç":
                    menu.reply.send("<@&810930370988081192> Rolü verildi", true)
                    menu.clicker.member.roles.add("810930370988081192")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584036386906153")
                    menu.clicker.member.roles.remove("911584760579645471")
                break;
                case "aslan":
                    menu.reply.send("<@&911584036386906153> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584036386906153")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584760579645471")
                break;
                case "başak":
                    menu.reply.send("<@&911584760579645471> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584760579645471")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584036386906153")
                break;
              case "terazi":
                    menu.reply.send("<@&911584760579645471> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584760579645471")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584036386906153")
                break;
                case "akrep":
                    menu.reply.send("<@&911584760579645471> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584760579645471")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584036386906153")
                break;
                case "yay":
                    menu.reply.send("<@&911584760579645471> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584760579645471")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584036386906153")
                break;
                case "oğlak":
                    menu.reply.send("<@&911584760579645471> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584760579645471")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584036386906153")
                break;
                case "kova":
                    menu.reply.send("<@&911584760579645471> Rolü verildi", true)
                    menu.clicker.member.roles.add("911584760579645471")
                    menu.clicker.member.roles.remove("911583985811988501")
                    menu.clicker.member.roles.remove("911584008859705364")
                    menu.clicker.member.roles.remove("911584013569892392")
                    menu.clicker.member.roles.remove("911584028426129458")
                    menu.clicker.member.roles.remove("911584036386906153")
                break;
                case "balık":
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
                    menuselection(menu)
            }
        })
    }
});