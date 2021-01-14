const Discord = require('discord.js');

exports.run = (client, message, args) => {
  
  message.channel.send('Bu Bir Örnek Komuttur xd')
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'örnek',
  description: 'nobles api',
  usage: 'örnek'
};