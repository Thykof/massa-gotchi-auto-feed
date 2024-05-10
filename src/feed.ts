import { Args, fromMAS } from '@massalabs/massa-web3';
import { getClient } from './utils';
import { config } from 'dotenv';
config();

const fee = 0n;
const coins = fromMAS('0');
const contractAddress = 'AS12WirWdurggUQSnRTx6cJ5DqwkdWJAkgBXx95yZhzxaWs5eSoaK';

const { client } = await getClient(process.env.WALLET_SECRET_KEY!);

setInterval(() => {
  for (const id of [184n, 200n, 231n]) {
    client.smartContracts().callSmartContract({
      fee,
      coins,
      targetAddress: contractAddress,
      targetFunction: 'feed',
      parameter: new Args().addU256(id),
    });
  }
}, 33 * 10 * 60 * 1000);
