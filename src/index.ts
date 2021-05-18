import * as WebSocket from 'ws';
import rclient from 'redis-async';
import dotenv from 'dotenv';
import {process, newUser} from './lib/process';
dotenv.config();

const wss = new WebSocket.Server({ port: 3001 });
  
//console.log(rclient.lrange('player',0,-1));
rclient.set('enemy', 0);


wss.on('connection', async (ws: WebSocket, req : any) => {

  ws.on('message', async (message: any) => {
    message = await message.split(',');
    console.log('received: %s', message);
    process(message);

    wss.clients.forEach(async client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("brodcast: "+message);

        if (await rclient.get('enemy') < 30) {
          client.send("enemy: "+ await Math.random().toFixed(8));
          await rclient.set('enemy', await rclient.get('enemy') + 1);
        }
      }
    });
  });

  let list = await newUser();
  ws.send(`${list['list']}`);
  ws.send(`${list['hp']}`);
  ws.send(`${list['x']}`);
  ws.send(`${list['y']}`);
});

