import { action, makeAutoObservable, observable } from 'mobx';

import { URL } from '../constants';
import { JsonListScheme } from '../helpers/fetcher';

export class WsStore {
  ws = new WebSocket(URL);

  @observable messages: JsonListScheme[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action getObject = (id: number): JsonListScheme => {
    const pos = this.messages.findIndex((obj) => obj.id && obj.id === id);
    const obj = this.messages[pos];
    this.messages.splice(pos, 1);
    return obj;
  };

  @action sendItemRequest = (id: string, name: string, token: string): void => {
    const numberID = Number(id);
    if (numberID !== 0 && this.ws.readyState === 1) {
      this.ws.send(
        `{"id":${id},"command":{"Get":{"Item":{"name":"${name}","id":${numberID}}}},"addon":"${token}"}`,
      );
    }
  };

  @action sendListRequest = (name: string, token: string): void => {
    if (this.ws.readyState === 1) {
      this.ws.send(`{"command":{"Get":{"List":"${name}"}},"addon":"${token}"}`);
    }
  };
}
