import { Pool } from 'pg';
import { environment } from '../environment';

export default new Pool({
  connectionString: environment.DB_URL,
});
