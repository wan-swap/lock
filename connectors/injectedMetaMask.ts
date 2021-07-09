import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['ethereum']) {
      provider = window['ethereum'];
      try {
        // @ts-ignore
        await window['ethereum'].request({ method: 'eth_requestAccounts' })
      } catch (e) {
        console.error(e);
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }
    return provider;
  }

  async isLoggedIn() {
    if (!window['ethereum']) return false;
    if (window['ethereum'].selectedAddress) return true;
    await new Promise(r => setTimeout(r, 400));
    return !!window['ethereum'].selectedAddress
  }
}
