import { useState } from "react"
import SearchBar from "./components/SearchBar"
import RepairDetails from "./components/RepairDetails"
import AddRepairForm from "./components/AddRepairForm"

function App() {
  const [view, setView] = useState("home")
  const [result, setResult] = useState(null)

  return (
    <div className="app">
      <h1>Amplifier Repair Records</h1>

      {view === "home" && (
        <div className="home">
          <h2 className="home-title">What do you want to do?</h2>

          <div
            className="home-card"
            onClick={() => setView("search")}
          >
            <div className="icon">🔍</div>
            <div>
              <h3>Search Device</h3>
              <p>Find existing repair records</p>
            </div>
          </div>

          <div
            className="home-card primary"
            onClick={() => setView("add")}
          >
            <div className="icon">➕</div>
            <div>
              <h3>Add New Device</h3>
              <p>Register a new repair</p>
            </div>
          </div>
        </div>
      )}

      {view === "search" && (
        <>
          <SearchBar onResult={setResult} />
          <RepairDetails data={result} />

          <button className="back-btn" onClick={() => setView("home")}>
            ← Back
          </button>
        </>
      )}

      {view === "add" && (
        <>
          <AddRepairForm onDone={() => setView("home")} />

          <button className="back-btn" onClick={() => setView("home")}>
            ← Back
          </button>
        </>
      )}
    </div>
  )
}

export default App
