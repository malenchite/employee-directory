import React from "react"
import randomUsers from "./randomUserAPI"
import Employee from "../Employee"

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      employees: []
    };
  }

  /* Construct the list of employees on component mount */
  componentDidMount() {
    randomUsers(this.state.count)
      .then(users => {
        this.setState({ employees: users });
      });
  }

  render() {
    return (
      <section>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">State</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(employee => (
              <Employee key={employee.login.uuid} data={employee} />
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default EmployeeList;