import "./App.css";
import Password from "./components/Password";

function App() {
  return (
    <div className="p-4">
      <Password
        passwordReqs={[
          "hasNumber",
          "hasSpecialCharacters",
          "hasUppercaseLetter",
        ]}
      />
    </div>
  );
}

export default App;
