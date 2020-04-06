const Discord = require('discord.js');
exports.run = (Bot, message, args) => {

  //Check for Admin Perms
  if (message.member.hasPermission("ADMINISTRATOR")) {
    let userMention = message.mentions.members;
    let roleMention = message.mentions.roles;
    var noRoleArray = [];
    var roleArray = [];

    //Look if the User did something wrong and if he did return an error!
    if (!roleMention.first() || !userMention.first())
      return message.channel.send('You forgot some parameters! Look at the help!').then(msg => msg.delete(5000));

    var indexRole = 0;
    roleMention.forEach((checkRole) => {
      indexRole++;
      var indexUser = 0;
      userMention.forEach((checkUser) => {
        if (checkUser.roles.has(checkRole.id) === false) {
          noRoleArray.push(`${checkUser.user.tag}`);
        } else {
          roleArray.push(`${checkUser.user.tag}`);
        }
        indexUser++;
        if (indexUser === userMention.size && indexRole === roleMention.size) {
          let embed = new Discord.RichEmbed();
          if(noRoleArray.sort().join(',') === roleArray.sort().join(',')){
            console.log('same members');
            return;
          }
          embed.setTitle("Users without roles:");
          removeDuplicates(noRoleArray).filter(val => !roleArray.includes(val)).forEach((noRole) => {
            embed.addField(`${noRole}`, "--------");
          });
          message.reply({embed});
        }
      });
    });
  }
};

function removeDuplicates(arr){
    let unique_array = [];
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i]);
        }
    }
    return unique_array;
}
