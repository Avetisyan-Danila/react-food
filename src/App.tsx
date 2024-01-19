import Button from "./components/Button/Button.tsx";
import {useState} from "react";
import Input from "./components/Input/Input.tsx";

function App() {
  const [counter, setCounter] = useState<number>(0);

  const increment = () => {
    setCounter((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <>
      <Button onClick={increment}>Кнопка</Button>
      {counter}

      <Button appearance='big' onClick={increment}>Кнопка</Button>
      <Input placeholder="Email" />
    </>
  );
}

export default App;
