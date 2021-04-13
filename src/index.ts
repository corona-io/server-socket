import * as WebSocket from 'ws';
import rclient from 'redis-async';
import dotenv from 'dotenv';
import {process} from './lib/process';
dotenv.config();

const wss = new WebSocket.Server({ port: 3001 });
  
//rclient.rpush('player', 'apple', 'orange', 'apple');


wss.on('connection', (ws: WebSocket, req : any) => {

  ws.on('message', async (message: any) => {
    message = await message.split(',');
    console.log('received: %s', message);
    process(message);

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("brodcast: "+message);
        
      }
    });
  });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});