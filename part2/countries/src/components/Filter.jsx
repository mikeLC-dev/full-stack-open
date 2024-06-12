import React from 'react'



const Filter = ({filter,onChangeFilter}) =>{

        

        return(
            <form>
            <div>
              find countries: <input value={filter} onChange={onChangeFilter}/>
            </div>
          </form>)
  
}

export default Filter 