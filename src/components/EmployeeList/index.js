import React from "react"
import randomUsers from "./randomUserAPI"
import Employee from "../Employee"
import StateSelect from "../StateSelect"
import SortButton from "../SortButton"
import "./style.css"

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      employees: [],
      nameSortOrder: "None",
      stateSortOrder: "None",
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
    let newSortOrder = "Forward";

    /* Toggles sort order if used several times */
    if (this.state.nameSortOrder === "Forward") {
      newSortOrder = "Reverse";
      sorted.reverse();
    }

    this.setState(
      {
        employees: sorted,
        nameSortOrder: newSortOrder,
        stateSortOrder: "None"
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
    let newSortOrder = "Forward";

    /* Toggles sort order if used several times */
    if (this.state.stateSortOrder === "Forward") {
      newSortOrder = "Reverse";
      sorted.reverse();
    }

    this.setState(
      {
        employees: sorted,
        stateSortOrder: newSortOrder,
        nameSortOrder: "None"
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
      <section className="container">
        <table className="table custom-striped">
          <thead>
            <tr>
              <th scope="col">
                <form className="form-inline">
                  <label className="mr-2">Name</label>
                  <SortButton onClick={this.sortByName} disabled={false} sortOrder={this.state.nameSortOrder} />
                </form>
              </th>
              <th scope="col">
                <form className="form-inline">
                  <label className="mr-2">State</label>
                  <SortButton onClick={this.sortByState} disabled={!this.state.stateSortEnabled} sortOrder={this.state.stateSortOrder} />
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