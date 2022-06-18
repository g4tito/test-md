
//Simple base Kaori-Bot_MD "TEST" uwu 

const {
	default: makeWASocket,
	generateWAMessageFromContent,
	downloadContentFromMessage, 
	generateWAMessageContent, 
	WA_DEFAULT_EPHEMERAL,
	prepareWAMessageMedia,
	useSingleFileAuthState,
	generateWAMessage,
	DisconnectReason,
	downloadHistory,
	getMessage, 
	BufferJSON, 
	proto
} = require('@adiwajshing/baileys-md')
const { state, saveState } = useSingleFileAuthState('./KaoriMD.json')
//
const fs = require('fs')
const pino = require('pino')
const chalk = require('chalk')
const axios = require("axios")
const ffmpeg = require('fluent-ffmpeg')
const moment = require("moment-timezone")
const { exec, spawn, execSync } = require("child_process")
//
const { color, mylogs } = require('./libreria/color')
const { fetchJson, getBase64, kyun, createExif } = require('./libreria/fetcher')
const { sleep, uploadImages, getBuffer, getGroupAdmins, getRandom } = require('./libreria/functions')
//
Publi_Priv = true
prefix = "."
//
async function start() {
	const client = makeWASocket({
		printQRInTerminal: true,
		logger: pino({ level: 'silent' }),
		browser: ['Kaori-MD', 'Chrome', '3.0'],
		auth: state
	})
    console.log(color('Conectado :3'))
//========================UwU========================//    
    client.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {
            let metadata = await client.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
                try {
                    ppuser = await client.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://i.ibb.co/q70WmhZ/Sin-Perfil-F.jpg'
                }

                if (anu.action == 'add') {
                    client.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `⚡ *Bienvenid@ @${num.split("@")[0]} a este grandioso grupo :*\n${metadata.subject}\n⚡ _Espero y te agrade tu estancia aqui, no olvides respetar a los participantes y las reglas_ ;)` })
                    
                } else if (anu.action == 'remove') {
                    client.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `*C fue alv : @${num.split("@")[0]}*` })
                }
            }
        } catch (err) {
            console.log(err)
        }
    })
//========================UwU========================//
	client.ev.on('messages.upsert', async (up) => {
		try {
			if (!up.messages) return
        const mek = up.messages[0]
        const fromMe = mek.key.fromMe
        const content = JSON.stringify(mek.message)
        const from = mek.key.remoteJid
        const type = Object.keys(mek.message)[0]
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'documentMessage') && mek.message.documentMessage.caption ? mek.message.documentMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId : (type === 'listResponseMessage' && mek.message.listResponseMessage.title) ? mek.message.listResponseMessage.title : ""
        const body = (type === 'conversation') ? mek.message.conversation : (type == 'imageMessage') ? mek.message.imageMessage.caption : (type == 'videoMessage') ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? mek.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (mek.message.buttonsResponseMessage?.selectedButtonId || mek.message.listResponseMessage?.singleSelectReply.selectedRowId || (type == 'listResponseMessage' ? mek.msg.singleSelectReply.selectedRowId : '') || mek.msg.text || mek.msg.caption || mek.msg || '') : ''
		const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		//
		const time = moment(Date.now()).tz('America/Lima').locale('pe').format('DD/MM/YY HH:mm:ss z')
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const args = body.trim().split(/ +/).slice(1)
        const ar = args.map((v) => v.toLowerCase())
        
		const UwU = args.join(' ')

        const botNumber = client.user.id.split(':')[0] + '@s.whatsapp.net'
        const ownerNumber = ["51995386439@s.whatsapp.net"]
        const isGroup = from.endsWith('@g.us')
        const sender = isGroup ? (mek.key.participant ? mek.key.participant : mek.participant) : mek.key.remoteJid
        
        const pushname =  mek.pushName || "A/Z"
        //const pushname2 = pushname.replace(/ .*/,'');

        const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupOwner = isGroup ? groupMetadata.owner : ''
        const groupDesc = isGroup ? groupMetadata.desc : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        //
        const isOwner = ownerNumber.includes(sender)
        const isGroupAdmins = groupAdmins.includes(sender) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        //
        const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'stickerMessage')
        const isQuotedMsg = (type == 'extendedTextMessage')
        const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

//Modo publico & privado :v
        if (!Publi_Priv) {
			if (!isOwner && !mek.key.fromMe) return
		}
//Funciones ✓
        const reply = (texto) => {
            client.sendMessage(from, { text: texto }, {sendEphemeral: true, quoted: mek })
        }
        const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
//AutoRPT
if (budy.includes("hola mundo")){
			reply(`*🌎 => 🌐 => [✓]*`)
	}



        switch (command) {
        	
        case 'test':
        reply(`*Hola ${pushname}!*`)
        break
//Fin. y jake
}
    } catch (e) {
		e = String(e)
        console.log(color('[ERROR]', 'red'), color(e, 'cyan'))
}
})
}
start()

//Auto Actualización :v
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.white(`\n${__filename} :\nFue actualizado con exito ✓\n`))
	delete require.cache[file]
	require(file)
})
