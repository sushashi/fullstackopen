import { useEffect, useState } from 'react';
import { getAllDiaries } from './services/diaryService';
import { Diary } from './types';
import DiaryEntries from './components/DiaryEntries';
import EntryForm from './components/EntryForm';


function App() {
  const [data, setData] = useState<Diary[]>([]);

  useEffect( () => {
    getAllDiaries().then( response => setData(response) ).catch(e => console.log(e));
  },[]);

  return (
    <div>
      <EntryForm data={data} setData={setData} />
      <DiaryEntries data={data} />
    </div>
  );
}

export default App;
