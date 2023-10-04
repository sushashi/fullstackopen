import Part from './Part';
import { CoursePart } from '../type';

const Content = ( {part}: {part: CoursePart[]} ) => {
  return(
    <div>
      {part.map( c => (
        <div key={c.name}>
          <Part part={c} />
        </div>
      ))}
    </div>
  )  
}

export default Content;