import React from 'react';
import Select from 'react-select';



export default ({selectedOption,selectedSexeValue,changeSexeValue})=>{


const options = [
        
       
    { value: 0, label: 'Feminin' },
    { value: 1, label: 'Masculin' },
    { value: 2, label: 'Autre' },
    
  ];

  const handleChange = e => {changeSexeValue(e.value);}
  return( 
    <Select
    value={options.find(obj => obj.value === selectedSexeValue)}
    options={options}
    placeholder ={options[selectedOption].label}
    onChange={handleChange}
        
      />)



}