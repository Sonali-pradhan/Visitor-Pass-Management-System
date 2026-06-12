import { useContext } from "react";
import { PassContext } from "../../context/PassContext";

function PassList() {
  const { passes } = useContext(PassContext);

  return (
    <div className="appointments-page">
      <h2>Pass List</h2>

      <table>
        <thead>
          <tr>
            <th>Pass ID</th>
            <th>Visitor</th>
            <th>Host</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {passes.map((pass, index) => (
            <tr key={index}>
              <td>{pass.passId}</td>
              <td>{pass.visitorName}</td>
              <td>{pass.hostName}</td>
              <td>{pass.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PassList;