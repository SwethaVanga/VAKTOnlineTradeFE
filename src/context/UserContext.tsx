import React, {createContext, useState, ReactNode } from 'react';
import axios from 'axios';
import {BASE_URL} from '../utils/urls';

type UserProps = {
    children: ReactNode
} 
type UserContextType = {
    user: any | undefined,
    signUp? (email: string, password: string): Promise<any>,
    login? (identifier: string, password: string): Promise<any>
}
export const UserContext = createContext<UserContextType>({user: undefined, signUp: undefined, login: undefined});

export default (props: UserProps) => {
    const [user, setUser] = useState(undefined);

    const signUp = async (email: string, password: string) => {
        const res = await axios({
			method: 'POST',
            url: `${BASE_URL}/auth/local/register`,
            data: {
                email,
                password,
                username: email
            }
        }) 
        setUser(res.data);
       }

       const login = async (identifier: string, password: string ) => {
        const res = await axios({
			method: 'POST',
            url: `${BASE_URL}/auth/local`,
            data: {
                identifier,
                password,
            }
        }) 
        setUser(res.data);
       }

    return (

        <UserContext.Provider value={{user, login, signUp}}>
            {props.children}
        </UserContext.Provider>
    )
} 