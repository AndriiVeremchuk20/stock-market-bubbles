import ky from 'ky';
import { env } from '~/env.mjs';

const BASE_URL = 'https://api.tiingo.com/api/';
const Token = `Token ${env.TIINGO_API_KEY}`;

const headers = {
  'Content-Type': 'application/json',
  Authorization: Token,
};

export const client = ky.create({ prefixUrl: BASE_URL, headers });
