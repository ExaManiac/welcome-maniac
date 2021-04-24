const Discord = require('discord.js');
const tokens = [
    "ODI3NjU2MjY5NDM4OTEwNDk1.YGeM9w.DeFjoKjXlFUK5ZG98ChOOB4oX4M",
    "ODI3NjU3Njc2OTA4NjU4Njk4.YGeORw.FxVgAMaLd_f1Gldj0a6Um1vi4ZU",
    "ODI3NjU3OTkzMDI1NDg2ODc5.YGeOkg.q2Mhk6US3ADF-XRuXAdiJW4he4w",
    "ODI3NjU4MTE2OTMzNDg0NTQ1.YGeOsA.RyFEVU02K7tzKsakomAwPbOrSwg",
    "ODI3NjU4Mjg4NTk0Mjg4NjQx.YGeO2Q.fNpnwMe1BaOPmfQqba6MWEhfUXc"
];
const chnls = [
  "827534432134627368",
    "827534497485684741",
    "827534497587265557",
    "827534498639773737",
    "827534519414423603"
];
const selamlı = [];
for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let concon;
    client.on('ready', async () => {
        console.log(client.user.username);
        await client.user.setActivity({
            name: "❤️ exa",
            type: "PLAYING"
        });
        concon = await client.channels.cache.get(chnls[index]).join()
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === chnls[index])) {
            if (cur.channelID === prev.channelID) return;
            if (selamlı.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("826172886335094844").rawPosition)) {//ROLID
                //console.log(selamlı);
                ses = await concon.play('./tekrardan.mp3');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("826172886335094844").rawPosition)) { //ROLID
                ses = await concon.play('https://cdn.glitch.com/1bcb43f2-6e13-4713-907f-8cd3a2c9359a%2FAUD-20210402-WA0020.opus?v=1617485583183');
                selamlı.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get('827448128177307659').rawPosition) {//ROLID
                ses = await concon.play('https://cdn.glitch.com/1bcb43f2-6e13-4713-907f-8cd3a2c9359a%2FAUD-20210402-WA0019.opus?v=1617485582348');
                selamlı.push(cur.member.user.id);
            }
        }
        if (prev.channel && (prev.channel.id === chnls[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    client.on('guildMemberUpdate', async (prev, cur) => {
        if (concon.channel.members.some(biri => biri.user.id === cur.user.id)) {
            if ((prev.roles.highest.rawPosition < cur.roles.highest.rawPosition)) {
                ses = await concon.play('./elveda.mp3');
            }
        } else return;
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) concon = await client.channels.cache.get(chnls[index]).join();
    })
}
