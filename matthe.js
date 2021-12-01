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
      .setValue("mor")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("🍇");
    let secenek3 = new MessageMenuOption()
      .setLabel("Sarı")
      .setValue("sarı")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("🍋");
    let secenek4 = new MessageMenuOption()
      .setLabel("Açık Pembe")
      .setValue("açık Pembe")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("🌸");
    let secenek5 = new MessageMenuOption()
      .setLabel("Koyu Pembe")
      .setValue("Koyu pembe")
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
      .setValue("açık mavi")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("🎐");
    let secenek8 = new MessageMenuOption()
      .setLabel("Yeşili")
      .setValue("yeşili")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("🍏");
    let secenek9 = new MessageMenuOption()
      .setLabel("Su yeşili")
      .setValue("Su yeşili")
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
          menu.reply.send("<@&884123850944688169> Rolü verildi", true);
          menu.clicker.member.roles.add("884123850944688169"); //kırmızı
          menu.clicker.member.roles.remove("884123851930345493"); //mor
          menu.clicker.member.roles.remove("884123854253989888"); // Koyu Pembe
          menu.clicker.member.roles.remove("884123852819533925"); //Açık Pembe
          menu.clicker.member.roles.remove("884123853515800606"); // sarı
          menu.clicker.member.roles.remove("884123855164166245"); //koyu amvi
          menu.clicker.member.roles.remove("884123855919136778"); //açık mavi
          menu.clicker.member.roles.remove("884123857366188093"); //yeşil
          menu.clicker.member.roles.remove("884123856690905158"); //su yrşili
          menu.clicker.member.roles.remove("885265772430110760"); //siyah
          break;
        case "mor":
          menu.reply.send("<@&884123851930345493> Rolü verildi", true);
          menu.clicker.member.roles.add("884123851930345493"); //kırmızı
          menu.clicker.member.roles.remove("884123854253989888"); // Koyu Pembe
          menu.clicker.member.roles.remove("884123852819533925"); //Açık Pembe
          menu.clicker.member.roles.remove("884123853515800606"); // sarı
          menu.clicker.member.roles.remove("884123855164166245"); //koyu amvi
          menu.clicker.member.roles.remove("884123855919136778"); //açık mavi
          menu.clicker.member.roles.remove("884123857366188093"); //yeşil
          menu.clicker.member.roles.remove("884123856690905158"); //su yrşili
          menu.clicker.member.roles.remove("885265772430110760"); //siyah
          menu.clicker.member.roles.remove("884123850944688169"); //kırmızı
          break;
        case "sarı":
          menu.reply.send("<@&884123853515800606> Rolü verildi", true);
          menu.clicker.member.roles.add("884123853515800606");
          menu.clicker.member.roles.remove("884123851930345493"); //mor
          menu.clicker.member.roles.remove("884123854253989888"); // Koyu Pembe
          menu.clicker.member.roles.remove("884123852819533925"); //Açık Pembe
          menu.clicker.member.roles.remove("884123855164166245"); //koyu amvi
          menu.clicker.member.roles.remove("884123855919136778"); //açık mavi
          menu.clicker.member.roles.remove("884123857366188093"); //yeşil
          menu.clicker.member.roles.remove("884123856690905158"); //su yrşili
          menu.clicker.member.roles.remove("885265772430110760"); //siyah
          menu.clicker.member.roles.remove("884123850944688169"); //kırmızı
          break;
        case "açık Pembe":
          menu.reply.send("<@&884123852819533925> Rolü verildi", true);
          menu.clicker.member.roles.add("884123852819533925");
          menu.clicker.member.roles.remove("884123851930345493"); //mor
          menu.clicker.member.roles.remove("884123854253989888"); // Koyu Pembe
          menu.clicker.member.roles.remove("884123853515800606"); // sarı
          menu.clicker.member.roles.remove("884123855164166245"); //koyu amvi
          menu.clicker.member.roles.remove("884123855919136778"); //açık mavi
          menu.clicker.member.roles.remove("884123857366188093"); //yeşil
          menu.clicker.member.roles.remove("884123856690905158"); //su yrşili
          menu.clicker.member.roles.remove("885265772430110760"); //siyah
          menu.clicker.member.roles.remove("884123850944688169"); //kırmızı
          break;
        case "Koyu pembe":
          menu.reply.send("<@&884123854253989888> Rolü verildi", true);
          menu.clicker.member.roles.add("884123854253989888");
          menu.clicker.member.roles.remove("884123851930345493"); //mor
          menu.clicker.member.roles.remove("884123852819533925"); //Açık Pembe
          menu.clicker.member.roles.remove("884123853515800606"); // sarı
          menu.clicker.member.roles.remove("884123855164166245"); //koyu amvi
          menu.clicker.member.roles.remove("884123855919136778"); //açık mavi
          menu.clicker.member.roles.remove("884123857366188093"); //yeşil
          menu.clicker.member.roles.remove("884123856690905158"); //su yrşili
          menu.clicker.member.roles.remove("885265772430110760"); //siyah
          menu.clicker.member.roles.remove("884123850944688169"); //kırmızı
          break;
        case "mavi":
          menu.reply.send("<@&884123855164166245> Rolü verildi", true);
          menu.clicker.member.roles.add("884123855164166245");
          menu.clicker.member.roles.remove("884123851930345493"); //mor
          menu.clicker.member.roles.remove("884123854253989888"); // Koyu Pembe
          menu.clicker.member.roles.remove("884123852819533925"); //Açık Pembe
          menu.clicker.member.roles.remove("884123853515800606"); // sarı
          menu.clicker.member.roles.remove("884123855919136778"); //açık mavi
          menu.clicker.member.roles.remove("884123857366188093"); //yeşil
          menu.clicker.member.roles.remove("884123856690905158"); //su yrşili
          menu.clicker.member.roles.remove("885265772430110760"); //siyah
          menu.clicker.member.roles.remove("884123850944688169"); //kırmızı
          break;
        case "açık mavi":
          menu.reply.send("<@&884123855919136778> Rolü verildi", true);
          menu.clicker.member.roles.add("884123855919136778");
          menu.clicker.member.roles.remove("884123851930345493"); //mor
          menu.clicker.member.roles.remove("884123854253989888"); // Koyu Pembe
          menu.clicker.member.roles.remove("884123852819533925"); //Açık Pembe
          menu.clicker.member.roles.remove("884123853515800606"); // sarı
          menu.clicker.member.roles.remove("884123855164166245"); //koyu amvi
          menu.clicker.member.roles.remove("884123857366188093"); //yeşil
          menu.clicker.member.roles.remove("884123856690905158"); //su yrşili
          menu.clicker.member.roles.remove("885265772430110760"); //siyah
          menu.clicker.member.roles.remove("884123850944688169"); //kırmızı
          break;
        case "yeşili":
          menu.reply.send("<@&884123857366188093> Rolü verildi", true);
          menu.clicker.member.roles.add("884123857366188093");
          menu.clicker.member.roles.remove("884123851930345493"); //mor
          menu.clicker.member.roles.remove("884123854253989888"); // Koyu Pembe
          menu.clicker.member.roles.remove("884123852819533925"); //Açık Pembe
          menu.clicker.member.roles.remove("884123853515800606"); // sarı
          menu.clicker.member.roles.remove("884123855164166245"); //koyu amvi
          menu.clicker.member.roles.remove("884123855919136778"); //açık mavi
          menu.clicker.member.roles.remove("884123856690905158"); //su yrşili
          menu.clicker.member.roles.remove("885265772430110760"); //siyah
          menu.clicker.member.roles.remove("884123850944688169"); //kırmızı
        case "Su yeşili":
          menu.reply.send("<@&884123856690905158> Rolü verildi", true);
          menu.clicker.member.roles.add("884123856690905158");
          menu.clicker.member.roles.remove("884123851930345493"); //mor
          menu.clicker.member.roles.remove("884123854253989888"); // Koyu Pembe
          menu.clicker.member.roles.remove("884123852819533925"); //Açık Pembe
          menu.clicker.member.roles.remove("884123853515800606"); // sarı
          menu.clicker.member.roles.remove("884123855164166245"); //koyu amvi
          menu.clicker.member.roles.remove("884123855919136778"); //açık mavi
          menu.clicker.member.roles.remove("884123857366188093"); //yeşil
          menu.clicker.member.roles.remove("885265772430110760"); //siyah
          menu.clicker.member.roles.remove("884123850944688169"); //kırmızı
          break;
        case "siyah":
          menu.reply.send("<@&885265772430110760> Rolü verildi", true);
          menu.clicker.member.roles.add("885265772430110760");
          menu.clicker.member.roles.remove("884123851930345493"); //mor
          menu.clicker.member.roles.remove("884123854253989888"); // Koyu Pembe
          menu.clicker.member.roles.remove("884123852819533925"); //Açık Pembe
          menu.clicker.member.roles.remove("884123853515800606"); // sarı
          menu.clicker.member.roles.remove("884123855164166245"); //koyu amvi
          menu.clicker.member.roles.remove("884123855919136778"); //açık mavi
          menu.clicker.member.roles.remove("884123857366188093"); //yeşil
          menu.clicker.member.roles.remove("884123856690905158"); //su yrşili
          menu.clicker.member.roles.remove("884123850944688169"); //kırmızı

          break;
        case "temizle":
          menu.reply.send("Renk Rolü alındı", true);
          menu.clicker.member.roles.remove("884123851930345493"); //mor
          menu.clicker.member.roles.remove("884123854253989888"); // Koyu Pembe
          menu.clicker.member.roles.remove("884123852819533925"); //Açık Pembe
          menu.clicker.member.roles.remove("884123853515800606"); // sarı
          menu.clicker.member.roles.remove("884123855164166245"); //koyu amvi
          menu.clicker.member.roles.remove("884123855919136778"); //açık mavi
          menu.clicker.member.roles.remove("884123857366188093"); //yeşil
          menu.clicker.member.roles.remove("884123856690905158"); //su yrşili
          menu.clicker.member.roles.remove("885265772430110760"); //siyah
          menu.clicker.member.roles.remove("884123850944688169"); //kırmızı
      }
    }
    client.on("clickMenu", menu => {
      if (menu.message.id == menumesaj.id) {
        menuselection(menu);
      }
    });
  }
});

/////////////////////// BURÇLER /////////////////////////

client.on("message", async message => {
  if (message.content.startsWith(".sddddburç")) {
    if (message.author.bot) return;
    let secenek1 = new MessageMenuOption()
      .setLabel("Koç")
      .setValue("koç")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♈");
    let secenek2 = new MessageMenuOption()
      .setLabel("Boğa")
      .setValue("boğa")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♉");
    let secenek3 = new MessageMenuOption()
      .setLabel("İkizler")
      .setValue("ikizler")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♊");
    let secenek4 = new MessageMenuOption()
      .setLabel("Yengeç")
      .setValue("yengeç")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♋");
    let secenek5 = new MessageMenuOption()
      .setLabel("Aslan")
      .setValue("aslan")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♌");
    let secenek6 = new MessageMenuOption()
      .setLabel("Başak")
      .setValue("başak")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♍");
    let secenek7 = new MessageMenuOption()
      .setLabel("Terazi")
      .setValue("terazi")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♎");
    let secenek8 = new MessageMenuOption()
      .setLabel("Akrep")
      .setValue("akrep")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♏");
    let secenek9 = new MessageMenuOption()
      .setLabel("Yay")
      .setValue("yay")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♐");
    let secenek10 = new MessageMenuOption()
      .setLabel("Oğlak")
      .setValue("oğlak")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♑");
    let secenek11 = new MessageMenuOption()
      .setLabel("Kova")
      .setValue("kova")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♒");
    let secenek12 = new MessageMenuOption()
      .setLabel("Balık")
      .setValue("Balık")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("♓");
    let secenek13 = new MessageMenuOption()
      .setLabel("temizle")
      .setValue("temizle")
      .setDescription("Rolü almak için tıkla!")
      .setDefault()
      .setEmoji("🗑️");
    let menu = new MessageMenu()
      .setID("MENU")
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder("Burç Rollerini Seçebilirsiniz")
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
      .addOption(secenek13);
    let menumesaj = await message.channel.send(
      "Aşağıdaki menüye tıklayarak Burç Rollerini seçebilirsin!",
      menu
    );
    function menuselection(menu) {
      switch (menu.values[0]) {
        case "koç":
          menu.reply.send("<@&884123886730502145> Rolü verildi", true);
          menu.clicker.member.roles.add("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "boğa":
          menu.reply.send("<@&884123887795834940> Rolü verildi", true);
          menu.clicker.member.roles.add("884123887795834940");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "ikizler":
          menu.reply.send("<@&884123888529858621> Rolü verildi", true);
          menu.clicker.member.roles.add("884123888529858621");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "yengeç":
          menu.reply.send("<@&884123889356128286> Rolü verildi", true);
          menu.clicker.member.roles.add("884123889356128286");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "aslan":
          menu.reply.send("<@&884123890081751060> Rolü verildi", true);
          menu.clicker.member.roles.add("884123890081751060");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "başak":
          menu.reply.send("<@&884123890857705472> Rolü verildi", true);
          menu.clicker.member.roles.add("884123890857705472");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "terazi":
          menu.reply.send("<@&884123891570733096> Rolü verildi", true);
          menu.clicker.member.roles.add("884123891570733096");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "akrep":
          menu.reply.send("<@&884123892266987541> Rolü verildi", true);
          menu.clicker.member.roles.add("884123892266987541");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "yay":
          menu.reply.send("<@&884123893084860436> Rolü verildi", true);
          menu.clicker.member.roles.add("884123893084860436");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "oğlak":
          menu.reply.send("<@&884123893563027497> Rolü verildi", true);
          menu.clicker.member.roles.add("884123893563027497");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "kova":
          menu.reply.send("<@&884123894871654470> Rolü verildi", true);
          menu.clicker.member.roles.add("884123894871654470");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123896016695297");
          break;
        case "balık":
          menu.reply.send("<@&884123896016695297> Rolü verildi", true);
          menu.clicker.member.roles.add("884123896016695297");
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          break;

        case "temizle":
          menu.reply.send("Roller alındı", true);
          menu.clicker.member.roles.remove("884123886730502145");
          menu.clicker.member.roles.remove("884123887795834940");
          menu.clicker.member.roles.remove("884123888529858621");
          menu.clicker.member.roles.remove("884123889356128286");
          menu.clicker.member.roles.remove("884123890081751060");
          menu.clicker.member.roles.remove("884123890857705472");
          menu.clicker.member.roles.remove("884123891570733096");
          menu.clicker.member.roles.remove("884123892266987541");
          menu.clicker.member.roles.remove("884123893084860436");
          menu.clicker.member.roles.remove("884123893563027497");
          menu.clicker.member.roles.remove("884123894871654470");
          menu.clicker.member.roles.remove("884123896016695297");
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
          menu.reply.send("<@&915268334625370143> Rolü verildi", true);
          menu.clicker.member.roles.add("915268334625370143");
          menu.clicker.member.roles.remove("884123904262680686");
          break;
        case "partner":
          menu.reply.send("<@&884123904262680686> Rolü verildi", true);
          menu.clicker.member.roles.add("884123904262680686");
          menu.clicker.member.roles.remove("915268334625370143");
          break;
        case "temizle":
          menu.reply.send("Roller alındı", true);
          menu.clicker.member.roles.remove("915268334625370143");
          menu.clicker.member.roles.remove("884123904262680686");
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
          menu.reply.send("<@&915023584613773333> Rolü verildi", true);
          menu.clicker.member.roles.add("915023584613773333");
          menu.clicker.member.roles.remove("914990812947947573");
          menu.clicker.member.roles.remove("914991248278974495");
          menu.clicker.member.roles.remove("914991839294128168");
          menu.clicker.member.roles.remove("914991907644518410");
          menu.clicker.member.roles.remove("914992001315917844");
          menu.clicker.member.roles.remove("914992030797676616");
          menu.clicker.member.roles.remove("914994035725324308");
          menu.clicker.member.roles.remove("914994197638053948");
          menu.clicker.member.roles.remove("914994803299725312");
          break;
        case "#ZaafYok":
          menu.reply.send("<@&914990812947947573> Rolü verildi", true);
          menu.clicker.member.roles.add("914990812947947573");
          menu.clicker.member.roles.remove("915023584613773333");
          menu.clicker.member.roles.remove("914991248278974495");
          menu.clicker.member.roles.remove("914991839294128168");
          menu.clicker.member.roles.remove("914991907644518410");
          menu.clicker.member.roles.remove("914992001315917844");
          menu.clicker.member.roles.remove("914992030797676616");
          menu.clicker.member.roles.remove("914994035725324308");
          menu.clicker.member.roles.remove("914994197638053948");
          menu.clicker.member.roles.remove("914994803299725312");
          break;
        case "#kimseciklerbaşkaşgöz":
          menu.reply.send("<@&914991248278974495> Rolü verildi", true);
          menu.clicker.member.roles.add("914991248278974495");
          menu.clicker.member.roles.remove("915023584613773333");
          menu.clicker.member.roles.remove("914990812947947573");
          menu.clicker.member.roles.remove("914991839294128168");
          menu.clicker.member.roles.remove("914991907644518410");
          menu.clicker.member.roles.remove("914992001315917844");
          menu.clicker.member.roles.remove("914992030797676616");
          menu.clicker.member.roles.remove("914994035725324308");
          menu.clicker.member.roles.remove("914994197638053948");
          menu.clicker.member.roles.remove("914994803299725312");
          break;
        case "#keyfimmeyfim10numara":
          menu.reply.send("<@&914991839294128168> Rolü verildi", true);
          menu.clicker.member.roles.add("914991839294128168");
          menu.clicker.member.roles.remove("915023584613773333");
          menu.clicker.member.roles.remove("914990812947947573");
          menu.clicker.member.roles.remove("914991248278974495");
          menu.clicker.member.roles.remove("914991907644518410");
          menu.clicker.member.roles.remove("914992001315917844");
          menu.clicker.member.roles.remove("914992030797676616");
          menu.clicker.member.roles.remove("914994035725324308");
          menu.clicker.member.roles.remove("914994197638053948");
          menu.clicker.member.roles.remove("914994803299725312");
          break;
        case "şerefsiz insan sevmem !?!":
          menu.reply.send("<@&914991907644518410> Rolü verildi", true);
          menu.clicker.member.roles.add("914991907644518410");
          menu.clicker.member.roles.remove("915023584613773333");
          menu.clicker.member.roles.remove("914990812947947573");
          menu.clicker.member.roles.remove("914991248278974495");
          menu.clicker.member.roles.remove("914991839294128168");
          menu.clicker.member.roles.remove("914992001315917844");
          menu.clicker.member.roles.remove("914992030797676616");
          menu.clicker.member.roles.remove("914994035725324308");
          menu.clicker.member.roles.remove("914994197638053948");
          menu.clicker.member.roles.remove("914994803299725312");
          break;
        case "çekemeyen riv riv riv":
          menu.reply.send("<@&914992001315917844> Rolü verildi", true);
          menu.clicker.member.roles.add("914992001315917844");
          menu.clicker.member.roles.remove("915023584613773333");
          menu.clicker.member.roles.remove("914990812947947573");
          menu.clicker.member.roles.remove("914991248278974495");
          menu.clicker.member.roles.remove("914991839294128168");
          menu.clicker.member.roles.remove("914991907644518410");
          menu.clicker.member.roles.remove("914992030797676616");
          menu.clicker.member.roles.remove("914994035725324308");
          menu.clicker.member.roles.remove("914994197638053948");
          menu.clicker.member.roles.remove("914994803299725312");
          break;
        case "#primyok":
          menu.reply.send("<@&914992030797676616> Rolü verildi", true);
          menu.clicker.member.roles.add("914992030797676616");

          menu.clicker.member.roles.remove("915023584613773333");
          menu.clicker.member.roles.remove("914990812947947573");
          menu.clicker.member.roles.remove("914991248278974495");
          menu.clicker.member.roles.remove("914991839294128168");
          menu.clicker.member.roles.remove("914991907644518410");
          menu.clicker.member.roles.remove("914992001315917844");
          menu.clicker.member.roles.remove("914994035725324308");
          menu.clicker.member.roles.remove("914994197638053948");
          menu.clicker.member.roles.remove("914994803299725312");
          break;
        case "mezemdi rakıma":
          menu.reply.send("<@&914994035725324308> Rolü verildi", true);
          menu.clicker.member.roles.add("914994035725324308");
          menu.clicker.member.roles.remove("915023584613773333");
          menu.clicker.member.roles.remove("914990812947947573");
          menu.clicker.member.roles.remove("914991248278974495");
          menu.clicker.member.roles.remove("914991839294128168");
          menu.clicker.member.roles.remove("914991907644518410");
          menu.clicker.member.roles.remove("914992001315917844");
          menu.clicker.member.roles.remove("914992030797676616");
          menu.clicker.member.roles.remove("914994197638053948");
          menu.clicker.member.roles.remove("914994803299725312");
          break;
        case "Abdülfettah":
          menu.reply.send("<@&914994197638053948> Rolü verildi", true);
          menu.clicker.member.roles.add("914994197638053948");
          menu.clicker.member.roles.remove("915023584613773333");
          menu.clicker.member.roles.remove("914990812947947573");
          menu.clicker.member.roles.remove("914991248278974495");
          menu.clicker.member.roles.remove("914991839294128168");
          menu.clicker.member.roles.remove("914991907644518410");
          menu.clicker.member.roles.remove("914992001315917844");
          menu.clicker.member.roles.remove("914992030797676616");
          menu.clicker.member.roles.remove("914994035725324308");
          menu.clicker.member.roles.remove("914994803299725312");
          break;
        case "hani benim beynim":
          menu.reply.send("<@&914994803299725312> Rolü verildi", true);
          menu.clicker.member.roles.add("914994803299725312");
          menu.clicker.member.roles.remove("915023584613773333");
          menu.clicker.member.roles.remove("914990812947947573");
          menu.clicker.member.roles.remove("914991248278974495");
          menu.clicker.member.roles.remove("914991839294128168");
          menu.clicker.member.roles.remove("914991907644518410");
          menu.clicker.member.roles.remove("914992001315917844");
          menu.clicker.member.roles.remove("914992030797676616");
          menu.clicker.member.roles.remove("914994035725324308");
          menu.clicker.member.roles.remove("914994197638053948");
          break;
        case "temizle":
          menu.reply.send("Roller alındı", true);

          menu.clicker.member.roles.remove("915023584613773333");
          menu.clicker.member.roles.remove("914990812947947573");
          menu.clicker.member.roles.remove("914991248278974495");
          menu.clicker.member.roles.remove("914991839294128168");
          menu.clicker.member.roles.remove("914991907644518410");
          menu.clicker.member.roles.remove("914992001315917844");
          menu.clicker.member.roles.remove("914992030797676616");
          menu.clicker.member.roles.remove("914994035725324308");
          menu.clicker.member.roles.remove("914994197638053948");
          menu.clicker.member.roles.remove("914994803299725312");
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
      .setLabel("İdare Edemem")
      .setValue("İdare Edemem")
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
      .setLabel("Ben sana koşuyorum sen b'ye...")
      .setValue("Ben sana koşuyorum sen b'ye...")
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
      .setLabel("Düşman bana ben sana düştüm...")
      .setValue("Düşman bana ben sana düştüm...")
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
      .setLabel("Alırsan colt, olursun lord")
      .setValue("Alırsan colt, olursun lord")
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
          menu.reply.send("<@&914994920299847720> Rolü verildi", true);
          menu.clicker.member.roles.add("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "aşk acısı çekiyorum":
          menu.reply.send("<@&914995151070429234> Rolü verildi", true);
          menu.clicker.member.roles.add("914995151070429234");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "İdare Edemem Anne":
          menu.reply.send("<@&914996040439066714> Rolü verildi", true);
          menu.clicker.member.roles.add("914996040439066714");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "hayatcokzor":
          menu.reply.send("<@&914996093635420160> Rolü verildi", true);
          menu.clicker.member.roles.add("914996093635420160");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "gözü olanın gözü çıksın":
          menu.reply.send("<@&914996152007528458> Rolü verildi", true);
          menu.clicker.member.roles.add("914996152007528458");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "Kayan yıldızda dilediğim dileksin":
          menu.reply.send("<@&884123897140764722> Rolü verildi", true);
          menu.clicker.member.roles.add("884123897140764722");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "Çalıştıkça parlar, Ekibim altın demir.":
          menu.reply.send("<@&892700069000790046> Rolü verildi", true);
          menu.clicker.member.roles.add("892700069000790046");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "Bugün varsın, Yarın ben istersem.":
          menu.reply.send("<@&892700435184517121> Rolü verildi", true);
          menu.clicker.member.roles.add("892700435184517121");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "Güneş gibi doğup, Daha da yükseleceğiz.":
          menu.reply.send("<@&892700070623981589> Rolü verildi", true);
          menu.clicker.member.roles.add("892700070623981589");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "Sadece gülüşümü yakala,":
          menu.reply.send("<@&915395974631936020> Rolü verildi", true);
          menu.clicker.member.roles.add("915395974631936020");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "Ben sana koşuyorum sen b'ye...":
          menu.reply.send("<@&915396334142513212> Rolü verildi", true);
          menu.clicker.member.roles.add("915396334142513212");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "Geleceğime flash atsam parlar mı?":
          menu.reply.send("<@&915396356623986710> Rolü verildi", true);
          menu.clicker.member.roles.add("915396356623986710");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "Düşman bana ben sana düştüm...":
          menu.reply.send("<@&915397237130027018> Rolü verildi", true);
          menu.clicker.member.roles.add("915397237130027018");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "Olursan keleşçi olmazsın beleşçi.":
          menu.reply.send("<@&915397256386076724> Rolü verildi", true);
          menu.clicker.member.roles.add("915397256386076724");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397289042915379");
          break;
        case "Alırsan colt, olursun lord":
          menu.reply.send("<@&915397289042915379> Rolü verildi", true);
          menu.clicker.member.roles.add("915397289042915379");
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");

          break;
        case "temizle":
          menu.reply.send("Roller alındı", true);
          menu.clicker.member.roles.remove("914994920299847720");
          menu.clicker.member.roles.remove("914995151070429234");
          menu.clicker.member.roles.remove("914996040439066714");
          menu.clicker.member.roles.remove("914996093635420160");
          menu.clicker.member.roles.remove("914996152007528458");
          menu.clicker.member.roles.remove("884123897140764722");
          menu.clicker.member.roles.remove("892700069000790046");
          menu.clicker.member.roles.remove("892700435184517121");
          menu.clicker.member.roles.remove("892700070623981589");
          menu.clicker.member.roles.remove("915395974631936020");
          menu.clicker.member.roles.remove("915396334142513212");
          menu.clicker.member.roles.remove("915396356623986710");
          menu.clicker.member.roles.remove("915397237130027018");
          menu.clicker.member.roles.remove("915397256386076724");
          menu.clicker.member.roles.remove("915397289042915379");

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
