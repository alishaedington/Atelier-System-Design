import http from 'k6/http';

import { sleep, check } from 'k6';

export const options = {
  vus: 1500,
  duration: '15s',
};

export default function () {
  let res = http.get(`http://localhost:3000/reviews/meta?product_id=${2}`);
  sleep(1);

  check(res, {
    'status was 200': (r) => r.status === 200,
    'is duration < 100': (r) => r.timings.duration < 100,
    'is duration < 50': (r) => r.timings.duration < 50,
  });
}

// ${Math.ceil(Math.random() * 1000000)}
