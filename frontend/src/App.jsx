import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

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

  return (
    <div className="app">
      <h1>AI Study Companion</h1>

      <p>
        Offline-capable RAG learning assistant powered by Gemma 4
      </p>

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
    </div>
  )
}

export default App