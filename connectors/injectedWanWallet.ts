import LockConnector from '../src/connector';
import Web3 from 'web3';
import Web3Modal from '@wandevs/web3modal';
import { WanWalletConnector } from '@web3-react-wan/wanwallet-connector';

export default class Connector extends LockConnector {
  web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    disableInjectedProvider: false,
    providerOptions: {
      wanwallet: {
        package: new WanWalletConnector({
          chainId: 888,
          url: 'https://gwan-ssl.wandevs.org:56891',
          pollingInterval: 15000,
          requestTimeoutMs: 300000,
        }),
      }
    },
  });
  async connect() {
    let provider;
    if (window['injectWeb3']) {
      provider = await this.web3Modal.connectTo('wanwallet');
      try {
        const web3 = new Web3(provider);
        await web3.eth.getAccounts();
      } catch (e) {
        console.error(e);
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }
    return provider;
  }

  async isLoggedIn() {
    if (!window['injectWeb3']) return false;
    if (window['injectWeb3'].selectedAddress) return true;
    await new Promise(r => setTimeout(r, 400));
    return !!window['injectWeb3'].selectedAddress
  }
}
