import React, { useState, useEffect } from 'react'
import {countryModule} from './../../services/countryService'
import { MaterializeCSS } from './../../utils/Util'
import Select from 'react-select';

const customStyles = {
    valueContainer: base => ({
      ...base,
      height: 35,
      minHeight: 35
    }),
    singleValue: base => ({
        ...base,
        paddingTop: 12,
      })
  };

 
// Be sure to include styles at some point, probably during your bootstrapping
//import 'react-select/dist/css/react-select.css';




function ReactSelectCountry(props) {

    const [CountryList, setCountryList] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const countryData = await countryModule.getCountry();
          setCountryList(countryData);
          MaterializeCSS.AutoInit()
        }
        fetchData();
    }, [])

    if(Object.keys(CountryList).length !== 0){
        const options = CountryList.map((optionData , index) => {
            return(
                { value: optionData.id, label: optionData.country_name }
            )
        });

        console.log('hheeeeeeeeeeeeeeeeeeeee');
        console.log(options);
        return(
            <Select
                className="basic-single"
                classNamePrefix="select"
                //defaultValue={colourOptions[0]}
                name="color"
                options={options}
                styles={customStyles}
                onChange={props.demo}
                isClearable={true}
                defaultValue={options[1]}
                        
                    />
        )

    }else{

        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ];
        return(
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={options[1]}
                name="color"
                options={options}
                styles={customStyles}
                onChange={props.demo}
                isClearable={true}
                        
                    />
        )
    }

    
    
    
}

export default ReactSelectCountry
