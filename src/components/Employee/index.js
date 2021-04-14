function Employee(props) {
  return (
    <tr>
      <td>{props.data.lastName}, {props.data.firstName}</td>
      <td>{props.data.state}</td>
      <td>{props.data.email}</td>
      <td>{props.data.phone}</td>
    </tr>
  );
}

export default Employee;