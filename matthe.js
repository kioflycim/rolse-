const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
const matthe = require("discord-buttons");
matthe(client);

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
const { MessageMenu, MessageMenuOption } = require("discord-buttons");
//////////////////////////////// RENKLER ////////////////////////////////

      }
    }
    client.on("clickMenu", menu => {
      if (menu.message.id == menumesaj.id) {
        menuselection(menu);
      }
    });
  }
});

/////////Çekiliş Partner

client.on("message", async message => {
  if (message.content.startsWith(".sddddpc")) {
    if (message.author.bot) return;
    let secenek1 = new MessageMenuOption()
      .setLabel("Çekiliş Katılımcısı")
      .setValue("cekilis")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("888444684622499922");
    let secenek2 = new MessageMenuOption()
      .setLabel("Partner Görme")
      .setValue("partner")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("915269762718777424");
    let secenek3 = new MessageMenuOption()
      .setLabel("temizle")
      .setValue("temizle")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("885886965495504896");
    let menu = new MessageMenu()
      .setID("MENU")
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder("İstediğiniz Rollerini Seçebilirsiniz")
      .addOption(secenek1)
      .addOption(secenek2)
      .addOption(secenek3);
    let menumesaj = await message.channel.send(
      "Menüye tıklayarak Çekiliş Katılımcısı ve Partner Görme Rollerini alabilirsiniz!",
      menu
    );
    function menuselection(menu) {
      switch (menu.values[0]) {
        case "cekilis":
          menu.reply.send("<@&918591506099609640> Rolü verildi", true);
          menu.clicker.member.roles.add("918591506099609640");
          menu.clicker.member.roles.remove("918591506892333056");
          break;
        case "partner":
          menu.reply.send("<@&918591506892333056> Rolü verildi", true);
          menu.clicker.member.roles.add("918591506892333056");
          menu.clicker.member.roles.remove("918591506099609640");
          break;
        case "temizle":
          menu.reply.send("Roller alındı", true);
          menu.clicker.member.roles.remove("918591506099609640");
          menu.clicker.member.roles.remove("918591506892333056");
      }
    }
    client.on("clickMenu", menu => {
      if (menu.message.id == menumesaj.id) {
        menuselection(menu);
      }
    });
  }
});


      }
    }
    client.on("clickMenu", menu => {
      if (menu.message.id == menumesaj.id) {
        menuselection(menu);
      }
    });
  }
});


      }
    }
    client.on("clickMenu", menu => {
      if (menu.message.id == menumesaj.id) {
        menuselection(menu);
      }
    });
  }
});
