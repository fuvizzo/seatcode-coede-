import { Server as WebSockerServer } from 'ws';

interface IPatchData {
  [s: string]: [any?]
}

const wss: WebSockerServer = new WebSockerServer({
  port: 5000,
});

const connections: WebSocket[] = [];

const history: IPatchData = {
  userList: []
};

wss.on('connection', (ws: WebSocket) => {
  console.log('Starting web socket server');
  connections.push(ws);
  ws.send(JSON.stringify(history));

  ws.onclose = () => {
    const index: number = connections.indexOf(ws);
    if (index !== -1) {
      connections.splice(index, 1);
    }
  };

  ws.onmessage = (event: MessageEvent) => {
    console.log(event.data);
    const data = JSON.parse(event.data);
    Object.keys(data).forEach((key: string) => {
      history[key].push(...data[key]);
    });
    console.log(history);
    connections.filter((client) => ws !== client).forEach((client) => {
      client.send(event.data);
    });
  };
});
