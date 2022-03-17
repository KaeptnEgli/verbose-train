// import LedgerLiveApi, { ExchangeType, WindowMessageTransport, BitcoinTransaction, FAMILIES } from "@ledgerhq/live-app-sdk";
// import { BigNumber } from "bignumber.js";

// const llapi = new LedgerLiveApi(new WindowMessageTransport());

// async () => {
//     const transactionId = await llapi.startExchange({
//         exchangeType: ExchangeType.SELL,
//     });

//     const transaction: BitcoinTransaction = {
//         amount: new BigNumber(1), // Correspond to 1 satoshi or 0.00000001 BTC
//         recipient: "3EiKp7oPiEx96AmLRLiCPojZcJkQr6KqAD",
//         family: FAMILIES.BITCOIN,
//     };

//     /* binaryPayload generation */
// // get a Byte Array (binary) representation of the protobuf data    
// const payload: Buffer = Buffer.from(protobufData);
// // base64url encode the payload
// const binaryPayload: Buffer = Buffer.from(base64url(payload));

// /* signature generation */
// // create the message to be signed from the binaryPayload
// const message = Buffer.concat([Buffer.from('.'), binaryPayload])
// // create a sha256 digest of the message
// const digest: Buffer = Buffer.from(sha256.sha256.array(message));
// // sign the message using your private key
// const signature = Buffer.from(secp256r1.sign(digest, YOUR_PRIVATE_KEY).signature)
// }
// }
