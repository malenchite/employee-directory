import React from "react"
import randomUsers from "./randomUserAPI"
import Employee from "../Employee"
import StateSelect from "../StateSelect"
import SortButton from "../SortButton"
import "./style.css"

class EmployeeList extends React.Component {
  state = {
    employees: [],
    nameSortOrder: "None",
    stateSortOrder: "None",
    stateFilter: "All",
    nameFilter: ""
  }

  /* Construct the list of employees on component mount */
  componentDidMount() {
    randomUsers(this.props.count)
      .then(users => {
        this.setState({ employees: users });
      });
  }

  /* Sorts the employee list by last name */
  sortByName = (event) => {
    event.preventDefault();

    const sorted = this.state.employees.sort((a, b) => {
      let nameA = a.lastName.toUpperCase();
      let nameB = b.lastName.toUpperCase();
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
      let stateA = a.state.toUpperCase();
      let stateB = b.state.toUpperCase();
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

  /* Handles form value change by updating state */
  handleFormChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value.trim()
      }
    );
  }

  /* Checks the filter on an employee based on whether they match the current criteria */
  checkFilter = employee => {
    let filtered;

    /* Filter based on state */
    filtered = this.state.stateFilter !== "All" && employee.state !== this.state.stateFilter;

    /* Filter based on name */
    filtered |= !(employee.firstName.toUpperCase().includes(this.state.nameFilter.toUpperCase())
      || employee.lastName.toUpperCase().includes(this.state.nameFilter.toUpperCase()));

    return !filtered;
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
                  <input className="form-control form-control-sm" name="nameFilter" placeholder="Filter" onChange={this.handleFormChange} />
                </form>
              </th>
              <th scope="col">
                <form className="form-inline">
                  <label className="mr-2">State</label>
                  <SortButton onClick={this.sortByState} disabled={this.state.stateFilter !== "All"} sortOrder={this.state.stateSortOrder} />
                  <StateSelect data={this.state.employees} name="stateFilter" changeFunction={this.handleFormChange} />
                </form>
              </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees
              .filter(employee => this.checkFilter(employee))
              .map(employee => (
                <Employee key={employee.id} data={employee} />
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default EmployeeList;