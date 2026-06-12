import "./CheckInOut.css";
import { useContext } from "react";
import { PassContext } from "../../context/PassContext";

function CheckInOut() {
  const { passes } = useContext(PassContext);

  return (
    <div className="check-page">
      <h2>Check In / Check Out</h2>

      <table>
        <thead>
          <tr>
            <th>Visitor</th>
            <th>Pass Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {passes.map((pass, index) => (
            <tr key={index}>
              <td>{pass.visitorName}</td>
              <td>{pass.passId}</td>
              <td>Pending</td>

              <td>
                <button>
                  Check In
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckInOut;