import React from 'react';
import Select from 'react-select';


export default({selectedOption})=>{

    const options = [
        
        { value: 'Masculin', label: 'Masculin' },
        { value: 'Feminin', label: 'Feminin' },
        { value: 'Autre', label: 'Autre' },
        
      ];

   return( 
      <Select
          value={options.value}
          options={options}
          defaultValue={options[selectedOption]}
        />)
}