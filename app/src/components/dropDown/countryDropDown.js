import React, { useState, useEffect } from 'react'
import {countryModule} from './../../services/countryService'
import { MaterializeCSS } from './../../utils/Util'

 
// Be sure to include styles at some point, probably during your bootstrapping
//import 'react-select/dist/css/react-select.css';




function CountryDropDown(props) {

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
        return (
            <select name="country" onChange={(e)=>props.Handler(e)}>
                <option value="" disabled selected>Choose your option</option>
                {
                    CountryList.map((optionData , index) => {
                        return(
                            <option value={optionData.id}>{optionData.country_name}</option>
                        )
                    })
                }
                                    
            </select>
        )
      }else{
        return (
            <select name="country" >
                <option value="" disabled selected>Choose your option</option>
            </select>
        )
      }
    
}

export default CountryDropDown
