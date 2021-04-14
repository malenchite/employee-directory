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

  componentDidMount() {
    randomUsers(this.state.count)
      .then(users => {
        this.setState({ employees: users });
      });
  }

  render() {
    return (
      <section>
        {this.state.employees.map(employee => (
          <Employee key={employee.login.uuid} data={employee} />
        ))}
      </section>
    );
  }
}

export default EmployeeList;