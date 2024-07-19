// importando as dependencias bip39 bip32@2.0.6 bitcoinjs-lib --save
const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoin = require('bitcoinjs-lib')

//definir a rede --> .testenet é rede de testes. Para teste real colocar .bitcoin
const network = bitcoin.networks.testnet 

//derivação de endereços de carteiras HD (Hierarquical Deterministic)
const path = `m/49'/1'/0'/0`

//geração do mnemônico para seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed,network)

//criando uma conta - par de chaves privada e pública
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
    }).address

    console.log("Carteira Gerada")
    console.log("Endereço: ", btcAddress)
    console.log("Chave Privada: ", node.toWIF())
    console.log("Seed: ", mnemonic)