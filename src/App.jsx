import { useState } from "react"
import SearchBar from "./components/SearchBar"
import RepairDetails from "./components/RepairDetails"
import AddRepairForm from "./components/AddRepairForm"

function App() {
  const [view, setView] = useState("home") // home | search | add
  const [result, setResult] = useState(null)
  const [list, setList] = useState([])

  const goHome = () => {
    setView("home")
    setResult(null)
    setList([])
  }

  return (
    <div className="app">
      {/* 🔝 HEADER */}
      {view !== "home" && (
        <div className="app-header">
          <button className="back-top" onClick={goHome}>
            ←
          </button>
          <h2>
            {view === "search" && "Search Device"}
            {view === "add" && "Add New Device"}
          </h2>
        </div>
      )}

      {/* 🏠 HOME */}
      {view === "home" && (
        <>
          <h1>Amplifier Repair Records</h1>

          <div className="home">
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
        </>
      )}

      {/* 🔍 SEARCH */}
      {view === "search" && (
        <>
          <SearchBar
            onSingleResult={(data) => {
              setResult(data)
              setList([])
            }}
            onMultipleResults={(dataList) => {
              setList(dataList)
              setResult(null)
            }}
          />

          {/* MULTIPLE RESULTS */}
          {list.length > 0 && (
            <div className="results-list">
              <h3>Select a Device</h3>

              {list.map((item, index) => (
                <div
                  key={index}
                  className="result-card"
                  onClick={() => setResult(item)}
                >
                  <p><strong>Serial:</strong> {item.serialNumber}</p>
                  <p><strong>Client:</strong> {item.clientName}</p>
                </div>
              ))}
            </div>
          )}

          {/* SINGLE RESULT */}
          {result && <RepairDetails data={result} />}
        </>
      )}

      {/* ➕ ADD */}
      {view === "add" && (
        <AddRepairForm onDone={goHome} />
      )}
    </div>
  )
}

export default App
