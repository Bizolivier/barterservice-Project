import React ,{useState}from 'react';
import Select from 'react-select';


export default({selectedOption,selectedProvinceValue,changeProvinceValue})=>{

  const options = [
    { value: 0 , label: 'Bruxelles' },
    { value: 1, label: 'Hainaut' },
    { value: 2, label: 'Namur' },
    { value: 3, label: 'Brabant_flamant' },
    { value: 4, label: 'Brabant_wallon' },
    { value: 5, label: 'Limbourg' },
    { value: 6, label: 'Luxembourg' },
    { value: 7, label: 'Anvers' },
    { value: 8, label: 'Flandre_orientale' },
    { value: 9, label: 'Flandre_occidentale' },
  ];


  const handleChange = e => {changeProvinceValue(e.value);}

 
   
   return( 
 


  <Select
         
      value={options.find(obj => obj.value === selectedProvinceValue)}
          options={options}
          placeholder ={options[selectedOption].label}
          onChange={handleChange}
        />
  
        
)

    
      
}