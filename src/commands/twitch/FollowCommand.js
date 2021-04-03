const BaseCommand = require('../../utils/structures/BaseCommand');
const fetch = require('node-fetch');
const Discord = require('discord.js');
var fs = require('fs');
var readline = require('readline');
var cntr = 0;
const talkedRecently = new Set();
let cooldown;
let max;

module.exports = class FollowCommand extends BaseCommand {
	constructor() {
		super('tfollow', 'twitch', []);
	}

	async run(client, message, args, member) {
		if (talkedRecently.has(message.author.id)) {
			message.channel.send(
				'You are currently on cooldown please wait... - ' +
					messsage.author.username
			);
		} else {
			if (isNaN(args[1])) {
				return message.channel.send({embed: {
					color: 16776960,
					description: "The correctly command is: **/tfollow** (**channel**) (**amount**)"
				  }});
            }

			if (message.member.roles.cache.has('827259214363492404')) {
                if (args[1] > 17500) {
				return message.channel.send({embed: {
					color: 16776960,
					description: "You can not use more than ``17500`` followers with the **God** plan"
				  }});
            }};


			if (message.member.roles.cache.has('826771025571479563')) {
                if (args[1] > 12500) {
				return message.channel.send({embed: {
					color: 16776960,
					description: "You can not use more than ``12500`` followers with the **Premium** plan"
				  }});
            }};



			if (message.member.roles.cache.has('826760741808767006')) {
                if (args[1] > 7500) {
				return message.channel.send({embed: {
					color: 16776960,
					description: "You can not use more than ``7500`` followers with the **Emerald** plan"
				  }});
            }};


			if (message.member.roles.cache.has('825379709952065546')) {
                if (args[1] > 2080) {
				return message.channel.send({embed: {
					color: 16776960,
					description: "You can not use more than ``2080`` followers with the **Premium** plan"
				  }});
            }};


			if (message.member.roles.cache.has('826731987758219316')) {
                if (args[1] > 750) {
				return message.channel.send({embed: {
					color: 16776960,
					description: "You can not use more than ``750`` followers with the **Platinium** plan"
				  }});
            }};

			if (message.member.roles.cache.has('826125086892359760')) {
                if (args[1] > 1180) {
				return message.channel.send({embed: {
					color: 16776960,
					description: "You can not use more than ``1180`` followers with the **Diamond** plan"
				  }});
            }};

            if (message.member.roles.cache.has('')) {
                if (args[1] > 430) {
				return message.channel.send({embed: {
                    color: 16776960,
                    description: "You can not use more than ``430`` followers with the **Gold** plan"
                  }});
            }};       

            
            if (message.member.roles.cache.has('821391872219021348')) {
                if (args[1] > 70) {
				return message.channel.send({embed: {
                    color: 16776960,
                    description: "You can not use more than ``70`` followers with the **Bronze** plan"
                  }});
            }};


			if (message.member.roles.cache.has('825065920975863859')) {
			    if (args[1] > 250) {
				return message.channel.send({embed: {
                    color: 16776960,
                    description: "You can not use more than ``250`` followers with the **Booster** plan"
                  }});
            }};

			if (message.member.roles.cache.has('824971060793180180')) {
			    if (args[1] > 25) {
				return message.channel.send({embed: {
                    color: 16776960,
                    description: "You can not use more than ``25`` followers with the **Basic** plan"
                  }});
            }};

			if (message.member.roles.cache.has('827114812164931595')) {
			    if (args[1] > 15000) {
				return message.channel.send({embed: {
                    color: 16776960,
                    description: "You can not use more than ``15000`` followers with the **faris** role"
                  }});
            }};


			let id = await fetch(
				`https://api.twitch.tv/helix/users?login=${args[0].toString()}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer awrxthdsaol34wuqzyvwf3c2r3hghg',
						'Client-id': 'kimne78kx3ncx6brgo4mv6wki5h1ko'
					}
				}
			);
			
		    let json = await id.json();
			let sending = new Discord.MessageEmbed()
				.setAuthor(
			   `Adding ${args[1]} Twitch followers!`, 
					json.data[0].profile_image_url,
					`https://www.twitch.tv/${json.data[0].display_name}`
				).setColor('#aaff00')
				.addField('Channel name', json.data[0].display_name)
				.addField('Channel ID', json.data[0].id) 
				.setFooter(`You may run this command again in 5 minutes.`);
				
			message.channel.send(sending);
			console.log(
				`Adding ${args[1]} follows to ${
					json.data[0].display_name
				} || Executed by: ${message.author.username}`
				
			);
			
			var rl = readline.createInterface({
				input: fs.createReadStream('./all.txt')
			});
			rl.on('line', function(line) {
				if (cntr++ < args[1]) {
					fetch('https://gql.twitch.tv/gql', {
						headers: {
							accept: '*/*',
							'accept-language': 'en-US',
							authorization: `OAuth ${line}`,
							'client-id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
							'content-type': 'text/plain;charset=UTF-8',
							'sec-ch-ua':
								'"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
							'sec-ch-ua-mobile': '?0',
							'sec-fetch-dest': 'empty',
							'sec-fetch-mode': 'cors',
							'sec-fetch-site': 'same-site',
							'x-device-id': 'fkWkLSFgnouOunvs9uZvuJa0xrtCxKom'
						},
						referrer: 'https://www.twitch.tv/',
						referrerPolicy: 'strict-origin-when-cross-origin',
						body: `[{\"operationName\":\"FollowButton_FollowUser\",\"variables\":{\"input\":{\"disableNotifications\":false,\"targetID\":\"${
							json.data[0].id
						}\"}},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"3efee1acda90efdff9fef6e6b4a29213be3ee490781c5b54469717b6131ffdfe\"}}}]`,
						method: 'POST',
						mode: 'cors'
					}).catch(err => console.log(err));
				}
			});
			cntr = 0;
			talkedRecently.add(message.author.id);
			setTimeout(() => {
				talkedRecently.delete(message.author.id);
			}, 60000);
		}
	}
};