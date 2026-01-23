import { useState } from "react"
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore"
import { db } from "../firebase"

function SearchBar({ onSingleResult, onMultipleResults }) {
  const [mobile, setMobile] = useState("")
  const [serial, setSerial] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    setError("")
    onSingleResult(null)
    onMultipleResults([])

    if (!mobile.trim() && !serial.trim()) {
      setError("Enter mobile number or serial number")
      return
    }

    setLoading(true)

    try {
      /* 1️⃣ MOBILE SEARCH (MULTIPLE) */
      if (mobile.trim()) {
        const q = query(
          collection(db, "repairs"),
          where("mobileNumber", "==", mobile.trim())
        )

        const snapshot = await getDocs(q)

        if (!snapshot.empty) {
          const records = snapshot.docs.map(doc => doc.data())
          onMultipleResults(records)
          setLoading(false)
          return
        }
      }

      /* 2️⃣ SERIAL SEARCH (SINGLE) */
      if (serial.trim()) {
        const ref = doc(db, "repairs", serial.trim())
        const snap = await getDoc(ref)

        if (snap.exists()) {
          onSingleResult(snap.data())
          setLoading(false)
          return
        }
      }

      setError("No record found")
    } catch (err) {
      console.error(err)
      setError("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="search-box">
      <input
        className="search-input"
        placeholder="Mobile Number"
        inputMode="numeric"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <div className="search-or">OR</div>

      <input
        className="search-input"
        placeholder="Serial Number"
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
