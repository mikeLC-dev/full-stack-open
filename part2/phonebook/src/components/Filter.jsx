import React from 'react'



const Filter = ({filter,onChangeFilter}) =>{
        return(
            <form>
            <div>
              filter shown with: <input value={filter} onChange={onChangeFilter}/>
            </div>
          </form>)
  
}

export default Filter 