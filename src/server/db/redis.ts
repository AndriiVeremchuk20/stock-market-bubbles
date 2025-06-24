import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: 'https://oriented-hagfish-46412.upstash.io',
  token: 'AbVMAAIjcDE0ZDRmNmFhMDYwMGU0ZjU3YTJlMTYwZDRhMjllYzFkM3AxMA',
})

redis.ping().then(()=>console.log("Conection success")).catch(()=>console.error("Conection Error"))

//export const redis  = new Redis(env.REDIS_URL, {maxRetriesPerRequest: 5, reconnectOnError: (err)=>{ 
//	console.log('[Redis Reconnect Triggered]');
//    return true;
//}});
