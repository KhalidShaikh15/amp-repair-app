import { useState } from "react"
import SearchBar from "./components/SearchBar"
import RepairDetails from "./components/RepairDetails"
import AddRepairForm from "./components/AddRepairForm"

function App() {
  const [view, setView] = useState("home")
  const [result, setResult] = useState(null)

  return (
    <div className="app">
      {/* 🔝 HEADER */}
      {view !== "home" && (
        <div className="app-header">
          <button
            className="back-top"
            onClick={() => setView("home")}
          >
            ←
          </button>
          <h2>
            {view === "search" ? "Search Device" : "Add New Device"}
          </h2>
        </div>
      )}

      {/* 🏠 HOME */}
      {view === "home" && (
        <>
          <h1>Amplifier Repair Records</h1>

          <div className="home">
            <div className="home-card" onClick={() => setView("search")}>
              <div className="icon">🔍</div>
              <div>
                <h3>Search Device</h3>
                <p>Find existing repair records</p>
              </div>
            </div>

            <div className="home-card primary" onClick={() => setView("add")}>
              <div className="icon">➕</div>
              <div>
                <h3>Add New Device</h3>
                <p>Register a new repair</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 🔍 SEARCH */}
      {view === "search" && (
        <>
          <SearchBar onResult={setResult} />
          <RepairDetails data={result} />
        </>
      )}

      {/* ➕ ADD */}
      {view === "add" && <AddRepairForm onDone={() => setView("home")} />}
    </div>
  )
}

export default App
