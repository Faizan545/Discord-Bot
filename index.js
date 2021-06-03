const Discord = require('discord.js');
require('dotenv').config();
const prefix = process.env.PREFIX;
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES']});


const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Mental Help bot is online')
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'tiktok'){
        client.commands.get('tiktok').execute(message, args);
    }
});



client.login(process.env.TOKEN);