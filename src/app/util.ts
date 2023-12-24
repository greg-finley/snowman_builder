function getRandom<T> (list: T[]): T {
    return list[Math.floor((Math.random()*list.length))];
  }

export const randomHead = () => getRandom( [0,1,2,3].map((i) => `/head${i}.png`));
    
