import "./index.css";

function FormInput(props) {
  function getInput() {
    const linkInput = document.getElementById("linkInput").value;
    return linkInput;
  }
  return (
    <form
      className="flex flex-col w-full justify-center items-center space-y-6"
      onSubmit={() => props.onSubmit(getInput())}
    >
      <input
        className="focus:ring-2 focus:ring-blue-600 shadow appearance-none border-2 border-gray-300 h-14 w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="linkInput"
        type="text"
      />

      <input
        type="button"
        onClick={() => props.onSubmit(getInput())}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        value="Thread"
      />
    </form>
  );
}

export default FormInput;
