function Employee(props) {
  return (
    <tr>
      <td>{props.data.name.last}, {props.data.name.first}</td>
      <td>{props.data.location.state}</td>
      <td>{props.data.email}</td>
      <td>{props.data.phone}</td>
    </tr>
  );
}

export default Employee;