import { Diary } from "../types";

const DiaryEntries = ( { data }: { data: Diary[] } ) => {
  
  return (
    <div>
    <h2>Flight Diary Entries</h2>
    {data.map( m => (
      <div key={m.id}>
        <h3>{m.date}</h3>
        <p>
          <b>visibility:</b> {m.visibility} <br/>
          <b>weather:</b> {m.weather} <br/>
          <b>comment:</b> {m.comment}
        </p>
      </div>
    ))}
    </div>
  );
};

export default DiaryEntries;