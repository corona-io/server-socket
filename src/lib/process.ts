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
      await rclient.lrem('playerList',1,str[1]); 
      break;
    case 'lv999boss':
      break;
  }
  return;
});

export const newUser = (async () => {
  const list = await rclient.lrange('playerList',0,-1);
  if (list.length == 0) {
    return 0
  }
  let hp = [];
  let x = [];
  let y = [];
  
  for (let i = 0; i < list.length; i++) {
    await hp.push(await rclient.hget(list[i],'hp'));
    await x.push(await rclient.hget(list[i],'x'));
    await y.push(await rclient.hget(list[i],'y'));
  }
  return {list, hp, x, y};
});