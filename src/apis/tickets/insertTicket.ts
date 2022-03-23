import axios from 'axios';
import { apiUrl } from '../../config/appConfig';
import { Ticket } from '../../types/Ticket';

export const insertTicket = async (ticket: Ticket): Promise<any> => {
  try {
    const res = await axios.post(apiUrl + '/tickets', { ...ticket });
    return res.data;
  } catch (e) {
    console.error((e as Error).message);
  }
};
