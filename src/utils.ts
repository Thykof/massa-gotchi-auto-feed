import {
  Client,
  IAccount,
  IBaseAccount,
  ProviderType,
  PublicApiClient,
  WalletClient,
  Web3Account,
} from '@massalabs/massa-web3';

export const getClient = async (
  secretKey: string,
): Promise<{
  client: Client;
  account: IAccount;
  baseAccount: IBaseAccount;
  chainId: bigint;
}> => {
  const account = await WalletClient.getAccountFromSecretKey(secretKey);

  const clientConfig = {
    retryStrategyOn: true,
    providers: [
      { url: process.env.JSON_RPC_URL_PUBLIC!, type: ProviderType.PUBLIC },
    ],
    periodOffset: 9,
  };

  const publicApi = new PublicApiClient(clientConfig);
  const status = await publicApi.getNodeStatus();

  const web3account = new Web3Account(account, publicApi, status.chain_id);
  const client = new Client(clientConfig, web3account, publicApi);

  return {
    client,
    account,
    baseAccount: client.wallet().getBaseAccount()!,
    chainId: status.chain_id,
  };
};
