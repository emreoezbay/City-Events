import axios from 'axios';
import { apiUrl } from '../../config/appConfig';

export const getTickets = async (eventId: string): Promise<any> => {
  try {
    const res = await axios.get(apiUrl + '/tickets/' + eventId);
    return res.data;
  } catch (e) {
    console.error((e as Error).message);
  }
};
