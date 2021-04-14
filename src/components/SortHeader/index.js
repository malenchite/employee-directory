function SortButton(props) {

  const renderArrow = () => {
    const sortOrder = props.label === props.sortType ? props.sortOrder : "None";
    switch (sortOrder) {
      case "Forward": return "↓";
      case "Reverse": return "↑";
      default: return "";
    }
  }

  return (
    <span>
      <label className="mr-2" style={{ display: "inline-block" }}>{props.label}</label>
      <button className="btn btn-sm btn-secondary mr-2" style={{ width: "3.5rem" }} onClick={props.clickFunction} disabled={props.disabled}>
        Sort {renderArrow()}
      </button>
    </span>
  );
}


export default SortButton;