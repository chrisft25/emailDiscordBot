"use strict";
const nodemailer = require("nodemailer");
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

let email = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
    }
});

client.on('ready', () => {
  console.log(`Soy ${client.user.tag}!`);
});

client.on('message', msg => {

if(msg.mentions.users.map(e=>e.id).includes(process.env.TEACHER_ID)){

    msg.reply(`Encontré una mención hacia ${process.env.TEACHER_NAME} nyan~. Procederé a notificarle via e-mail`);

    let texto = msg.content.replace(`<@!${process.env.TEACHER_ID}>`,"").trim()

    const message = {
        from: process.env.EMAIL_USER, 
        to: process.env.TEACHER_EMAIL,  
        subject: `Consulta en Discord | ${msg.author.username}`, 
        text: `El usuario ${msg.author.username} ha hecho la siguiente consulta: "${texto}". En el canal #${msg.channel.name}` // Plain text body
    };

    email.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        }
    });
}

});

client.login(process.env.DISCORD_TOKEN);