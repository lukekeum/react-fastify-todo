import { config } from 'dotenv';
import { resolve } from 'path';

const { NODE_ENV } = process.env;

const path = resolve(
  process.cwd(),
  NODE_ENV === 'development' ? '.env.development' : '.env'
);

config({ path });
