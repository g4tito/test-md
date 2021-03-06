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
} = require('@adiwajshing/baileys')

const { state, saveState } = useSingleFileAuthState('./test.json')

const fs = require('fs')
const pino = require('pino')
const axios = require("axios")
const { exec, spawn, execSync } = require("child_process")

async function start() { //Inicio
	const client = makeWASocket({
		printQRInTerminal: true,
		logger: pino({ level: 'silent' }),
		browser: ['Test-MD', 'Chrome', '3.0'],
		auth: state
	})
console.log('Conectado :3')

client.ev.on('group-participants.update', async (anu) => {
  console.log(anu)
})

client.ev.on('messages.upsert', async (up) => {
  console.log(up)
})

} //Final

start()
