import axios from 'axios';
import { Diary, NewDiary} from '../types';

const url = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
  return axios
  .get<Diary[]>(url)
  .then(response => response.data);
};

export const createDiary = ( object: NewDiary ) => {
  return axios
    .post<Diary>(url, object)
    .then(response => response.data);
};