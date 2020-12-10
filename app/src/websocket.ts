export interface IWebSocketHandler {
  sendMessage: (message:string) => void
  onMesageReceived: ((this: WebSocket, ev: MessageEvent<any>) => any) | null
}

const url = 'ws://localhost:5000';

class WebSocketHandler implements IWebSocketHandler {
  private static instance: WebSocketHandler;

  private channelIsOpen: boolean = false;

  private connection: WebSocket |null=null;

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

    this.connection.onerror = (event:Event) => {
      console.log(`WebSocket error: ${event}`);
    };
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

  public onMesageReceived = this.connection && this.channelIsOpen ? this.connection.onmessage : null
}

export default WebSocketHandler;
