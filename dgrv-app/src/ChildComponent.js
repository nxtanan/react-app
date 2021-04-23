import React, { useEffect, useState } from "react";
import { FaSkype } from "react-icons/fa";
import './App.css';


const ChildComponent = (props) => {
    const [mes] = useState('Chat with Duy delay');
    // const [data, setData] = useState(null);
    // const [error, setError] = useState(null);
    // const skypeBot = 'skype:28:11111111-2222-3333-4444-555555555555?chat';
    const skypeAccount = 'skype:vinhduydt4?chat';
    useEffect(() => {
        // fetch('https://randomuser.me/api/')
        // .then(response => {
        //     if (response.ok) {
        //         return response.json();
        //     }
        //     throw response;
        // }).then(dataResponse => {
        //     setData(dataResponse);
        //     setMes(dataResponse.results[0].cell);
        // }).catch(error => {
        //     setError(error);
        // }).finally(() => {

        // })
        props.receiveData(mes);
    });
    return (
        <div>
            <a href={skypeAccount}><FaSkype title={mes} size="50" className="App-logo" /></a>
        </div>
    );
}


export default ChildComponent;