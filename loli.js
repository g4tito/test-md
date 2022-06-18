const { default: NexusNwIncConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState(`./${sessionName}.json`)
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')

async function startGojoMdNx() {
    const GojoMdNx = NexusNwIncConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['Gojo Satoru\Nexus','Safari','1.0.0'],
        auth: state
    })

    store.bind(GojoMdNx.ev)

