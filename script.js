import http from 'k6/http';

import { sleep, check } from 'k6';

export const options = {
  vus: 2000,
  duration: '60s',
};

export default function() {
  let res = http.get(`http://localhost:3000/reviews/meta?product_id=${Math.ceil(Math.random() * 1000)}`);
  sleep(Math.floor(Math.random() * 4) + 1);

  check(res, {
    'status was 200': (r) => r.status === 200,
    'is duration < 100': (r) => r.timings.duration < 100,
    'is duration < 50': (r) => r.timings.duration < 50,
    'is duration > 2000': (r) => r.timings.duration < 2000,
  });
}

// ${Math.ceil(Math.random() * 1000)}
