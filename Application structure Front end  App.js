import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Dropdown options
  const dropdownOptions = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestLowercase', label: 'Highest Lowercase Alphabet' }
  ];

  // Handle JSON input
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Validate JSON
  const validateJson = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateJson(jsonInput)) {
      setError('');
      try {
        const parsedData = JSON.parse(jsonInput);
        const result = await axios.post('YOUR_API_URL_HERE', parsedData); // Replace with your backend URL
        setResponse(result.data);
      } catch (err) {
        setError('Error calling API');
      }
    } else {
      setError('Invalid JSON format');
    }
  };

  // Filter response based on selected options
  const filterResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedOptions.some(option => option.value === 'alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.some(option => option.value === 'numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.some(option => option.value === 'highestLowercase')) {
      filteredResponse.highestLowercase = response.highestLowercase;
    }
    return filteredResponse;
  };

  const filteredData = filterResponse();

  return (
    <div>
      <h1>{`Your Roll Number`}</h1>
      <input 
        type="text" 
        value={jsonInput} 
        onChange={handleInputChange} 
        placeholder="Enter JSON here" 
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {response && (
        <>
          <Select
            isMulti
            options={dropdownOptions}
            onChange={setSelectedOptions}
            placeholder="Select Filters"
          />
          <div>
            <h2>Filtered Response:</h2>
            <pre>{JSON.stringify(filteredData, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
