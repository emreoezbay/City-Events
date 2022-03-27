import axios from 'axios';
import { apiUrl } from '../../config/appConfig';

export const deleteTicket = async (id: string): Promise<any> => {
  try {
    const res = await axios.delete(apiUrl + '/tickets/' + id);
    return res.data;
  } catch (e) {
    console.error((e as Error).message);
  }
};
