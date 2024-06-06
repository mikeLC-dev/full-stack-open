
const Total = ({total}) => {
  let suma =0
    
  total.map((part) => {
    suma+=part.exercises
    })
    return (
    <div>
      <p>Number of exercises {suma}</p>
    </div>
  )
}


export default Total 