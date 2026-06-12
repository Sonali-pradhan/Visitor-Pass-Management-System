import { useContext } from "react";
import { VisitorContext } from "../../context/VisitorContext";

import "./Visitor.css";

function Visitors() {
  const { visitors } = useContext(VisitorContext);
console.log(visitors)
  return (
    <div className="visitors-page">
      <h2>Visitors List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Purpose</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((visitor, index) => (
            <tr key={index}>
              <td>{visitor.name}</td>
              <td>{visitor.email}</td>
              <td>{visitor.phone}</td>
              <td>{visitor.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Visitors;