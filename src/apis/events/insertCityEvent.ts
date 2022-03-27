import axios from 'axios';
import { apiUrl } from '../../config/appConfig';

import { InputCityEvent } from '../../types/InputCityEvent';

type CityEventInput = {};

export const insertCityEvent = async (data: InputCityEvent): Promise<any> => {
  try {
    const res = await axios.post(apiUrl + '/cityevents', data);
    return res.data;
  } catch (e) {
    console.error((e as Error).message);
  }
};
