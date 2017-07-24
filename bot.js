const Discord = require("Discord.js")
var client = new Discord.Client();

client.on('ready', () => {
  console.log('Hypex Technologies: Bot has successfully launched!');
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setGame(`!help | on ${client.guilds.size} servers`);
});

client.on('guildCreate', () => {
  console.log('Hypex Technologies: Bot has entered server!');
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setGame(`!help | on ${client.guilds.size} servers`);
});



client.on('error', console.error);
client.on('disconnect', () => console.info("Bot has disconnected"));

const prefix = "!"

client.on('message', message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command === "start") {
  	message.channel.send("Bot is activating!")
  	message.guild.createRole({
    name: 'botaccess',
  	color: 'BLUE',
  })
  	message.channel.send("Bot has finished activating!")
  	message.channel.send("You only need to use this command once!")
  }
  
  if (command === "say") {
  	message.channel.send(args.join(" "));
  }

  
  

  if (command === "kick") {
  	let modRole = message.guild.roles.find("name", "Staff");
  	if(message.member.roles.has(modRole.id)) {
  	if (message.mentions.users.size < 1) return message.reply('Please specify a user to kick!');
  	let kickMember = message.guild.member(message.mentions.users.first());
  	kickMember.kick().then(member => {
  		message.reply('User was successfully kicked from the server!')
  	})
  	} else {
  		message.reply("You do not have permission to use this command!")
  	}
  	
  }


  if (command === "help") {
  	message.channel.send("```Here is a list of all of our commands!\n \n !kick @{user} - Kick mentioned user \n !say {Message} - Bot will repeat input \n ```")
  }

  if(command === "ban") {
    if(!message.member.roles.some(r=>["botaccess"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
});

client.on('guildMemberAdd', member => {
  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
  const channel = member.guild.channels.find('name', 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.login("YOUR TOKEN KEY HERE"); 
