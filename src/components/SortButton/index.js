function SortButton(props) {

  const renderArrow = sortOrder => {
    switch (props.sortOrder) {
      case "Forward": return "↓";
      case "Reverse": return "↑";
      default: return "";
    }
  }

  return (
    <button className="btn btn-sm btn-secondary mr-2" style={{ width: "3.5rem" }} onClick={props.onClick} disabled={props.disabled}>
      Sort {renderArrow(props.sortOrder)}
    </button>
  );
}


export default SortButton;