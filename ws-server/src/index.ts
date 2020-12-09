import { Server as WebSockerServer } from 'ws';
 
const wss: WebSockerServer = new WebSockerServer({
  port: 5000,
});

const connections: WebSocket[] = [];

 const history:any = [];

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
    history.push(...JSON.parse(event.data));
    connections.filter((client) => ws).forEach((client) => {
      client.send(event.data);
    });
  };
});
