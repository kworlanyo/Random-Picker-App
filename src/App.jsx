import RandomPicker from "./components/RandomPicker";
import RandomPickerContextProvider from "./context/RandomPickerContext";

function App() {
  return (
    <>
      <RandomPickerContextProvider>
        <RandomPicker />
      </RandomPickerContextProvider>
    </>
  );
}

export default App;
