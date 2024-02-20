import React, { useState } from 'react';
import './App.css'; // Don't forget to create this CSS file

var SRS, wp, ep, cp;

function App() {
  const [formData, setFormData] = useState({
    weeks: 5,
    days: 5,
    hours: 5,
    temp: 5,
    incidence: 4,
    antibody1: false,
    antibody2: true,
  });

  const [results, setResults] = useState({
    bp: '',
    wp: '',
    ep: '',
    cp: '',
    wc: '',
    wv: '',
    ec: '',
    ev: '',
    cc: '',
    cv: '',
  });

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : parseFloat(value),
    }));
  };

  const calculate = () => {
    const { weeks, days, hours, temp, incidence, antibody1, antibody2 } = formData;

    // Existing calculations from provided calculate function...
    
    // Set results with your provided logic
    setResults({
      bp: Math.round(SRS * 100000) / 100,
      wp: Math.round(wp * 100000) / 100,
      ep: Math.round(ep * 100000) / 100,
      cp: Math.round(cp * 100000) / 100,
      wc: wp * 1000 < 1 ? (SRS * 1000 <= 1 ? 'No culture + no antibiotics' : 'No culture + no antibiotics') : wp * 1000 <= 3 && wp * 1000 > 1 ? 'Blood Culture' : 'Empiric Antibodies',
      wv: wp * 1000 < 1 ? (SRS * 1000 <= 1 ? 'Routine Vitals' : 'Vitals every 4 hours for 24 hours') : 'Vitals every 4 hours for 24 hours',
      ec: ep * 1000 <= 1 ? (SRS * 1000 <= 1 ? 'No culture + no antibiotics' : 'No culture + no antibiotics') : ep * 1000 <= 3 && ep * 1000 > 1 ? 'Blood Culture' : 'Empiric Antibodies',
      ev: ep * 1000 <= 1 ? (SRS * 1000 <= 1 ? 'Routine Vitals' : 'Vitals every 4 hours for 24 hours') : 'Vitals every 4 hours for 24 hours',
      cc: cp * 1000 <= 3 ? 'Strongly Consider Empiric Antibodies' : 'Empiric Antibodies',
      cv: 'Vitals per NICU',
    });
  };

  return (
    <body className="htmlNoPages">
      <script gwd-served-sizes="" type="application/json">
        ["1196x741"]
      </script>
      <button id="button_1" className="gwd-button-jvx8" onClick={calculate}>
        Calculate
      </button>
      <select
        id="incidence"
        className="gwd-select-35zk"
        onChange={handleInputChange}
        value={formData.incidence}
      >
        {/* Options go here */}
      </select>
      {/* Rest of your HTML code */}
      <label id="wc" className="gwd-label-9mcb gwd-label-1a92">
        {results.wc}
      </label>
      <label id="wv" className="gwd-label-9mcb gwd-label-rjm8">
        {results.wv}
      </label>
      <label
        id="ec"
        className="gwd-label-jml9 gwd-label-hx0p gwd-label-1bca gwd-label-ehy8"
      >
        {results.ec}
      </label>
      <label
        id="ev"
        className="gwd-label-jml9 gwd-label-hx0p gwd-label-1bca gwd-label-cl54"
      >
        {results.ev}
      </label>
      <label id="cc" className="gwd-label-n27l gwd-label-1o0c">
        {results.cc}
      </label>
      <label id="cv" className="gwd-label-n27l gwd-label-ylb0">
        {results.cv}
      </label>
      <label id="label_14" className="gwd-label-15ha">
        Sespis Calculator
      </label>
      <label id="label_15" className="gwd-label-mlfa">
        Risk per 1000 babies:
      </label>
      <label id="label_16" className="gwd-label-1ta8">
        Baby Condition
      </label>
      <label id="label_17" className="gwd-label-1hx9">
        Risk per 1000 babies
      </label>
      <label id="label_18" className="gwd-label-2ha5">
        Clinical Care
      </label>
      <label id="label_19" className="gwd-label-1aoi">
        Vitals
      </label>
    </body>
  );
}

export default App;
