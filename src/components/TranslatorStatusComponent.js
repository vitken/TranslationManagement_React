import React, { useState, useEffect } from "react";
import "./Global.css";
import CommonUtils from "../utils/CommonUtils";
import {Client} from "../api/TranslationApiClient.ts";

function TranslatorStatusComponent(props) {
  const [translator, setTranslator] = useState(null);
  const apiClient = new Client("http://localhost:5184");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    setTranslator(props.translators ? props.translators[0] : null);
  }, [props.translators]);

  const onTranslatorChange = (event) => {
    const selectedTranslator = props.translators?.filter(x => x.id == event.target.value)[0];
    const selectedStatus = CommonUtils.translatorStatus.filter(x => x.value == selectedTranslator.status)[0];
    setTranslator(selectedTranslator);
    setStatus(selectedStatus);
  };

  const onStatusChange = (event) => {
    setStatus(CommonUtils.translatorStatus.filter(x => x.value == event.target.value)[0]);
    var translatorBuffer = translator;
    translatorBuffer.status = event.target.value;
    setTranslator(translatorBuffer);
  };

  const saveStatus = async () => {
    try {
        await apiClient.updateTranslatorStatus(translator.id, status.value);
        setMessage({"color": "green", "text": "Succesfully updated!"});
    } catch (error) {
        setMessage({"color": "red", "text": "Translator doesn't exists!"});
    }
    
    props.handleChange(true);
  }

  return (
    <div style={{border: "2px solid black"}}>
        <p>Pick translator</p>
        <select value={translator ? translator.id : ""} onChange={onTranslatorChange}>
            {props.translators ? props.translators.map((translator, translatorId) => (
                <option key={translatorId} value={translator.id}>{translator.name}</option>
            )) : <></>}
        </select>
        <p>Pick status</p>
        <select value={translator ? translator.status : ""} onChange={onStatusChange} >
            {translator ? CommonUtils.translatorStatus.map((status, statusId) => (
                <option key={statusId} value={status.value}>{status.name}</option>
            )): null}
        </select>
        <button onClick={saveStatus}>Save</button>
        {message ? <p style={{color: message.color}}>{message.text}</p> : null }
    </div>
  );
}

export default TranslatorStatusComponent;
