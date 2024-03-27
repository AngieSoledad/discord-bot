require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on('interactionCreate', async (interaction) => {

  if (interaction.commandName === 'live') {
    const embed = new EmbedBuilder()
    .setTitle("silentM000N on Twitch")
    .setURL('https://www.twitch.tv/silentm000n')
    .setDescription("Hey lovelies, I'm LIVE! Have a seat and take a load off while you chill & chat with yours truly")
    .setImage('attachment://pfp.png')
    .setColor(0xa080e1);

    interaction.reply({ embeds: [embed], files: ['src/img/pfp.png']});
}

    if (interaction.isButton()) {
    await interaction.deferReply({ ephemeral: true});

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
        interaction.editReply({
            content : "I couldn't find that role",
            ephemeral : true,
        })
        return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`);
        return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added.`);

    if(!interaction.isChatInputCommand()) return;
}}
);

client.login(process.env.TOKEN);