
const Total = ({total}) => {
    const suma = total.reduce((s,p)=>s+p.exercises,0)
    
    return (
    <div>
      <p>Number of exercises {suma}</p>
    </div>
  )
}


export default Total 