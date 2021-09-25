function FormInput(props) {
  function getInput() {
    const linkInput = document.getElementById("linkInput").value;
    return linkInput;
  }
  return (
    <form onSubmit={() => props.onSubmit(getInput())}>
      <input type="text" id="linkInput" />
      <input
        type="button"
        onClick={() => props.onSubmit(getInput())}
        value="yeyye"
      />
    </form>
  );
}


export default FormInput;
