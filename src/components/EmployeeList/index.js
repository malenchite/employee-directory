import React from "react"
import randomUsers from "./randomUserAPI"
import Employee from "../Employee"

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      employees: [],
      sortOrder: false
    };
  }

  /* Construct the list of employees on component mount */
  componentDidMount() {
    randomUsers(this.state.count)
      .then(users => {
        this.setState({ employees: users });
      });
  }

  /* Sorts the employee list by last name */
  sortByName = () => {
    const sorted = this.state.employees.sort((a, b) => {
      let nameA = a.name.last.toUpperCase();
      let nameB = b.name.last.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    /* Toggles sort order if used several times */
    if (this.state.sortOrder) {
      sorted.reverse();
    }

    this.setState(
      {
        employees: sorted,
        sortOrder: !this.state.sortOrder
      }
    );
  }


  render() {
    return (
      <section>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name <button className="btn btn-sm btn-secondary" onClick={this.sortByName}>Sort</button></th>
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