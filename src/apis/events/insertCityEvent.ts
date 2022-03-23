import axios from 'axios';
import { apiUrl } from '../../config/appConfig';

export const insertCityEvent = async (): Promise<any> => {
  try {
    const res = await axios.post(apiUrl + '/cityevents');
    return res.data;
  } catch (e) {
    console.error((e as Error).message);
  }
};
