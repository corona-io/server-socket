import rclient from 'redis-async';


export const process = (async (str) => {

  switch (str[0]) {
    case 'create':
      rclient.rpush('playerList',str[2]);
      rclient.hmset(str[2],{
        "hp":100,
        "x":str[3],
        "y":str[4]
      });
      break;
    case 'move':
      rclient.hmset(str[1],{
        "x":str[2],
        "y":str[3]
      });
      break;
    case 'attack':
      break;
    case 'damage':
      break;
    case 'ohmygod':
    
      break;
    case 'lv999boss':
      break;
  }





  return;
});