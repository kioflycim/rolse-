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
};const Discord = require("discord.js");
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
          menu.reply.send("<@&920405872457416754> Rolü verildi", true);

          menu.clicker.member.roles.add("920405872457416754");

          menu.clicker.member.roles.remove("920405873057222747");

          break;

        case "partner":
          menu.reply.send("<@&920405873057222747> Rolü verildi", true);

          menu.clicker.member.roles.add("920405873057222747");

          menu.clicker.member.roles.remove("920405872457416754");

          break;

        case "temizle":
          menu.reply.send("Roller alındı", true);

          menu.clicker.member.roles.remove("920405872457416754");

          menu.clicker.member.roles.remove("920405873057222747");
      }
    }

    client.on("clickMenu", menu => {
      if (menu.message.id == menumesaj.id) {
        menuselection(menu);
      }
    });
  }
});

client.on("message", async message => {
  if (message.content.startsWith(".sddddrol1")) {
    if (message.author.bot) return;

    let secenek1 = new MessageMenuOption()

      .setLabel("certified illegal people")

      .setValue("certified illegal people")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("💰");

    let secenek2 = new MessageMenuOption()

      .setLabel("#ZaafYok")

      .setValue("#ZaafYok")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🤤");

    let secenek3 = new MessageMenuOption()

      .setLabel("#kimseciklerbaşkaşgöz")

      .setValue("#kimseciklerbaşkaşgöz")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🍻");

    let secenek4 = new MessageMenuOption()

      .setLabel("#keyfimmeyfim10numara")

      .setValue("#keyfimmeyfim10numara")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("👑");

    let secenek5 = new MessageMenuOption()

      .setLabel("şerefsiz insan sevmem!?!")

      .setValue("şerefsiz insan sevmem!?!")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🐵");

    let secenek6 = new MessageMenuOption()

      .setLabel("çekemeyen riv riv riv")

      .setValue("çekemeyen riv riv riv")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🏧");

    let secenek7 = new MessageMenuOption()

      .setLabel("#primyok")

      .setValue("#primyok")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("😎");

    let secenek8 = new MessageMenuOption()

      .setLabel("mezemdi rakıma")

      .setValue("mezemdi rakıma")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🥛");

    let secenek9 = new MessageMenuOption()

      .setLabel("Abdülfettah")

      .setValue("Abdülfettah")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🧔");

    let secenek10 = new MessageMenuOption()

      .setLabel("hani benim beynim")

      .setValue("hani benim beynim")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🧠");

    let secenek11 = new MessageMenuOption()

      .setLabel("temizle")

      .setValue("temizle")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("885886965495504896");

    let menu = new MessageMenu()

      .setID("MENU")

      .setMaxValues(1)

      .setMinValues(1)

      .setPlaceholder("Tıklayıp istediğiniz rolleri seçe bilirsiniz")

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

      .addOption(secenek11);

    let menumesaj = await message.channel.send(
      "Aşağıdaki menüye tıklayarak istediğin rolleri seçebilirsin!",

      menu
    );

    function menuselection(menu) {
      switch (menu.values[0]) {
        case "certified illegal people":
          menu.reply.send("<@&920405825665765376> Rolü verildi", true);

          menu.clicker.member.roles.add("920405825665765376");

          menu.clicker.member.roles.remove("920405826483683368");

          menu.clicker.member.roles.remove("920405827133800449");

          menu.clicker.member.roles.remove("920405828228505631");

          menu.clicker.member.roles.remove("920405828954116169");

          menu.clicker.member.roles.remove("920405829864280184");

          menu.clicker.member.roles.remove("920405830627655730");

          menu.clicker.member.roles.remove("922217135957246013");

          menu.clicker.member.roles.remove("920405832775139350");

          menu.clicker.member.roles.remove("920405833593016320");

          break;

        case "#ZaafYok":
          menu.reply.send("<@&920405826483683368> Rolü verildi", true);

          menu.clicker.member.roles.add("920405826483683368");

          menu.clicker.member.roles.remove("920405825665765376");

          menu.clicker.member.roles.remove("920405827133800449");

          menu.clicker.member.roles.remove("920405828228505631");

          menu.clicker.member.roles.remove("920405828954116169");

          menu.clicker.member.roles.remove("920405829864280184");

          menu.clicker.member.roles.remove("920405830627655730");

          menu.clicker.member.roles.remove("922217135957246013");

          menu.clicker.member.roles.remove("920405832775139350");

          menu.clicker.member.roles.remove("920405833593016320");

          break;

        case "#kimseciklerbaşkaşgöz":
          menu.reply.send("<@&920405827133800449> Rolü verildi", true);

          menu.clicker.member.roles.add("920405827133800449");

          menu.clicker.member.roles.remove("920405825665765376");

          menu.clicker.member.roles.remove("920405826483683368");

          menu.clicker.member.roles.remove("920405828228505631");

          menu.clicker.member.roles.remove("920405828954116169");

          menu.clicker.member.roles.remove("920405829864280184");

          menu.clicker.member.roles.remove("920405830627655730");

          menu.clicker.member.roles.remove("922217135957246013");

          menu.clicker.member.roles.remove("920405832775139350");

          menu.clicker.member.roles.remove("920405833593016320");

          break;

        case "#keyfimmeyfim10numara":
          menu.reply.send("<@&920405828228505631> Rolü verildi", true);

          menu.clicker.member.roles.add("920405828228505631");

          menu.clicker.member.roles.remove("920405825665765376");

          menu.clicker.member.roles.remove("920405826483683368");

          menu.clicker.member.roles.remove("920405827133800449");

          menu.clicker.member.roles.remove("920405828954116169");

          menu.clicker.member.roles.remove("920405829864280184");

          menu.clicker.member.roles.remove("920405830627655730");

          menu.clicker.member.roles.remove("922217135957246013");

          menu.clicker.member.roles.remove("920405832775139350");

          menu.clicker.member.roles.remove("920405833593016320");

          break;

        case "şerefsiz insan sevmem!?!":
          menu.reply.send("<@&920405828954116169> Rolü verildi", true);

          menu.clicker.member.roles.add("920405828954116169");

          menu.clicker.member.roles.remove("920405825665765376");

          menu.clicker.member.roles.remove("920405826483683368");

          menu.clicker.member.roles.remove("920405827133800449");

          menu.clicker.member.roles.remove("920405828228505631");

          menu.clicker.member.roles.remove("920405829864280184");

          menu.clicker.member.roles.remove("920405830627655730");

          menu.clicker.member.roles.remove("922217135957246013");

          menu.clicker.member.roles.remove("920405832775139350");

          menu.clicker.member.roles.remove("920405833593016320");

          break;

        case "çekemeyen riv riv riv":
          menu.reply.send("<@&920405829864280184> Rolü verildi", true);

          menu.clicker.member.roles.add("920405829864280184");

          menu.clicker.member.roles.remove("920405825665765376");

          menu.clicker.member.roles.remove("920405826483683368");

          menu.clicker.member.roles.remove("920405827133800449");

          menu.clicker.member.roles.remove("920405828228505631");

          menu.clicker.member.roles.remove("920405828954116169");

          menu.clicker.member.roles.remove("920405830627655730");

          menu.clicker.member.roles.remove("922217135957246013");

          menu.clicker.member.roles.remove("920405832775139350");

          menu.clicker.member.roles.remove("920405833593016320");

          break;

        case "#primyok":
          menu.reply.send("<@&920405830627655730> Rolü verildi", true);

          menu.clicker.member.roles.add("920405830627655730");

          menu.clicker.member.roles.remove("920405825665765376");

          menu.clicker.member.roles.remove("920405826483683368");

          menu.clicker.member.roles.remove("920405827133800449");

          menu.clicker.member.roles.remove("920405828228505631");

          menu.clicker.member.roles.remove("920405828954116169");

          menu.clicker.member.roles.remove("920405829864280184");

          menu.clicker.member.roles.remove("922217135957246013");

          menu.clicker.member.roles.remove("920405832775139350");

          menu.clicker.member.roles.remove("920405833593016320");

          break;

        case "mezemdi rakıma":
          menu.reply.send("<@&922217135957246013> Rolü verildi", true);

          menu.clicker.member.roles.add("922217135957246013");

          menu.clicker.member.roles.remove("920405825665765376");

          menu.clicker.member.roles.remove("920405826483683368");

          menu.clicker.member.roles.remove("920405827133800449");

          menu.clicker.member.roles.remove("920405828228505631");

          menu.clicker.member.roles.remove("920405828954116169");

          menu.clicker.member.roles.remove("920405829864280184");

          menu.clicker.member.roles.remove("920405830627655730");

          menu.clicker.member.roles.remove("920405832775139350");

          menu.clicker.member.roles.remove("920405833593016320");

          break;

        case "Abdülfettah":
          menu.reply.send("<@&920405832775139350> Rolü verildi", true);

          menu.clicker.member.roles.add("920405832775139350");

          menu.clicker.member.roles.remove("920405825665765376");

          menu.clicker.member.roles.remove("920405826483683368");

          menu.clicker.member.roles.remove("920405827133800449");

          menu.clicker.member.roles.remove("920405828228505631");

          menu.clicker.member.roles.remove("920405828954116169");

          menu.clicker.member.roles.remove("920405829864280184");

          menu.clicker.member.roles.remove("920405830627655730");

          menu.clicker.member.roles.remove("922217135957246013");

          menu.clicker.member.roles.remove("920405833593016320");

          break;

        case "hani benim beynim":
          menu.reply.send("<@&920405833593016320> Rolü verildi", true);

          menu.clicker.member.roles.add("920405833593016320");

          menu.clicker.member.roles.remove("920405825665765376");

          menu.clicker.member.roles.remove("920405826483683368");

          menu.clicker.member.roles.remove("920405827133800449");

          menu.clicker.member.roles.remove("920405828228505631");

          menu.clicker.member.roles.remove("920405828954116169");

          menu.clicker.member.roles.remove("920405829864280184");

          menu.clicker.member.roles.remove("920405830627655730");

          menu.clicker.member.roles.remove("922217135957246013");

          menu.clicker.member.roles.remove("920405832775139350");

          break;

        case "temizle":
          menu.reply.send("Roller alındı", true);

          menu.clicker.member.roles.remove("920405825665765376");

          menu.clicker.member.roles.remove("920405826483683368");

          menu.clicker.member.roles.remove("920405827133800449");

          menu.clicker.member.roles.remove("920405828228505631");

          menu.clicker.member.roles.remove("920405828954116169");

          menu.clicker.member.roles.remove("920405829864280184");

          menu.clicker.member.roles.remove("920405830627655730");

          menu.clicker.member.roles.remove("922217135957246013");

          menu.clicker.member.roles.remove("920405832775139350");

          menu.clicker.member.roles.remove("920405833593016320");

          break;
      }
    }

    client.on("clickMenu", menu => {
      if (menu.message.id == menumesaj.id) {
        menuselection(menu);
      }
    });
  }
});

client.on("message", async message => {
  if (message.content.startsWith(".rolllll")) {
    if (message.author.bot) return;

    let secenek1 = new MessageMenuOption()

      .setLabel("kalbime iyi davranın")

      .setValue("kalbime iyi davranın")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("867164174220132362");

    let secenek2 = new MessageMenuOption()

      .setLabel("aşk acısı çekiyorum")

      .setValue("aşk acısı çekiyorum")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("💔");

    let secenek3 = new MessageMenuOption()

      .setLabel("hayatcokzor")

      .setValue("hayatcokzor")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🌏");

    let secenek4 = new MessageMenuOption()

      .setLabel("İdare Edemem Anne")

      .setValue("İdare Edemem Anne")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("♻️");

    let secenek5 = new MessageMenuOption()

      .setLabel("gözü olanın gözü çıksın")

      .setValue("gözü olanın gözü çıksın")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("👀");

    let secenek6 = new MessageMenuOption()

      .setLabel("Kayan yıldızda dilediğim dileksin")

      .setValue("Kayan yıldızda dilediğim dileksin")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("☄️");

    let secenek7 = new MessageMenuOption()

      .setLabel("Çalıştıkça parlar, Ekibim altın demir.")

      .setValue("Çalıştıkça parlar, Ekibim altın demir.")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🫂");

    let secenek8 = new MessageMenuOption()

      .setLabel("Bugün varsın, Yarın ben istersem.")

      .setValue("Bugün varsın, Yarın ben istersem.")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("😌");

    let secenek9 = new MessageMenuOption()

      .setLabel("Güneş gibi doğup, Daha da yükseleceğiz.")

      .setValue("Güneş gibi doğup, Daha da yükseleceğiz.")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🌇");

    let secenek10 = new MessageMenuOption()

      .setLabel("Sadece gülüşümü yakala,")

      .setValue("Sadece gülüşümü yakala,")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("😊");

    let secenek11 = new MessageMenuOption()

      .setLabel("Kimseler elimi tutmadı hiç")

      .setValue("Kimseler elimi tutmadı hiç")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("💥");

    let secenek12 = new MessageMenuOption()

      .setLabel("Geleceğime flash atsam parlar mı?")

      .setValue("Geleceğime flash atsam parlar mı?")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("⚡");

    let secenek13 = new MessageMenuOption()

      .setLabel("Liberta hola, bakarım yola")

      .setValue("Liberta hola, bakarım yola")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🍂");

    let secenek14 = new MessageMenuOption()

      .setLabel("Olursan keleşçi olmazsın beleşçi.")

      .setValue("Olursan keleşçi olmazsın beleşçi.")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🌿");

    let secenek15 = new MessageMenuOption()

      .setLabel("İstanbul 34, vermiyo' mola")

      .setValue("İstanbul 34, vermiyo' mola")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("👑");

    let secenek16 = new MessageMenuOption()

      .setLabel("temizle")

      .setValue("temizle")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("885886965495504896");

    let menu = new MessageMenu()

      .setID("MENU")

      .setMaxValues(1)

      .setMinValues(1)

      .setPlaceholder("Tıklayıp istediğiniz rolleri seçe bilirsiniz")

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

      .addOption(secenek14)

      .addOption(secenek15)

      .addOption(secenek16);

    let menumesaj = await message.channel.send(
      "Aşağıdaki menüye tıklayarak istediğin rolleri seçebilirsin!",

      menu
    );

    function menuselection(menu) {
      switch (menu.values[0]) {
        case "kalbime iyi davranın":
          menu.reply.send("<@&920405835392360468> Rolü verildi", true);

          menu.clicker.member.roles.add("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "aşk acısı çekiyorum":
          menu.reply.send("<@&918591451774980116> Rolü verildi", true);

          menu.clicker.member.roles.add("918591451774980116");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "İdare Edemem Anne":
          menu.reply.send("<@&918591452555141180> Rolü verildi", true);

          menu.clicker.member.roles.add("918591452555141180");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "gözü olanın gözü çıksın":
          menu.reply.send("<@&920405840069033994> Rolü verildi", true);

          menu.clicker.member.roles.add("920405840069033994");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "Kayan yıldızda dilediğim dileksin":
          menu.reply.send("<@&920405840983363604> Rolü verildi", true);

          menu.clicker.member.roles.add("920405840983363604");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "Çalıştıkça parlar, Ekibim altın demir.":
          menu.reply.send("<@&920405841859989594> Rolü verildi", true);

          menu.clicker.member.roles.add("920405841859989594");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "Bugün varsın, Yarın ben istersem.":
          menu.reply.send("<@&920405842803687465> Rolü verildi", true);

          menu.clicker.member.roles.add("920405842803687465");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "Güneş gibi doğup, Daha da yükseleceğiz.":
          menu.reply.send("<@&920405844665991189> Rolü verildi", true);

          menu.clicker.member.roles.add("920405844665991189");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "Kimseler elimi tutmadı hiç":
          menu.reply.send("<@&920405845404168244> Rolü verildi", true);

          menu.clicker.member.roles.add("920405845404168244");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "Geleceğime flash atsam parlar mı?":
          menu.reply.send("<@&920405846565982278> Rolü verildi", true);

          menu.clicker.member.roles.add("920405846565982278");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "Liberta hola, bakarım yola":
          menu.reply.send("<@&920405847505535016> Rolü verildi", true);

          menu.clicker.member.roles.add("920405847505535016");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "Olursan keleşçi olmazsın beleşçi.":
          menu.reply.send("<@&920405848340197376> Rolü verildi", true);

          menu.clicker.member.roles.add("920405848340197376");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848898015263");

          break;

        case "İstanbul 34, vermiyo' mola":
          menu.reply.send("<@&920405848898015263> Rolü verildi", true);

          menu.clicker.member.roles.add("920405848898015263");

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          break;

        case "temizle":
          menu.reply.send("Roller alındı", true);

          menu.clicker.member.roles.remove("920405835392360468");

          menu.clicker.member.roles.remove("920405836445122650");

          menu.clicker.member.roles.remove("920405837447561327");

          menu.clicker.member.roles.remove("920405838286430208");

          menu.clicker.member.roles.remove("920405839079178280");

          menu.clicker.member.roles.remove("920405840069033994");

          menu.clicker.member.roles.remove("920405840983363604");

          menu.clicker.member.roles.remove("920405841859989594");

          menu.clicker.member.roles.remove("920405842803687465");

          menu.clicker.member.roles.remove("920405844665991189");

          menu.clicker.member.roles.remove("920405845404168244");

          menu.clicker.member.roles.remove("920405846565982278");

          menu.clicker.member.roles.remove("920405847505535016");

          menu.clicker.member.roles.remove("920405848340197376");

          menu.clicker.member.roles.remove("920405848898015263");

          break;
      }
    }

    client.on("clickMenu", menu => {
      if (menu.message.id == menumesaj.id) {
        menuselection(menu);
      }
    });
  }
});

//////////////////////////////// RENKLER ////////////////////////////////

client.on("message", async message => {
  if (message.content.startsWith(".sddddrenk")) {
    if (message.author.bot) return;

    let secenek1 = new MessageMenuOption()

      .setLabel("Kırmızı")

      .setValue("kırmızı")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🍒");

    let secenek2 = new MessageMenuOption()

      .setLabel("Mor")

      .setValue("Mor")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🍇");

    let secenek3 = new MessageMenuOption()

      .setLabel("Sarı")

      .setValue("Sarı")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🍋");

    let secenek4 = new MessageMenuOption()

      .setLabel("Açık Pembe")

      .setValue("Açık Pembe")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🌸");

    let secenek5 = new MessageMenuOption()

      .setLabel("Koyu Pembe")

      .setValue("Koyu Pembe")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🌷");

    let secenek6 = new MessageMenuOption()

      .setLabel("Mavi")

      .setValue("mavi")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🧊");

    let secenek7 = new MessageMenuOption()

      .setLabel("Açık Mavi")

      .setValue("Açık Mavi")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🎐");

    let secenek8 = new MessageMenuOption()

      .setLabel("Yeşil")

      .setValue("yeşil")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🍏");

    let secenek9 = new MessageMenuOption()

      .setLabel("Su yeşili")

      .setValue("su yeşili")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🍈");

    let secenek10 = new MessageMenuOption()

      .setLabel("Siyah")

      .setValue("siyah")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("🖤");

    let secenek11 = new MessageMenuOption()

      .setLabel("temizle")

      .setValue("temizle")

      .setDescription("Rolü almak için tıkla!")

      .setDefault()

      .setEmoji("885886965495504896");

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

      .addOption(secenek11);

    let menumesaj = await message.channel.send(
      "Aşağıdaki menüye tıklayarak Renk Rollerini seçebilirsin!",

      menu
    );

    function menuselection(menu) {
      switch (menu.values[0]) {
        case "kırmızı":
          menu.reply.send("<@&920405813355495495> Rolü verildi", true);

          menu.clicker.member.roles.add("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405815712677888"); //sarı

          menu.clicker.member.roles.remove("920405816564142220"); // açık Pembe

          menu.clicker.member.roles.remove("920405817411371019"); //koyu Pembe

          menu.clicker.member.roles.remove("920405817977630721"); //açık mavi

          menu.clicker.member.roles.remove("920405819353362522"); //koyu mavi

          menu.clicker.member.roles.remove("920405820242550804"); // yeşili

          menu.clicker.member.roles.remove("920405821454684180"); //su yeşili

          menu.clicker.member.roles.remove("920405822645870592"); //siyah

          break;

        case "Mor":
          menu.reply.send("<@&920405814508937286> Rolü verildi", true);

          menu.clicker.member.roles.add("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405815712677888"); //sarı

          menu.clicker.member.roles.remove("920405816564142220"); // açık Pembe

          menu.clicker.member.roles.remove("920405817411371019"); //koyu Pembe

          menu.clicker.member.roles.remove("920405817977630721"); //açık mavi

          menu.clicker.member.roles.remove("920405819353362522"); //koyu mavi

          menu.clicker.member.roles.remove("920405820242550804"); // yeşili

          menu.clicker.member.roles.remove("920405821454684180"); //su yeşili

          menu.clicker.member.roles.remove("920405822645870592"); //siyah

          break;

        case "Sarı":
          menu.reply.send("<@&920405815712677888> Rolü verildi", true);

          menu.clicker.member.roles.add("920405815712677888");

          menu.clicker.member.roles.remove("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405816564142220"); // açık Pembe

          menu.clicker.member.roles.remove("920405817411371019"); //koyu Pembe

          menu.clicker.member.roles.remove("920405817977630721"); //açık mavi

          menu.clicker.member.roles.remove("920405819353362522"); //koyu mavi

          menu.clicker.member.roles.remove("920405820242550804"); // yeşili

          menu.clicker.member.roles.remove("920405821454684180"); //su yeşili

          menu.clicker.member.roles.remove("920405822645870592"); //siyah

          break;

        case "Açık Pembe":
          menu.reply.send("<@&920405816564142220> Rolü verildi", true);

          menu.clicker.member.roles.add("920405816564142220");

          menu.clicker.member.roles.remove("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405815712677888"); //sarı

          menu.clicker.member.roles.remove("920405817411371019"); //koyu Pembe

          menu.clicker.member.roles.remove("920405817977630721"); //açık mavi

          menu.clicker.member.roles.remove("920405819353362522"); //koyu mavi

          menu.clicker.member.roles.remove("920405820242550804"); // yeşili

          menu.clicker.member.roles.remove("920405821454684180"); //su yeşili

          menu.clicker.member.roles.remove("920405822645870592"); //siyah

          break;

        case "Koyu Pembe":
          menu.reply.send("<@&920405817411371019> Rolü verildi", true);

          menu.clicker.member.roles.add("920405817411371019");

          menu.clicker.member.roles.remove("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405815712677888"); //sarı

          menu.clicker.member.roles.remove("920405816564142220"); // açık Pembe

          menu.clicker.member.roles.remove("920405817977630721"); //açık mavi

          menu.clicker.member.roles.remove("920405819353362522"); //koyu mavi

          menu.clicker.member.roles.remove("920405820242550804"); // yeşili

          menu.clicker.member.roles.remove("920405821454684180"); //su yeşili

          menu.clicker.member.roles.remove("920405822645870592"); //siyah

          break;

        case "mavi":
          menu.reply.send("<@&920405817977630721> Rolü verildi", true);

          menu.clicker.member.roles.add("920405817977630721");

          menu.clicker.member.roles.remove("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405815712677888"); //sarı

          menu.clicker.member.roles.remove("920405816564142220"); // açık Pembe

          menu.clicker.member.roles.remove("920405817411371019"); //koyu Pembe

          menu.clicker.member.roles.remove("920405819353362522"); //koyu mavi

          menu.clicker.member.roles.remove("920405820242550804"); // yeşili

          menu.clicker.member.roles.remove("920405821454684180"); //su yeşili

          menu.clicker.member.roles.remove("920405822645870592"); //siyah

          break;

        case "Açık Mavi":
          menu.reply.send("<@&920405819353362522> Rolü verildi", true);

          menu.clicker.member.roles.add("920405819353362522");

          menu.clicker.member.roles.remove("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405815712677888"); //sarı

          menu.clicker.member.roles.remove("920405816564142220"); // açık Pembe

          menu.clicker.member.roles.remove("920405817411371019"); //koyu Pembe

          menu.clicker.member.roles.remove("920405817977630721"); //açık mavi

          menu.clicker.member.roles.remove("920405820242550804"); // yeşili

          menu.clicker.member.roles.remove("920405821454684180"); //su yeşili

          menu.clicker.member.roles.remove("920405822645870592"); //siyah

          break;

        case "yeşil":
          menu.reply.send("<@&920405820242550804> Rolü verildi", true);

          menu.clicker.member.roles.add("920405820242550804");

          menu.clicker.member.roles.remove("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405815712677888"); //sarı

          menu.clicker.member.roles.remove("920405816564142220"); // açık Pembe

          menu.clicker.member.roles.remove("920405817411371019"); //koyu Pembe

          menu.clicker.member.roles.remove("920405817977630721"); //açık mavi

          menu.clicker.member.roles.remove("920405819353362522"); //koyu mavi

          menu.clicker.member.roles.remove("920405821454684180"); //su yeşili

          menu.clicker.member.roles.remove("920405822645870592"); //siyah

          break;

        case "su yeşili":
          menu.reply.send("<@&920405821454684180> Rolü verildi", true);

          menu.clicker.member.roles.add("920405821454684180");

          menu.clicker.member.roles.remove("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405815712677888"); //sarı

          menu.clicker.member.roles.remove("920405816564142220"); // açık Pembe

          menu.clicker.member.roles.remove("920405817411371019"); //koyu Pembe

          menu.clicker.member.roles.remove("920405817977630721"); //açık mavi

          menu.clicker.member.roles.remove("920405819353362522"); //koyu mavi

          menu.clicker.member.roles.remove("920405820242550804"); // yeşili

          menu.clicker.member.roles.remove("920405822645870592"); //siyah

          break;

        case "siyah":
          menu.reply.send("<@&920405822645870592> Rolü verildi", true);

          menu.clicker.member.roles.add("920405822645870592");

          menu.clicker.member.roles.remove("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405815712677888"); //sarı

          menu.clicker.member.roles.remove("920405816564142220"); // açık Pembe

          menu.clicker.member.roles.remove("920405817411371019"); //koyu Pembe

          menu.clicker.member.roles.remove("920405817977630721"); //açık mavi

          menu.clicker.member.roles.remove("920405819353362522"); //koyu mavi

          menu.clicker.member.roles.remove("920405820242550804"); // yeşili

          menu.clicker.member.roles.remove("920405821454684180"); //su yeşili

          break;

        case "temizle":
          menu.reply.send("Renk Rolü alındı", true);

          menu.clicker.member.roles.remove("920405813355495495"); //kırmızı

          menu.clicker.member.roles.remove("920405814508937286"); //mor

          menu.clicker.member.roles.remove("920405815712677888"); //sarı

          menu.clicker.member.roles.remove("920405816564142220"); // açık Pembe

          menu.clicker.member.roles.remove("920405817411371019"); //koyu Pembe

          menu.clicker.member.roles.remove("920405817977630721"); //açık mavi

          menu.clicker.member.roles.remove("920405819353362522"); //koyu mavi

          menu.clicker.member.roles.remove("920405820242550804"); // yeşili

          menu.clicker.member.roles.remove("920405821454684180"); //su yeşili

          menu.clicker.member.roles.remove("920405822645870592"); //siyah
      }
    }

    client.on("clickMenu", menu => {
      if (menu.message.id == menumesaj.id) {
        menuselection(menu);
      }
    });
  }
});

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Power By FastUptime"));

app.listen(port, () =>
  console.log(`Bot bu adres üzerinde çalışıyor: http://localhost:${port}`)
);
