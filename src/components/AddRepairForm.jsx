import { useState } from "react"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"

function AddRepairForm({ onDone }) {
  const [form, setForm] = useState({
    brand: "",
    modelNumber: "",
    serialNumber: "",
    clientName: "",
    mobileNumber: "",
    city: "",
    repairAmount: "",
    courierCharge: "",
    problemDescription: ""
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    if (!form.serialNumber.trim()) {
      setMessage("Serial Number is required")
      return
    }

    setLoading(true)

    const totalAmount =
      Number(form.repairAmount || 0) + Number(form.courierCharge || 0)

    try {
      const docRef = doc(db, "repairs", form.serialNumber.trim())

      // ❗ Prevent overwrite
      const existing = await getDoc(docRef)
      if (existing.exists()) {
        setMessage("This serial number already exists")
        setLoading(false)
        return
      }

      await setDoc(docRef, {
        ...form,
        repairAmount: Number(form.repairAmount),
        courierCharge: Number(form.courierCharge),
        totalAmount,
        createdAt: serverTimestamp()
      })

      setMessage("Repair record saved ✅")

      setForm({
        brand: "",
        modelNumber: "",
        serialNumber: "",
        clientName: "",
        mobileNumber: "",
        city: "",
        repairAmount: "",
        courierCharge: "",
        problemDescription: ""
      })

      if (onDone) onDone()
    } catch (err) {
      console.error(err)
      setMessage("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add Device</h2>

      <input
        name="brand"
        placeholder="Amplifier Brand"
        value={form.brand}
        onChange={handleChange}
      />

      <input
        name="modelNumber"
        placeholder="Model Number"
        value={form.modelNumber}
        onChange={handleChange}
      />

      {/* ✅ Serial ALWAYS editable */}
      <input
        name="serialNumber"
        placeholder="Serial Number *"
        value={form.serialNumber}
        onChange={handleChange}
      />

      <input
        name="clientName"
        placeholder="Client Name"
        value={form.clientName}
        onChange={handleChange}
      />

      <input
        name="mobileNumber"
        inputMode="numeric"
        placeholder="Mobile Number"
        value={form.mobileNumber}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City / Address"
        value={form.city}
        onChange={handleChange}
      />

      <input
        name="repairAmount"
        type="number"
        inputMode="numeric"
        placeholder="Repair Amount ₹"
        value={form.repairAmount}
        onChange={handleChange}
      />

      <input
        name="courierCharge"
        type="number"
        inputMode="numeric"
        placeholder="Courier Charge ₹"
        value={form.courierCharge}
        onChange={handleChange}
      />

      <textarea
        name="problemDescription"
        rows="4"
        placeholder="Problem Description"
        value={form.problemDescription}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Repair"}
      </button>

      {message && <p className="message">{message}</p>}
    </form>
  )
}

export default AddRepairForm
