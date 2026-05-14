import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [file, setFile] = useState(null)

  const [message, setMessage] = useState('')

  const [question, setQuestion] = useState('')

  const [answer, setAnswer] = useState('')

  const [sources, setSources] = useState([])

  const [loading, setLoading] = useState(false)


  // Upload PDF
  const handleUpload = async () => {

    if (!file) {
      alert('Please select a PDF')
      return
    }

    const formData = new FormData()

    formData.append('file', file)

    try {

      const response = await axios.post(
        'http://127.0.0.1:8000/upload',
        formData
      )

      setMessage(response.data.message)

    } catch (error) {

      console.error(error)

      setMessage('Upload failed')
    }
  }


  // Ask Question
  const handleAsk = async () => {

    if (!question) {
      return
    }

    setLoading(true)

    try {

      const response = await axios.post(
        `http://127.0.0.1:8000/ask?question=${question}`
      )

      setAnswer(response.data.answer)

      setSources(response.data.context_used)

    } catch (error) {

      console.error(error)

      setAnswer('Failed to get answer')

    }

    setLoading(false)
  }


  return (
    <div className="app">

      <h1>AI Study Companion</h1>

      <p>
        Offline-capable RAG learning assistant powered by Gemma 4
      </p>


      {/* Upload Section */}

      <div className="upload-box">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>
          Upload PDF
        </button>

        <p>{message}</p>

      </div>


      {/* Question Section */}

      <div className="chat-box">

        <textarea
          placeholder="Ask a question from your study material..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={handleAsk}>
          Ask AI
        </button>

      </div>


      {/* Loading */}

      {loading && (
        <p className="loading">
          Thinking...
        </p>
      )}


      {/* Answer */}

      {answer && (

        <div className="answer-box">

          <h2>Answer</h2>

          <p>{answer}</p>

        </div>

      )}


      {/* Sources */}

      {sources.length > 0 && (

        <div className="sources-box">

          <h2>Retrieved Sources</h2>

          {sources.map((source, index) => (

            <div
              key={index}
              className="source-item"
            >
              {source}
            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default App