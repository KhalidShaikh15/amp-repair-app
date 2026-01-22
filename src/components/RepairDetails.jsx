function RepairDetails({ data, onEdit }) {
  if (!data) return null

  return (
    <div className="details">
      <h2>Repair Details</h2>

      <p><strong>Brand:</strong> {data.brand}</p>
      <p><strong>Model:</strong> {data.modelNumber}</p>
      <p><strong>Client Name:</strong> {data.clientName}</p>
      <p><strong>Mobile:</strong> {data.mobileNumber}</p>
      <p><strong>City:</strong> {data.city}</p>

      <hr />

      <p><strong>Repair Amount:</strong> ₹{data.repairAmount}</p>
      <p><strong>Courier Charge:</strong> ₹{data.courierCharge}</p>
      <p><strong>Total Amount:</strong> ₹{data.totalAmount}</p>

      <hr />

      <p><strong>Problem:</strong></p>
      <p>{data.problemDescription}</p>

      
    </div>
  )
}

export default RepairDetails
