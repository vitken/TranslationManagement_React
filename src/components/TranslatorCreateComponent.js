import React, { useState, useEffect } from "react";
import "./Global.css";
import CommonUtils from "../utils/CommonUtils";
import {Client} from "../api/TranslationApiClient.ts";

function TranslatorCreateComponent(props) {
  const [translator, setTranslator] = useState({
    "name": '',
    "hourlyRate": 0,
    "status": 0,
    "creditCardNumber": ''
  });
  const apiClient = new Client("http://localhost:5184");
  const [message, setMessage] = useState(null);

  const createTranslator = async () => {
    if (!translator.name || translator.name.trim() === ''){
        setMessage({"color": "red", "text": "Name is mandatory!"});
    } else {
        try {
            await apiClient.addTranslator(translator);
            setMessage({"color": "green", "text": "Succesfully created!"});
        } catch (error) {
            setMessage({"color": "red", "text": "Could not create translator!"});
        }
        
        props.handleChange(true);
    }
    
  }

  return (
    <div style={{border: "2px solid black"}}>
        <h4>Create a new translator</h4>
        <p>Name</p>
        <input type="text" onChange={(event) => {
            var translatorUpdated = translator;
            translatorUpdated.name = event.target.value;
            setTranslator(translatorUpdated);
        }}></input>
        <p>Hourly rate</p>
        <input type="number" onChange={(event) => {
            var translatorUpdated = translator;
            translatorUpdated.hourlyRate = event.target.value;
            setTranslator(translatorUpdated);
        }}></input>
        <p>Credit card number</p>
        <input type="text" onChange={(event) => {
            var translatorUpdated = translator;
            translatorUpdated.creditCardNumber = event.target.value;
            setTranslator(translatorUpdated);
        }}></input>
        <button onClick={createTranslator}>Create new translator</button>
        {message ? <p style={{color: message.color}}>{message.text}</p> : null }
    </div>
  );
}

export default TranslatorCreateComponent;
