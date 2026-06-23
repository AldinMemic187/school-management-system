import http from 'k6/http';
import { sleep, check } from 'k6';

// Test 22: Ljundrim Ganiji - Load/Spike Test
// Simulates a sudden spike of students submitting answers to an exam.
export const options = {
  stages: [
    { duration: '5s', target: 20 },   // Start with 20 users
    { duration: '5s', target: 200 },  // Spike to 200 users suddenly
    { duration: '15s', target: 200 }, // Hold high load
    { duration: '5s', target: 0 },    // Cooldown to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // submissions can take longer, but p95 must be < 1s
    http_req_failed: ['rate<0.05'],    // Less than 5% failure rate during spike
  },
};

export default function () {
  const url = 'https://localhost:7123/api/exam/submitAnswers';
  const payload = JSON.stringify({
    examId: 42,
    answers: {
      1: 2,
      2: 4,
      3: 1,
      4: 3,
    },
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(0.5); // Fast-paced submissions (0.5s think time)
}
