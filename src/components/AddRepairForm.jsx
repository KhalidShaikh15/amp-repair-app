import { useState } from "react"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"

function AddRepairForm({ onDone }) {
  const today = new Date().toISOString().split("T")[0]

  const [form, setForm] = useState({
    brand: "",
    modelNumber: "",
    serialNumber: "",
    clientName: "",
    mobileNumber: "",
    city: "",
    dateReceived: today,
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

    /* ✅ REQUIRED VALIDATIONS */
    if (!form.serialNumber.trim()) {
      setMessage("Serial Number is required")
      return
    }

    if (!form.mobileNumber.trim()) {
      setMessage("Mobile number is required")
      return
    }

    if (form.mobileNumber.trim().length < 8) {
      setMessage("Enter a valid mobile number")
      return
    }

    setLoading(true)

    const finalDateReceived =
      form.dateReceived && form.dateReceived.trim()
        ? form.dateReceived
        : today

    const totalAmount =
      Number(form.repairAmount || 0) + Number(form.courierCharge || 0)

    try {
      const docRef = doc(db, "repairs", form.serialNumber.trim())

      const existing = await getDoc(docRef)
      if (existing.exists()) {
        setMessage("This serial number already exists")
        setLoading(false)
        return
      }

      await setDoc(docRef, {
        ...form,
        mobileNumber: form.mobileNumber.trim(), // ✅ always stored
        dateReceived: finalDateReceived,
        repairAmount: Number(form.repairAmount),
        courierCharge: Number(form.courierCharge),
        totalAmount,
        createdAt: serverTimestamp()
      })

      setMessage("Repair record saved ✅")
      setLoading(false)

      /* ✅ NAVIGATE ONLY AFTER SUCCESS */
      if (onDone) {
        setTimeout(() => {
          onDone()
        }, 300)
      }

    } catch (err) {
      console.error(err)
      setMessage("Something went wrong while saving")
      setLoading(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add New Device</h2>

      <input name="brand" placeholder="Amplifier Brand" value={form.brand} onChange={handleChange} />
      <input name="modelNumber" placeholder="Model Number" value={form.modelNumber} onChange={handleChange} />

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
        placeholder="Mobile Number *"
        value={form.mobileNumber}
        onChange={handleChange}
      />

      <input name="city" placeholder="City / Address" value={form.city} onChange={handleChange} />

      <input
        type="date"
        name="dateReceived"
        value={form.dateReceived}
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
