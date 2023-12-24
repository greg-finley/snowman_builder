import _ from 'lodash';

export const randomHead = () => _.sample( [0,1,2,3].map((i) => `/head${i}.png`));
    
