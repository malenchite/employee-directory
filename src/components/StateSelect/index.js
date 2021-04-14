function StateSelect(props) {
  let stateList = [];

  props.data.forEach(employee => {
    if (!stateList.includes(employee.location.state)) {
      stateList.push(employee.location.state);
    }
  });

  stateList.sort();
  stateList.unshift("All");

  return (
    <select className="custom-select custom-select-sm" onChange={props.changeFunction}>
      {stateList.map(state => (
        <option key={state}>{state}</option>
      ))}
    </select>
  )
}

export default StateSelect;