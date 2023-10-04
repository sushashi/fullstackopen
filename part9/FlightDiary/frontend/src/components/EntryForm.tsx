import { useState } from 'react';
import { Diary }from '../types';
import { createDiary } from '../services/diaryService';

interface props {
  data: Diary[];
  setData: React.Dispatch<React.SetStateAction<Diary[]>>
}

const EntryForm = ( props: props ) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary(
      {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
      }
    )
    .then( resp => props.setData( props.data.concat(resp) ))
    .catch(e => {
      console.log(e);
      setError(e.response.data as string);
      setTimeout( () => setError(''), 3000);
    });

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  const notifStyle = {
    color: 'red'
  };
  const fieldStyle = {
    display: 'inline-block'
  };

  return (
    <div>
      <h2>Add Entry</h2>
      <p style={notifStyle}>{error}</p>
      <form onSubmit={handleSubmit}>
        <fieldset style={fieldStyle}>
          <table>
            <tbody>

              <tr>
                <td>Date</td>
                <td><input type="date" value={date} onChange={e => setDate(e.target.value)} /></td>
              </tr>

              <tr>
                <td>Visibility</td>
                <td>
                  <input type='radio' name='visibility' id="radio1" value="great" onChange={e => setVisibility(e.target.value)}/>great
                  <input type='radio' name='visibility' id="radio2" value="good" onChange={e => setVisibility(e.target.value)}/>good
                  <input type='radio' name='visibility' id="radio3" value="ok" onChange={e => setVisibility(e.target.value)}/>ok
                  <input type='radio' name='visibility' id="radio4" value="poor" onChange={e => setVisibility(e.target.value)}/>poor
                </td>
              </tr>

              <tr>
                <td>Weather</td>
                <td>
                  <input type='radio' name='weather' id="radio5" value="sunny" onChange={e => setWeather(e.target.value)}/>sunny
                  <input type='radio' name='weather' id="radio6" value="rainy" onChange={e => setWeather(e.target.value)}/>rainy
                  <input type='radio' name='weather' id="radio7" value="cloudy" onChange={e => setWeather(e.target.value)}/>cloudy
                  <input type='radio' name='weather' id="radio8" value="stormy" onChange={e => setWeather(e.target.value)}/>stormy
                  <input type='radio' name='weather' id="radio9" value="windy" onChange={e => setWeather(e.target.value)}/>windy
                </td>
              </tr>

              <tr>
                <td>Comment</td>
                <td><input value={comment} onChange={e => setComment(e.target.value)}/></td>
              </tr>

            </tbody>
          </table>
          <button type='submit'>Add new entry</button>
        </fieldset>
      </form>
    </div>
  );
};

export default EntryForm;