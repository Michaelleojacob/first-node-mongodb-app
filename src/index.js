import { config } from 'dotenv';
import { executeStudentCrudOperations } from './studentCRUD/studentCRUD.js';

config();
await executeStudentCrudOperations();
