import { useState, useRef, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

function SearchBar({ onResult }) {
  const [serial, setSerial] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSearch = async () => {
    if (!serial.trim()) {
      setError("Please enter serial number")
      return
    }

    setLoading(true)
    setError("")
    onResult(null)

    try {
      const docRef = doc(db, "repairs", serial.trim())
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        onResult(docSnap.data())
      } else {
        setError("No record found")
      }
    } catch {
      setError("Something went wrong")
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="search-box">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter Serial Number"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default SearchBar
