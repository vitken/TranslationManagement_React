import React, { useState, useEffect } from "react";
import "./Global.css";
import translatorsDummy from "../dummyData/translators";
import {Client} from "../api/TranslationApiClient.ts";
import TranslatorStatusComponent from "./TranslatorStatusComponent";
import TranslatorCreateComponent from "./TranslatorCreateComponent";

function TranslatorsComponent(props) {
  const tableHeadings = [
    "Id",
    "Name",
    "Status",
    "Hourly rate",
    "CreditCardNumber",
  ];
  const apiClient = new Client("http://localhost:5184");
  const [translators, setTranslators] = useState([]);

  const loadTranslators = async () => {
    var fetchedTranslators = [];
    try {
        fetchedTranslators = await apiClient.getTranslators();
    } catch (error) {
        console.log("Colud noit get translators!");
    }
    if (fetchedTranslators){
      setTranslators(translatorsDummy.concat(fetchedTranslators));
    }
    else {
      setTranslators(translatorsDummy);
    }
  };

  useEffect(() => {
    // simulate data loading
    setTimeout(async () => {
      await loadTranslators();
    }, 1000);
  }, []);

  const handleChange = async (statusChangeOk) => {
    if (statusChangeOk === true){
        await loadTranslators();
    }
  }

  return (
    <div>
      <header>
        <h1>{props.title}</h1>
      </header>
      <table width={"100%"}>
        <thead>
          <tr>
            {tableHeadings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody width={"100%"}>
          {translators.length > 0 ? (
            translators.map((translator, index) => (
              <tr key={index} width={"100%"}>
                <td width={"20%"}>{translator.id}</td>
                <td width={"20%"}>{translator.name}</td>
                <td width={"20%"}>{translator.status}</td>
                <td width={"20%"}>{translator.hourlyRate}</td>
                <td width={"20%"}>{translator.creditCardNumber}</td>
              </tr>
            ))
          ) : (
            <tr width={"100%"} style={{ textAlign: "center" }}>
              No content
            </tr>
          )}
        </tbody>
      </table>
      <TranslatorStatusComponent translators={translators} handleChange={handleChange} />
      <TranslatorCreateComponent handleChange={handleChange} />
    </div>
  );
}

export default TranslatorsComponent;
