import { useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

function SearchBar({ onResult }) {
  const [serial, setSerial] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!serial.trim()) return

    setLoading(true)
    setError("")
    onResult(null)

    try {
      const docRef = doc(db, "repairs", serial.trim())
      const snap = await getDoc(docRef)

      if (snap.exists()) {
        onResult(snap.data())
      } else {
        setError("No record found")
      }
    } catch (err) {
      setError("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="search-box">
      <input
        className="search-input"
        placeholder="Enter Serial Number"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
      />

      <button
        className="search-btn"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p className="message">{error}</p>}
    </div>
  )
}

export default SearchBar
