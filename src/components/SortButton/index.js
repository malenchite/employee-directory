function SortButton(props) {
  return (
    <button className="btn btn-sm btn-secondary mr-2" onClick={props.onClick} disabled={props.disabled}>Sort</button>
  );
}


export default SortButton;