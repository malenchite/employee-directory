import React from "react"
import randomUsers from "./randomUserAPI"
import Employee from "../Employee"
import StateSelect from "../StateSelect"
import SortButton from "../SortButton"
import "./style.css"

class EmployeeList extends React.Component {
  state = {
    employees: [],
    sortOrder: "None",
    stateFilter: "All",
    nameFilter: "",
    sortType: "None",
    sortFunction: (a, b) => 0
  }

  /* Construct the list of employees on component mount */
  componentDidMount() {
    randomUsers(this.props.count)
      .then(users => {
        this.setState({ employees: users });
      });
  }

  /* Sets sort type and function */
  setSort = (type, sortFunction) => {
    let sortOrder = "Forward";

    // Reverses order if called again with same type
    if (this.state.sortType === type && this.state.sortOrder === "Forward") {
      sortOrder = "Reverse";
    }

    this.setState(
      {
        sortOrder,
        sortType: type,
        sortFunction
      }
    );
  }

  /* Sets sorting to use last name */
  sortByName = event => {
    event.preventDefault();

    const sortFunction = (a, b) => {
      let nameA = a.lastName.toUpperCase();
      let nameB = b.lastName.toUpperCase();
      if (nameA < nameB) {
        return this.state.sortOrder === "Reverse" ? 1 : -1;
      }
      if (nameA > nameB) {
        return this.state.sortOrder === "Reverse" ? -1 : 1;
      }

      return 0;
    };

    this.setSort("Name", sortFunction);
  }

  /* Sets sorting to use employee state */
  sortByState = event => {
    event.preventDefault();

    const sortFunction = (a, b) => {
      let stateA = a.state.toUpperCase();
      let stateB = b.state.toUpperCase();
      if (stateA < stateB) {
        return this.state.sortOrder === "Reverse" ? 1 : -1;
      }
      if (stateA > stateB) {
        return this.state.sortOrder === "Reverse" ? -1 : 1;
      }

      return 0;
    };

    this.setSort("State", sortFunction);
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
                <form className="form-inline" autocomplete="off">
                  <label className="mr-2">Name</label>
                  <SortButton onClick={this.sortByName} disabled={false} sortOrder={this.state.sortType === "Name" ? this.state.sortOrder : "None"} />
                  <input className="form-control form-control-sm" name="nameFilter" placeholder="Filter" onChange={this.handleFormChange} />
                </form>
              </th>
              <th scope="col">
                <form className="form-inline">
                  <label className="mr-2">State</label>
                  <SortButton onClick={this.sortByState} disabled={this.state.stateFilter !== "All"} sortOrder={this.state.sortType === "State" ? this.state.sortOrder : "None"} />
                  <StateSelect data={this.state.employees} name="stateFilter" changeFunction={this.handleFormChange} />
                </form>
              </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.employees
                .filter(employee => this.checkFilter(employee))
                .sort((empA, empB) => this.state.sortFunction(empA, empB))
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