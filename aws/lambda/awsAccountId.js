// import dotenv from 'dotenv'
// dotenv.config({path:'../../.env'})
import { store } from '../../utils/store.js'
const accountRegex = new RegExp(/\d{12}/);

export const getAccountId = () => {
  const DLQArn = store.dlq_arn;
  const accountId = accountRegex.exec(DLQArn)[0];
  return accountId;  
}
