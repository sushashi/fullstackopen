import { CoursePart } from "../type";

const Total = ( { part }: { part: CoursePart[] } ) => {
  const tot = part.reduce((carry, part) => carry + part.exerciseCount, 0)
  return (
    <p> Number of exercises{" "}{tot}</p>
  )
}

export default Total;