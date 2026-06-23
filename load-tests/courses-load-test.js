import http from 'k6/http';
import { sleep, check } from 'k6';

// Test 11: Aldin Memic - Load Test
// Simulates a realistic browsing load on the Course getAll endpoint.
export const options = {
  stages: [
    { duration: '10s', target: 50 },  // Ramp-up to 50 users
    { duration: '15s', target: 50 },  // Stay at 50 users
    { duration: '5s', target: 0 },    // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],    // Less than 1% request failure rate
  },
};

export default function () {
  const url = 'https://localhost:7123/api/course/getAll';
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const res = http.get(url, params);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0,
  });

  sleep(1); // User think-time of 1 second
}
