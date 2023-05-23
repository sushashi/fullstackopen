const Filter = ({handleFilterBox ,filterBox}) => {
    return(
        <div>filter shown with <input value={filterBox} onChange={handleFilterBox}/></div>
    )
}
export default Filter