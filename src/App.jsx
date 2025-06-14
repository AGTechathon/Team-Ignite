import { useState } from 'react'
import './App.css'

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en'); // Default language is English

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch('http://localhost:5000/api/health/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms, language }), // Include language in the request
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Arogya AI Symptom Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your symptoms or health query here..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          rows="10"
          cols="50"
        ></textarea>
        <br />
        <label htmlFor="language-select">Select Language:</label>
        <select id="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          {/* Add more languages as needed */}
        </select>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Submit Symptoms'}
        </button>
      </form>

      {error && <p className="error">Error: {error}</p>}

      {response && (
        <div className="response">
          <h2>Analysis Result:</h2>
          <p><strong>Status:</strong> {response.status}</p>
          <p><strong>Message:</strong> {response.message}</p>
          {response.suggestions && (
            <div>
              <h3>Suggestions:</h3>
              <ul>
                {response.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
          {response.solution && <p><strong>Solution:</strong> {response.solution}</p>}
          {response.prescription && <p><strong>Prescription:</strong> {response.prescription}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
