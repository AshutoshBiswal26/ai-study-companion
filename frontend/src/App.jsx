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

  const [summary, setSummary] = useState('')

  const [quiz, setQuiz] = useState('')


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


  // Generate Summary
  const handleSummary = async () => {

    setLoading(true)

    try {

      const response = await axios.post(
        'http://127.0.0.1:8000/summary'
      )

      setSummary(response.data.summary)

    } catch (error) {

      console.error(error)

    }

    setLoading(false)
  }


  // Generate Quiz
  const handleQuiz = async () => {

    setLoading(true)

    try {

      const response = await axios.post(
        'http://127.0.0.1:8000/quiz'
      )

      setQuiz(response.data.quiz)

    } catch (error) {

      console.error(error)

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

        <div className="feature-buttons">

          <button onClick={handleSummary}>
            Generate Summary
          </button>

          <button onClick={handleQuiz}>
            Generate Quiz
          </button>

        </div>

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


      {/* Summary */}

      {summary && (

        <div className="answer-box">

          <h2>Document Summary</h2>

          <p>{summary}</p>

        </div>

      )}


      {/* Quiz */}

      {quiz && (

        <div className="answer-box">

          <h2>Quiz Questions</h2>

          <p>{quiz}</p>

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