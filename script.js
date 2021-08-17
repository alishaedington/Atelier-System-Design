import http from 'k6/http';

import { sleep, check } from 'k6';

export const options = {
  vus: 100,
  duration: '10s',
};

export default function () {
  let res = http.get(`http://localhost:3000/reviews?product_id=${Math.ceil(Math.random() * 1000000)}`);
  sleep(1);

  check(res, {
    'status was 200': (r) => r.status === 200,
    'is duration < 50': (r) => r.timings.duration < 50,
  });
}
