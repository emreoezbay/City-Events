import axios from 'axios';
import { apiUrl } from '../../config/appConfig';

export const insertTicket = async (): Promise<any> => {
  try {
    const res = await axios.post(apiUrl + '/tickets');
    return res.data;
  } catch (e) {
    console.error((e as Error).message);
  }
};
