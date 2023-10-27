import React, { useState, useEffect } from "react";
import './Global.css';
import jobsDummy from '../dummyData/translation-jobs'

function JobListComponent(props) {
    const tableHeadings = ['Id', 'Customer name', 'Status', 'Original content', 'Translated content', 'Price'];
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setJobs(jobsDummy);
    }, 1000);
  });

  return (
    <div>
      <header>
        <h1>{props.title}</h1>
      </header>
      <table width={'100%'}>
        <thead>
            <tr>
                {tableHeadings.map((heading, headingId) => 
                <th key={headingId}>{heading}</th>)}
            </tr>
        </thead>
        <tbody width={"100%"}>
            {jobs.length > 0 ? jobs.map((job, index) => (
                <tr key={index} width={"100%"}>
                    <td width={"15%"}>
                        {job.Id}
                    </td>
                    <td width={"15%"}>
                        {job.CustomerName}
                    </td>
                    <td width={"15%"}>
                        {job.Status}
                    </td>
                    <td width={"15%"}>
                        {job.OriginalContent}
                    </td>
                    <td width={"15%"}>
                        {job.TranslatedContent}
                    </td>
                    <td width={"15%"}>
                        {job.Price}
                    </td>
                </tr>
            )):
            <tr width={"100%"} style={{textAlign: 'center'}}>No content</tr>}
        </tbody>
      </table>
    </div>
  );
}

export default JobListComponent;
