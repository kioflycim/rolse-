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
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Power By FastUptime"));

app.listen(port, () =>
  console.log(`Bot bu adres üzerinde çalışıyor: http://localhost:${port}`)
);
/////////Çekiliş Partner

client.on("message", async message => {
  if (message.content.startsWith(".kfpc")) {
    if (message.author.bot) return;
    let secenek1 = new MessageMenuOption()
      .setLabel("Çekiliş Katılımcısı")
      .setValue("cekilis")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("926518918099632129");
    let secenek2 = new MessageMenuOption()
      .setLabel("Partner Görme")
      .setValue("partner")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("926519103978602537");
    let secenek3 = new MessageMenuOption()
      .setLabel("temizle")
      .setValue("temizle")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("🗑️");
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
          menu.reply.send("<@&926508071382028299> Rolü verildi", true);
          menu.clicker.member.roles.add("926508071382028299");
          menu.clicker.member.roles.remove("926508071809875969");
          break;
        case "partner":
          menu.reply.send("<@&926508071809875969> Rolü verildi", true);
          menu.clicker.member.roles.add("926508071809875969");
          menu.clicker.member.roles.remove("926508071382028299");
          break;
        case "temizle":
          menu.reply.send("Roller alındı", true);
          menu.clicker.member.roles.remove("926508071382028299");
          menu.clicker.member.roles.remove("926508071809875969");
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
  if (message.content.startsWith(".kfrenk")) {
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
      .setEmoji("🗑️");
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
          menu.reply.send("<@&926508019951485019> Rolü verildi", true);
          menu.clicker.member.roles.add("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508020689670225"); //mor
          menu.clicker.member.roles.remove("926508021637595156"); //sarı
          menu.clicker.member.roles.remove("926508022396772392"); // açık Pembe
          menu.clicker.member.roles.remove("926508023210475520"); //koyu Pembe
          menu.clicker.member.roles.remove("926508024024141824"); //koyu mavi
          menu.clicker.member.roles.remove("926508024846250004"); //açık mavi
          menu.clicker.member.roles.remove("926508025735434251"); // yeşili
          menu.clicker.member.roles.remove("926508026767233084"); //su yeşili
          menu.clicker.member.roles.remove("926508027568345141"); //siyah
          break;
        case "Mor":
          menu.reply.send("<@&926508020689670225> Rolü verildi", true);
          menu.clicker.member.roles.add("926508020689670225"); //mor

          menu.clicker.member.roles.remove("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508021637595156"); //sarı
          menu.clicker.member.roles.remove("926508022396772392"); // açık Pembe
          menu.clicker.member.roles.remove("926508023210475520"); //koyu Pembe
          menu.clicker.member.roles.remove("926508024024141824"); //koyu mavi
          menu.clicker.member.roles.remove("926508024846250004"); //açık mavi
          menu.clicker.member.roles.remove("926508025735434251"); // yeşili
          menu.clicker.member.roles.remove("926508026767233084"); //su yeşili
          menu.clicker.member.roles.remove("926508027568345141"); //siyah
          break;
        case "Sarı":
          menu.reply.send("<@&926508021637595156> Rolü verildi", true);
          menu.clicker.member.roles.add("926508021637595156");

          menu.clicker.member.roles.remove("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508020689670225"); //sarı
          menu.clicker.member.roles.remove("926508022396772392"); // açık Pembe
          menu.clicker.member.roles.remove("926508023210475520"); //koyu Pembe
          menu.clicker.member.roles.remove("926508024024141824"); //koyu mavi
          menu.clicker.member.roles.remove("926508024846250004"); //açık mavi
          menu.clicker.member.roles.remove("926508025735434251"); // yeşili
          menu.clicker.member.roles.remove("926508026767233084"); //su yeşili
          menu.clicker.member.roles.remove("926508027568345141"); //siyah
          break;
        case "Açık Pembe":
          menu.reply.send("<@&926508022396772392> Rolü verildi", true);
          menu.clicker.member.roles.add("926508022396772392");

          menu.clicker.member.roles.remove("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508020689670225"); //mor
          menu.clicker.member.roles.remove("926508021637595156"); //sarı
          menu.clicker.member.roles.remove("926508023210475520"); //koyu Pembe
          menu.clicker.member.roles.remove("926508024024141824"); //koyu mavi
          menu.clicker.member.roles.remove("926508024846250004"); //açık mavi
          menu.clicker.member.roles.remove("926508025735434251"); // yeşili
          menu.clicker.member.roles.remove("926508026767233084"); //su yeşili
          menu.clicker.member.roles.remove("926508027568345141"); //siyah
          break;
        case "Koyu Pembe":
          menu.reply.send("<@&926508023210475520> Rolü verildi", true);
          menu.clicker.member.roles.add("926508023210475520");

          menu.clicker.member.roles.remove("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508020689670225"); //mor
          menu.clicker.member.roles.remove("926508021637595156"); //sarı
          menu.clicker.member.roles.remove("926508022396772392"); // açık Pembe
          menu.clicker.member.roles.remove("926508024024141824"); //koyu mavi
          menu.clicker.member.roles.remove("926508024846250004"); //açık mavi
          menu.clicker.member.roles.remove("926508025735434251"); // yeşili
          menu.clicker.member.roles.remove("926508026767233084"); //su yeşili
          menu.clicker.member.roles.remove("926508027568345141"); //siyah
          break;
        case "mavi":
          menu.reply.send("<@&926508024024141824> Rolü verildi", true);
          menu.clicker.member.roles.add("926508024024141824");

          menu.clicker.member.roles.remove("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508020689670225"); //mor
          menu.clicker.member.roles.remove("926508021637595156"); //sarı
          menu.clicker.member.roles.remove("926508022396772392"); // açık Pembe
          menu.clicker.member.roles.remove("926508023210475520"); //koyu Pembe
          menu.clicker.member.roles.remove("926508024846250004"); //açık mavi
          menu.clicker.member.roles.remove("926508025735434251"); // yeşili
          menu.clicker.member.roles.remove("926508026767233084"); //su yeşili
          menu.clicker.member.roles.remove("926508027568345141"); //siyah
          break;
        case "Açık Mavi":
          menu.reply.send("<@&926508024846250004> Rolü verildi", true);
          menu.clicker.member.roles.add("926508024846250004");

          menu.clicker.member.roles.remove("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508020689670225"); //mor
          menu.clicker.member.roles.remove("926508021637595156"); //sarı
          menu.clicker.member.roles.remove("926508022396772392"); // açık Pembe
          menu.clicker.member.roles.remove("926508023210475520"); //koyu Pembe
          menu.clicker.member.roles.remove("926508024024141824"); //koyu mavi
          menu.clicker.member.roles.remove("926508025735434251"); // yeşili
          menu.clicker.member.roles.remove("926508026767233084"); //su yeşili
          menu.clicker.member.roles.remove("926508027568345141"); //siyah
          break;
        case "yeşil":
          menu.reply.send("<@&926508025735434251> Rolü verildi", true);
          menu.clicker.member.roles.add("926508025735434251");

          menu.clicker.member.roles.remove("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508020689670225"); //mor
          menu.clicker.member.roles.remove("926508021637595156"); //sarı
          menu.clicker.member.roles.remove("926508022396772392"); // açık Pembe
          menu.clicker.member.roles.remove("926508023210475520"); //koyu Pembe
          menu.clicker.member.roles.remove("926508024024141824"); //koyu mavi
          menu.clicker.member.roles.remove("926508024846250004"); //açık mavi
          menu.clicker.member.roles.remove("926508026767233084"); //su yeşili
          menu.clicker.member.roles.remove("926508027568345141"); //siyah
          break;
        case "su yeşili":
          menu.reply.send("<@&926508026767233084> Rolü verildi", true);
          menu.clicker.member.roles.add("926508026767233084");

          menu.clicker.member.roles.remove("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508020689670225"); //mor
          menu.clicker.member.roles.remove("926508021637595156"); //sarı
          menu.clicker.member.roles.remove("926508022396772392"); // açık Pembe
          menu.clicker.member.roles.remove("926508023210475520"); //koyu Pembe
          menu.clicker.member.roles.remove("926508024024141824"); //koyu mavi
          menu.clicker.member.roles.remove("926508024846250004"); //açık mavi
          menu.clicker.member.roles.remove("926508025735434251"); // yeşili
          menu.clicker.member.roles.remove("926508027568345141"); //siyah
          break;
        case "siyah":
          menu.reply.send("<@&926508027568345141> Rolü verildi", true);
          menu.clicker.member.roles.add("926508027568345141");

          menu.clicker.member.roles.remove("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508020689670225"); //mor
          menu.clicker.member.roles.remove("926508021637595156"); //sarı
          menu.clicker.member.roles.remove("926508022396772392"); // açık Pembe
          menu.clicker.member.roles.remove("926508023210475520"); //koyu Pembe
          menu.clicker.member.roles.remove("926508024024141824"); //koyu mavi
          menu.clicker.member.roles.remove("926508024846250004"); //açık mavi
          menu.clicker.member.roles.remove("926508025735434251"); // yeşili
          menu.clicker.member.roles.remove("926508026767233084"); //su yeşili
          break;
        case "temizle":
          menu.reply.send("Renk Rolü alındı", true);
          menu.clicker.member.roles.remove("926508019951485019"); //kırmızı
          menu.clicker.member.roles.remove("926508020689670225"); //mor
          menu.clicker.member.roles.remove("926508021637595156"); //sarı
          menu.clicker.member.roles.remove("926508022396772392"); // açık Pembe
          menu.clicker.member.roles.remove("926508023210475520"); //koyu Pembe
          menu.clicker.member.roles.remove("926508024024141824"); //koyu mavi
          menu.clicker.member.roles.remove("926508024846250004"); //açık mavi
          menu.clicker.member.roles.remove("926508025735434251"); // yeşili
          menu.clicker.member.roles.remove("926508026767233084"); //su yeşili
          menu.clicker.member.roles.remove("926508027568345141"); //siyah
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
  if (message.content.startsWith(".kfrol")) {
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
          menu.reply.send("<@&926508030328188928> Rolü verildi", true);
          menu.clicker.member.roles.add("926508030328188928");
          menu.clicker.member.roles.remove("926508031229972510");
          menu.clicker.member.roles.remove("926508032144330782");
          menu.clicker.member.roles.remove("926508033272606760");
          menu.clicker.member.roles.remove("926508034094678086");
          menu.clicker.member.roles.remove("926508035013242880");
          menu.clicker.member.roles.remove("926508035575271475");
          menu.clicker.member.roles.remove("926508036053426197");
          menu.clicker.member.roles.remove("926508037286527046");
          menu.clicker.member.roles.remove("926508037768896584");
          break;
        case "#ZaafYok":
          menu.reply.send("<@&926508031229972510> Rolü verildi", true);
          menu.clicker.member.roles.add("926508031229972510");

          menu.clicker.member.roles.remove("926508030328188928");
          menu.clicker.member.roles.remove("926508032144330782");
          menu.clicker.member.roles.remove("926508033272606760");
          menu.clicker.member.roles.remove("926508034094678086");
          menu.clicker.member.roles.remove("926508035013242880");
          menu.clicker.member.roles.remove("926508035575271475");
          menu.clicker.member.roles.remove("926508036053426197");
          menu.clicker.member.roles.remove("926508037286527046");
          menu.clicker.member.roles.remove("926508037768896584");
          break;
        case "#kimseciklerbaşkaşgöz":
          menu.reply.send("<@&926508032144330782> Rolü verildi", true);
          menu.clicker.member.roles.add("926508032144330782");

          menu.clicker.member.roles.remove("926508030328188928");
          menu.clicker.member.roles.remove("926508031229972510");
          menu.clicker.member.roles.remove("926508033272606760");
          menu.clicker.member.roles.remove("926508034094678086");
          menu.clicker.member.roles.remove("926508035013242880");
          menu.clicker.member.roles.remove("926508035575271475");
          menu.clicker.member.roles.remove("926508036053426197");
          menu.clicker.member.roles.remove("926508037286527046");
          menu.clicker.member.roles.remove("926508037768896584");
          break;
        case "#keyfimmeyfim10numara":
          menu.reply.send("<@&926508033272606760> Rolü verildi", true);
          menu.clicker.member.roles.add("926508033272606760");

          menu.clicker.member.roles.remove("926508030328188928");
          menu.clicker.member.roles.remove("926508031229972510");
          menu.clicker.member.roles.remove("926508032144330782");
          menu.clicker.member.roles.remove("926508034094678086");
          menu.clicker.member.roles.remove("926508035013242880");
          menu.clicker.member.roles.remove("926508035575271475");
          menu.clicker.member.roles.remove("926508036053426197");
          menu.clicker.member.roles.remove("926508037286527046");
          menu.clicker.member.roles.remove("926508037768896584");
          break;
        case "şerefsiz insan sevmem!?!":
          menu.reply.send("<@&926508034094678086> Rolü verildi", true);
          menu.clicker.member.roles.add("926508034094678086");

          menu.clicker.member.roles.remove("926508030328188928");
          menu.clicker.member.roles.remove("926508031229972510");
          menu.clicker.member.roles.remove("926508032144330782");
          menu.clicker.member.roles.remove("926508033272606760");
          menu.clicker.member.roles.remove("926508035013242880");
          menu.clicker.member.roles.remove("926508035575271475");
          menu.clicker.member.roles.remove("926508036053426197");
          menu.clicker.member.roles.remove("926508037286527046");
          menu.clicker.member.roles.remove("926508037768896584");
          break;
        case "çekemeyen riv riv riv":
          menu.reply.send("<@&926508035013242880> Rolü verildi", true);
          menu.clicker.member.roles.add("926508035013242880");

          menu.clicker.member.roles.remove("926508030328188928");
          menu.clicker.member.roles.remove("926508031229972510");
          menu.clicker.member.roles.remove("926508032144330782");
          menu.clicker.member.roles.remove("926508033272606760");
          menu.clicker.member.roles.remove("926508034094678086");
          menu.clicker.member.roles.remove("926508035575271475");
          menu.clicker.member.roles.remove("926508036053426197");
          menu.clicker.member.roles.remove("926508037286527046");
          menu.clicker.member.roles.remove("926508037768896584");
          break;
        case "#primyok":
          menu.reply.send("<@&926508035575271475> Rolü verildi", true);
          menu.clicker.member.roles.add("926508035575271475");

          menu.clicker.member.roles.remove("926508030328188928");
          menu.clicker.member.roles.remove("926508031229972510");
          menu.clicker.member.roles.remove("926508032144330782");
          menu.clicker.member.roles.remove("926508033272606760");
          menu.clicker.member.roles.remove("926508034094678086");
          menu.clicker.member.roles.remove("926508035013242880");
          menu.clicker.member.roles.remove("926508036053426197");
          menu.clicker.member.roles.remove("926508037286527046");
          menu.clicker.member.roles.remove("926508037768896584");
          break;
        case "mezemdi rakıma":
          menu.reply.send("<@&926508036053426197> Rolü verildi", true);
          menu.clicker.member.roles.add("926508036053426197");

          menu.clicker.member.roles.remove("926508030328188928");
          menu.clicker.member.roles.remove("926508031229972510");
          menu.clicker.member.roles.remove("926508032144330782");
          menu.clicker.member.roles.remove("926508033272606760");
          menu.clicker.member.roles.remove("926508034094678086");
          menu.clicker.member.roles.remove("926508035013242880");
          menu.clicker.member.roles.remove("926508035575271475");
          menu.clicker.member.roles.remove("926508037286527046");
          menu.clicker.member.roles.remove("926508037768896584");
          break;
        case "Abdülfettah":
          menu.reply.send("<@&926508037286527046> Rolü verildi", true);
          menu.clicker.member.roles.add("926508037286527046");

          menu.clicker.member.roles.remove("926508030328188928");
          menu.clicker.member.roles.remove("926508031229972510");
          menu.clicker.member.roles.remove("926508032144330782");
          menu.clicker.member.roles.remove("926508033272606760");
          menu.clicker.member.roles.remove("926508034094678086");
          menu.clicker.member.roles.remove("926508035013242880");
          menu.clicker.member.roles.remove("926508035575271475");
          menu.clicker.member.roles.remove("926508036053426197");
          menu.clicker.member.roles.remove("926508037768896584");
          break;
        case "hani benim beynim":
          menu.reply.send("<@&926508037768896584> Rolü verildi", true);
          menu.clicker.member.roles.add("926508037768896584");

          menu.clicker.member.roles.remove("926508030328188928");
          menu.clicker.member.roles.remove("926508031229972510");
          menu.clicker.member.roles.remove("926508032144330782");
          menu.clicker.member.roles.remove("926508033272606760");
          menu.clicker.member.roles.remove("926508034094678086");
          menu.clicker.member.roles.remove("926508035013242880");
          menu.clicker.member.roles.remove("926508035575271475");
          menu.clicker.member.roles.remove("926508036053426197");
          menu.clicker.member.roles.remove("926508037286527046");
          break;
        case "temizle":
          menu.reply.send("Roller alındı", true);
          menu.clicker.member.roles.remove("926508030328188928");
          menu.clicker.member.roles.remove("926508031229972510");
          menu.clicker.member.roles.remove("926508032144330782");
          menu.clicker.member.roles.remove("926508033272606760");
          menu.clicker.member.roles.remove("926508034094678086");
          menu.clicker.member.roles.remove("926508035013242880");
          menu.clicker.member.roles.remove("926508035575271475");
          menu.clicker.member.roles.remove("926508036053426197");
          menu.clicker.member.roles.remove("926508037286527046");
          menu.clicker.member.roles.remove("926508037768896584");
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
  if (message.content.startsWith(".kfrol2")) {
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
      .setLabel("Amcamda Sapancalı")
      .setValue("Amcamda Sapancalı")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("🍂");
    let secenek14 = new MessageMenuOption()
      .setLabel("Olursan keleşçi olmazsın beleşçi")
      .setValue("Olursan keleşçi olmazsın beleşçi")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("🌿");
    let secenek15 = new MessageMenuOption()
      .setLabel("Ben kuş gribi sen tavuk")
      .setValue("Ben kuş gribi sen tavuk")
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
          menu.reply.send("<@&926508039597600859> Rolü verildi", true);
          menu.clicker.member.roles.add("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");
          break;
        case "aşk acısı çekiyorum":
          menu.reply.send("<@&926508040130285590> Rolü verildi", true);
          menu.clicker.member.roles.add("926508040130285590");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");

          break;
        case "hayatcokzor":
          menu.reply.send("<@&926508041212424222> Rolü verildi", true);
          menu.clicker.member.roles.add("926508041212424222");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");
          break;
        case "İdare Edemem Anne":
          menu.reply.send("<@&926508041996734545> Rolü verildi", true);
          menu.clicker.member.roles.add("926508041996734545");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");
          break;
        case "gözü olanın gözü çıksın":
          menu.reply.send("<@&926508043447971940> Rolü verildi", true);
          menu.clicker.member.roles.add("926508043447971940");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");
          break;
        case "Kayan yıldızda dilediğim dileksin":
          menu.reply.send("<@&926508044274253824> Rolü verildi", true);
          menu.clicker.member.roles.add("926508044274253824");

          break;
        case "Çalıştıkça parlar, Ekibim altın demir.":
          menu.reply.send("<@&926508045016657950> Rolü verildi", true);
          menu.clicker.member.roles.add("926508045016657950");
          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");

          break;
        case "Bugün varsın, Yarın ben istersem.":
          menu.reply.send("<@&926508045805187192> Rolü verildi", true);
          menu.clicker.member.roles.add("926508045805187192");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");
          break;
        case "Güneş gibi doğup, Daha da yükseleceğiz.":
          menu.reply.send("<@&926508046484648068> Rolü verildi", true);
          menu.clicker.member.roles.add("926508046484648068");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");
          break;
        case "Sadece gülüşümü yakala,":
          menu.reply.send("<@&926508048476942346> Rolü verildi", true);
          menu.clicker.member.roles.add("926508048476942346");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");

          break;
        case "Kimseler elimi tutmadı hiç":
          menu.reply.send("<@&926508049240309832> Rolü verildi", true);
          menu.clicker.member.roles.add("926508049240309832");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");
          break;
        case "Geleceğime flash atsam parlar mı?":
          menu.reply.send("<@&926508050213388338> Rolü verildi", true);
          menu.clicker.member.roles.add("926508050213388338");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");

          break;
        case "Amcamda Sapancalı":
          menu.reply.send("<@&926508050913849434> Rolü verildi", true);
          menu.clicker.member.roles.add("926508050913849434");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");

          break;
        case "Olursan keleşçi olmazsın beleşçi":
          menu.reply.send("<@&926508053573042186> Rolü verildi", true);
          menu.clicker.member.roles.add("926508053573042186");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508054474797158");

          break;
        case "Ben kuş gribi sen tavuk":
          menu.reply.send("<@&926508054474797158> Rolü verildi", true);
          menu.clicker.member.roles.add("926508054474797158");

          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");

          break;
        case "temizle":
          menu.reply.send("Roller alındı", true);
          menu.clicker.member.roles.remove("926508039597600859");
          menu.clicker.member.roles.remove("926508040130285590");
          menu.clicker.member.roles.remove("926508041212424222");
          menu.clicker.member.roles.remove("926508041996734545");
          menu.clicker.member.roles.remove("926508043447971940");
          menu.clicker.member.roles.remove("926508044274253824");
          menu.clicker.member.roles.remove("926508045016657950");
          menu.clicker.member.roles.remove("926508045805187192");
          menu.clicker.member.roles.remove("926508046484648068");
          menu.clicker.member.roles.remove("926508048476942346");
          menu.clicker.member.roles.remove("926508049240309832");
          menu.clicker.member.roles.remove("926508050213388338");
          menu.clicker.member.roles.remove("926508050913849434");
          menu.clicker.member.roles.remove("926508053573042186");
          menu.clicker.member.roles.remove("926508054474797158");

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
