import { CoursePart } from "../type";

const Part = ( { part }: { part: CoursePart } ) => {
  
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }
    switch (part.kind) {
      case 'basic':
        return (
          <p>
            <b>{part.name} {part.exerciseCount} </b> <br/>
            <i>{part.description} </i>
          </p>  
          );
      case 'group':
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b> <br/>
            project exercises {part.groupProjectCount}
          </p>
        );
      case 'background':
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b> <br/>
            <i>{part.description}</i><br/>
            submit to {part.backgroundMaterial}
          </p>
        );
      case 'special':
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b> <br/>
            <i>{part.description}</i> <br/>
            required skills: {part.requirements.join(", ")}
          </p>
        )
      default:
        return assertNever(part);
    }
}

export default Part