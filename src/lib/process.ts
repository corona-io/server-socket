import rclient from 'redis-async';


export const process = (async (str) => {

  switch (str[0]) {
    case 'create':
      rclient.hmset(str[2],{
        "hp":100,
        "x":str[3],
        "y":str[4]
      });
      break;
    case 'move':
      rclient.hmset(str[2],{
        "x":str[3],
        "y":str[4]
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