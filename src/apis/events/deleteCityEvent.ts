import axios from 'axios';
import { apiUrl } from '../../config/appConfig';

export const deleteCityEvent = async (id: string): Promise<any> => {
  try {
    const res = await axios.delete(apiUrl + '/cityevents/' + id);
    return null;
  } catch (e) {
    console.error((e as Error).message);
  }
};
