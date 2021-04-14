import React from "react"
import randomUsers from "./randomUserAPI"
import Employee from "../Employee"
import StateSelect from "../StateSelect"

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      employees: [],
      nameSortOrder: false,
      stateSortOrder: false,
      stateSortEnabled: true
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
  sortByName = (event) => {
    event.preventDefault();
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
    if (this.state.nameSortOrder) {
      sorted.reverse();
    }

    this.setState(
      {
        employees: sorted,
        nameSortOrder: !this.state.nameSortOrder,
        stateSortOrder: false
      }
    );
  }

  /* Sorts the employee list by state */
  sortByState = (event) => {
    event.preventDefault();
    const sorted = this.state.employees.sort((a, b) => {
      let stateA = a.location.state.toUpperCase();
      let stateB = b.location.state.toUpperCase();
      if (stateA < stateB) {
        return -1;
      }
      if (stateA > stateB) {
        return 1;
      }

      return 0;
    });

    /* Toggles sort order if used several times */
    if (this.state.stateSortOrder) {
      sorted.reverse();
    }

    this.setState(
      {
        employees: sorted,
        stateSortOrder: !this.state.stateSortOrder,
        nameSortOrder: false
      }
    );
  }

  /* Sets the filtered state on employees based on whether they match the specified state */
  handleStateFilter = (event) => {
    const filtered = [...this.state.employees];

    if (event.target.value !== "All") {
      filtered.forEach(employee => {
        employee.filtered = employee.location.state !== event.target.value;
      });
    } else {
      filtered.forEach(employee => {
        employee.filtered = false;
      });
    }

    this.setState(
      {
        employees: filtered,
        stateFilter: event.target.value,
        stateSortEnabled: event.target.value === "All"
      }
    );
  }

  render() {
    return (
      <section>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                <form className="form-inline">
                  <label className="mr-2">Name</label>
                  <button className="btn btn-sm btn-secondary" onClick={this.sortByName}>Sort</button>
                </form>
              </th>
              <th scope="col">
                <form className="form-inline">
                  <label className="mr-2">State</label>
                  <button className="btn btn-sm btn-secondary mr-2" onClick={this.sortByState} disabled={!this.state.stateSortEnabled}>Sort</button>
                  <StateSelect data={this.state.employees} changeFunction={this.handleStateFilter} />
                </form>
              </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees
              .filter(employee => !employee.filtered)
              .map(employee => (
                <Employee key={employee.login.uuid} data={employee} />
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default EmployeeList;