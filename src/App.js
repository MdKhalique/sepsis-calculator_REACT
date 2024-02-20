import React, { useState, useEffect } from 'react';
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

  const calculate = () => {
    let weeks = parseFloat(document.getElementById('weeks').value);
    if (weeks <= 34 || weeks >= 43) {
      alert("Weeks must be between 35 and 42");
      return;
    }

    let days = parseFloat(document.getElementById('days').value);
    if (days > 6) {
      alert("Days must be less than 6");
      return;
    }

    let hours = parseFloat(document.getElementById('hours').value);
    if (hours > 100) {
      alert("Hours must be less than 100");
      return;
    }

    let temp = parseFloat(document.getElementById('temp').value);
    if (temp > 40 || temp < 36) {
      alert("Temperature must be between 36 and 40");
      return;
    }

    let antibody1 = 0;
    let antibody2 = 0;

    const r1 = document.getElementById("radio_1").checked;
    const r2 = document.getElementById("radio_2").checked;
    const r3 = document.getElementById("radio_3").checked;

    if (r2 || r3) {
      antibody1 = 1;
    }

    if (r1) {
      antibody2 = 1;
    }

    const intercept = 265.523 * Math.pow(document.getElementById("incidence").value, 0.00379445) - 224.26;
    const tempf = temp * 1.8 + 32;
    const age = weeks + days / 7;
    const age_square = age * age;
    const rom_t = Math.pow((hours + .5), .2);
    const numberp1 = intercept + (.868 * tempf) - (6.9325 * age) + (.0877 * age * age);
    const numberp2 = numberp1 + 1.2256 * rom_t - antibody1 * 1.0488 - antibody2 * 1.1861 + .0427;
    SRS = 1 / (1 + Math.pow(Math.E, -1 * numberp2));
    document.getElementById("bp").innerHTML = Math.round(SRS * 100000) / 100;
    const constant = SRS / (1 - SRS);
    const wo = constant * .41;
    wp = wo / (1 + wo);
    const eo = constant * 5;
    ep = eo / (1 + eo);
    const co = constant * 21.2;
    cp = co / (1 + co);
    document.getElementById("wp").innerHTML = Math.round(wp * 100000) / 100;
    document.getElementById("ep").innerHTML = Math.round(ep * 100000) / 100;
    document.getElementById("cp").innerHTML = Math.round(cp * 100000) / 100;

    if (wp * 1000 < 1) {
      if (SRS * 1000 <= 1) {
        document.getElementById("wc").innerHTML = "No culture + no antibiotics";
        document.getElementById("wv").innerHTML = "Routine Vitals";
        document.getElementById('wc').style.backgroundColor = "green";
        document.getElementById('wv').style.backgroundColor = "green";
      } else {
        document.getElementById("wc").innerHTML = "No culture + no antibiotics";
        document.getElementById("wv").innerHTML = "Vitals every 4 hours for 24 hours";
        document.getElementById('wc').style.backgroundColor = "yellow";
        document.getElementById('wv').style.backgroundColor = "yellow";
      }
    }
    if (wp * 1000 <= 3 && wp * 1000 > 1) {
      document.getElementById("wc").innerHTML = "Blood Culture";
      document.getElementById("wv").innerHTML = "Vitals every 4 hours for 24 hours";
      document.getElementById('wc').style.backgroundColor = "yellow";
      document.getElementById('wv').style.backgroundColor = "yellow";
    }
    if (wp * 1000 > 3) {
      document.getElementById("wc").innerHTML = "Empiric Antibodies";
      document.getElementById("wv").innerHTML = "Vitals per NICU";
      document.getElementById('wc').style.backgroundColor = "red";
      document.getElementById('wv').style.backgroundColor = "red";
    }
    if (ep * 1000 <= 1) {
      if (SRS * 1000 <= 1) {
        document.getElementById("ec").innerHTML = "No culture + no antibiotics";
        document.getElementById("ev").innerHTML = "Routine Vitals";
        document.getElementById('ec').style.backgroundColor = "green";
        document.getElementById('ev').style.backgroundColor = "green";
      } else {
        document.getElementById("ec").innerHTML = "No culture + no antibiotics";
        document.getElementById("ev").innerHTML = "Vitals every 4 hours for 24 hours";
        document.getElementById('ec').style.backgroundColor = "yellow";
        document.getElementById('ev').style.backgroundColor = "yellow";
      }
    }
    if (ep * 1000 <= 3 && ep * 1000 > 1) {
      document.getElementById("ec").innerHTML = "Blood Culture";
      document.getElementById("ev").innerHTML = "Vitals every 4 hours for 24 hours";
      document.getElementById('ec').style.backgroundColor = "yellow";
      document.getElementById('ev').style.backgroundColor = "yellow";
    }
    if (ep * 1000 > 3) {
      document.getElementById("ec").innerHTML = "Empiric Antibodies";
      document.getElementById("ev").innerHTML = "Vitals per NICU";
      document.getElementById('ec').style.backgroundColor = "red";
      document.getElementById('ev').style.backgroundColor = "red";
    }
    if (cp * 1000 <= 3) {
      document.getElementById("cc").innerHTML = "Strongly Consider Empiric Antibodies";
      document.getElementById("cv").innerHTML = "Vitals per NICU";
      document.getElementById('cc').style.backgroundColor = "red";
      document.getElementById('cv').style.backgroundColor = "red";
    }
    if (cp * 1000 > 3) {
      document.getElementById("cc").innerHTML = "Empiric Antibodies";
      document.getElementById("cv").innerHTML = "Vitals per NICU";
      document.getElementById('cc').style.backgroundColor = "red";
      document.getElementById('cv').style.backgroundColor = "red";
    }
    if (wo * 1000 <= 1) {
      if (SRS * 1000 <= 1) {
        document.getElementById("wo").innerHTML = "No culture + no antibiotics";
        document.getElementById("wv_o").innerHTML = "Routine Vitals";
        document.getElementById('wo').style.backgroundColor = "green";
        document.getElementById('wv_o').style.backgroundColor = "green";
      } else {
        document.getElementById("wo").innerHTML = "No culture + no antibiotics";
        document.getElementById("wv_o").innerHTML = "Vitals every 4 hours for 24 hours";
        document.getElementById('wo').style.backgroundColor = "yellow";
        document.getElementById('wv_o').style.backgroundColor = "yellow";
      }
    }
    if (wo * 1000 <= 3 && wo * 1000 > 1) {
      document.getElementById("wo").innerHTML = "Blood Culture";
      document.getElementById("wv_o").innerHTML = "Vitals every 4 hours for 24 hours";
      document.getElementById('wo').style.backgroundColor = "yellow";
      document.getElementById('wv_o').style.backgroundColor = "yellow";
    }
    if (wo * 1000 > 3) {
      document.getElementById("wo").innerHTML = "Empiric Antibodies";
      document.getElementById("wv_o").innerHTML = "Vitals per NICU";
      document.getElementById('wo').style.backgroundColor = "red";
      document.getElementById('wv_o').style.backgroundColor = "red";
    }
  };

  useEffect(() => {

    const button = document.getElementById('button_1');
  if (button) {
    button.addEventListener('click', calculate);
  }

  return () => {
    if (button) {
      button.removeEventListener('click', calculate);
    }
  };
  }, [formData]);

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : parseFloat(value),
    }));
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
