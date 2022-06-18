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
const chalk = require('chalk')
const axios = require("axios")
const ffmpeg = require('fluent-ffmpeg')
const moment = require("moment-timezone")
const { exec, spawn, execSync } = require("child_process")

async function start() {
	const client = makeWASocket({
		printQRInTerminal: true,
		logger: pino({ level: 'silent' }),
		browser: ['Test-MD', 'Chrome', '3.0'],
		auth: state
	})
console.log(color('Conectado :3'))

client.ev.on('group-participants.update', async (anu) => {
  console.log(anu)
})




start()
