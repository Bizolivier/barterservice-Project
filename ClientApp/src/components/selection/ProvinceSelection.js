import React from 'react';
import Select from 'react-select';


export default({selectedOption})=>{

    const options = [
        { value: 'Bruxelles', label: 'Bruxelles' },
        { value: 'Hainaut', label: 'Hainaut' },
        { value: 'Namur', label: 'Namur' },
        { value: 'Brabant_flamant', label: 'Brabant_flamant' },
        { value: 'Brabant_wallon', label: 'Brabant_wallon' },
        { value: 'Limbourg', label: 'Limbourg' },
        { value: 'Luxembourg', label: 'Luxembourg' },
        { value: 'Anvers', label: 'Anvers' },
        { value: 'Flandre_orientale', label: 'Flandre_orientale' },
        { value: 'Flandre_occidentale', label: 'Flandre_occidentale' },
      ];
      
   
   return( 
      <Select
          value={options.value}
          options={options}
          defaultValue={options[selectedOption]}
        />)
}