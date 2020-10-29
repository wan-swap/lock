import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['wanchain']) {
      provider = window['wanchain'];
      try {
        await window['wanchain'].enable();
      } catch (e) {
        console.error(e);
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }
    return provider;
  }

  async isLoggedIn() {
    if (!window['wanchain']) return false;
    if (window['wanchain'].selectedAddress) return true;
    await new Promise(r => setTimeout(r, 400));
    return !!window['wanchain'].selectedAddress
  }
}
