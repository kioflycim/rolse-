const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")

exports.run = async (client, message, args) => {
 if (!message.member.roles.cache.has((ayarlar.commander)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${ayarlar.redemoji} Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
 if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().addField((ayarlar.sunucuadı) , `${ayarlar.redemoji} Bir kullanıcı etiketlemelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
 
  member.roles.add((ayarlar.taglırolü)); //rol
   
   


   const kanal = message.guild.channels.cache.find(c => c.id == (ayarlar.rollog));
   const embed1 = new Discord.MessageEmbed()
    .addField(
      (ayarlar.sunucuadı),
      `${ayarlar.onayemoji} **Rol verilen üye =>** ${member.user} \n **Rol veren yetkili =>** ${message.author} \n **Verilen rol =>** <@&${ayarlar.taglırolü}> `
    )
    .setColor("BLACK")
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();
  let embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .addField(
      (ayarlar.sunucuadı),
      `${ayarlar.onayemoji} ${member.user} **kullanıcısına başarıyla <@&${ayarlar.taglırolü}> rolü verildi!**`
    )
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();
  return message.channel.send(embed).then(kanal.send(embed1));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["taglı"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};
exports.help = {
  name: "taglı",
  description: "Manuel Olarak Taglı Rolü Vermek İstiyorsan Bu Komutu Dene!",
  usage: "tagges "
};
