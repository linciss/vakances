import 'dotenv/config';
import { rateLimit } from 'express-rate-limit';

const limiter = (times) =>
  rateLimit({
    windowMs: 1000 * 60 * 10,
    limit: times,
    message:
      'Pārāk daudz pieprasījumu no jūsu IP adreses, lūdzu mēģiniet vēlāk!',
    statusCode: 429,
  });

export default limiter;
