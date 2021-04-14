function Employee(props) {
  return (
    <div>
      {props.data.name.first + " " + props.data.name.last}
    </div>
  );
}

export default Employee;