import React, {createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import {EX_RATES_URL} from '../utils/urls';

type RatesProps = {
    children: ReactNode
} 
export const RatesContext = createContext({rates: {}});

export default (props: RatesProps) => {
    const [rates, setRates] = useState({});

    useEffect(() => {
        const loadRates = async () => {
        const res = await axios({
			method: 'GET',
			url: EX_RATES_URL
        }) 
        setRates(res.data.rates);
       }
       
        loadRates();
    }, []);

    return (

        <RatesContext.Provider value={{rates}}>
            {props.children}
        </RatesContext.Provider>
    )
} 