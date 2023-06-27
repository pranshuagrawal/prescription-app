const AddLayout = (props) => {
  const { title = "", onClick = () => {} } = props;
  return (
    <div className="add-layout-container" onClick={onClick}>
      Add {title}
    </div>
  );
};

export default AddLayout;
