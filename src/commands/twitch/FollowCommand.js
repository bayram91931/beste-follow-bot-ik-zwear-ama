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
		super('follow', 'twitch', []);
	}

	async run(client, message, args) {
		if (talkedRecently.has(message.author.id)) {
			message.channel.send(
				'You are currently on cooldown please wait... - ' +
					messsage.author.username
			);
		} else {
			if (isNaN(args[1])) {
				return message.channel.send(
					'**The correct format is .tfollow (ChannelName) (Amount)**'
				);
			}

			if (args[1] > 100000000000000000000000) {
				return message.channel.send(
					'Sorry, you cannot use that many follows with your current plan.'
				);
			}

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
					`${args[1]} Follows Added`,
					json.data[0].profile_image_url,
					`https://www.twitch.tv/${json.data[0].display_name}`
				)
				.addField('Channel Name', json.data[0].display_name)
				.addField('Channel ID', json.data[0].id)
				.setFooter(`You may run this command again in 1 minute.`);
			message.author.send(sending);
			console.log(
				`Sent ${args[1]} follows to ${
					json.data[0].display_name
				} || Executed by: ${message.author.username}`
			);

			var rl = readline.createInterface({
				input: fs.createReadStream('./src/all.txt')
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
