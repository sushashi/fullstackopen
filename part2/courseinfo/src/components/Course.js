const Course = ({course}) => {
    return(
      <div>
        <h1>Web development curriculum</h1>
        {course.map( c => <SingleCourse key = {c.id} course = {c} />)}
      </div>
    ) 
  }
  
  const SingleCourse = ({course}) => {
    console.log(course)
    return(
      <div>
        <Header header = {course.name} />
        <Content course = {course} />
        <Sum parts = {course.parts} />
      </div>
    )
  }

  const Content = ({course}) => {
    return(
      course.parts.map( part => <Part key = {part.id} part = {part} /> )
    )
  }

  const Part = ({part}) => {
    return(
      <p key = {part.id}>{part.name} {part.exercises}</p>
    )
  }
  
  const Header = ({header}) => {
    return(
        <h2>{header}</h2>
    )
  }

  const Sum = ({parts}) =>{
    const sums = parts.reduce( (sum, c) => sum + c.exercises, 0)
    console.log("sums: ",sums)
    return(
      <div><b>total of {sums} exercises</b></div>
    )
  }
  export default Course