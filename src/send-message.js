require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id :  '1210528531713495052',
        label: "Moon's Live"
    },
    {
       id :  '859614524331524096',
       label: 'League of Legends Notifications'
    },
    {
        id :  '1188253627035430943',
        label: "STEAM Multiplayer Notifications"
    },
    {
        id :  '985037376206299166',
        label: 'Game Night'
    },    
]


client.on('ready', async (c) => {
    try {
      const channel = await client.channels.cache.get('1210530091717754902');
      if (!channel) return;
      
      const row = new ActionRowBuilder();

      roles.forEach((role) => {
        row.components.push(
            new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setStyle(ButtonStyle.Primary)
        )
      })


      await channel.send({
        content : 'Click below to claim some roles!',
        components : [row],
    })
    console.log('✅ Roles were posted successfully!');

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);