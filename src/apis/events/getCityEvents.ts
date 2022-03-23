import axios from 'axios';
import { apiUrl } from '../../config/appConfig';

export const getCityEvents = async (): Promise<any> => {
  try {
    const res = await axios.get(apiUrl + '/cityevents');
    return res.data;
  } catch (e) {
    console.error((e as Error).message);
  }
};
