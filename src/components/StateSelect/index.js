function StateSelect(props) {
  let stateList = [];

  props.data.forEach(employee => {
    if (!stateList.includes(employee.state)) {
      stateList.push(employee.state);
    }
  });

  stateList.sort();
  stateList.unshift("All");

  return (
    <select className="custom-select custom-select-sm" name={props.name} onChange={props.changeFunction}>
      {stateList.map(state => (
        <option key={state}>{state}</option>
      ))}
    </select>
  )
}

export default StateSelect;