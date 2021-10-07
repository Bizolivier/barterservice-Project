import React from 'react';
import Select from 'react-select';



export default ({selectedOption,selectedRoleValue,changeRoleValue})=>{


const options = [
        
       
    { value: 0, label: 'User' },
    { value: 1, label: 'Admin' },
   
    
  ];

  const handleChange = e => {changeRoleValue(e.value);}
  return( 
    <Select
    value={options.find(obj => obj.value === selectedRoleValue)}
    options={options}
    placeholder ={options[selectedOption].label}
    onChange={handleChange}
        
      />)



}