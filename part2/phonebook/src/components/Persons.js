const Persons = ({persons, handleDelete}) => {
    return(
        persons.map(p => 
          <div key={p.id}> {p.name} {p.number} {`  `} 
          <button onClick={() => handleDelete(p.id)}>delete</button></div>
          )
    )
}
export default Persons