import React from "react"
import randomUsers from "./randomUserAPI"

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    console.log("Constructor called");
    this.state = {
      count: props.count,
      employees: []
    };
  }
  componentDidMount() {
    const employees = randomUsers(this.state.count);
    this.setState({ employees });
  }

  render() {
    return (
      <section>

      </section>
    );
  }
}

export default EmployeeList;