export interface IWebSocketHandler {
  sendMessage: (message: string) => void
  setOnMesageReceivedHandler: (callBack: ((event: MessageEvent<any>) => void)) => void
  channelIsOpen: boolean
}

const url = 'ws://localhost:5000';

class WebSocketHandler implements IWebSocketHandler {
  private static instance: WebSocketHandler;

  private connection: WebSocket | null = null;

  public channelIsOpen: boolean = false;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.connection = new WebSocket(url);
    this.connection.onopen = () => {
      console.log(`Connection opened to ${url}`);
      this.channelIsOpen = true;
    };

    this.connection.onerror = (event: Event) => {
      console.log(`WebSocket error: ${event}`);
    };

    /*   this.connection.onmessage = (event: MessageEvent<any>) => {

      }; */
  }

  public static getInstance(): WebSocketHandler {
    if (!WebSocketHandler.instance) {
      WebSocketHandler.instance = new WebSocketHandler();
    }

    return WebSocketHandler.instance;
  }

  public sendMessage(message: string) {
    if (this.connection && this.channelIsOpen) {
      this.connection.send(message);
    }
  }

  public setOnMesageReceivedHandler(callBack: ((event: MessageEvent<any>) => void)): void {
    if (this.connection) {
      this.connection.onmessage = callBack;
    }
  }
}

export default WebSocketHandler;
