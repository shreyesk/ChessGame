import "./App.css";

import Interface from "./components/Interface";
  
function App() {
  return (
    <>
      <div className='App'>
        <Interface />
        <form action="../../post" method="post" className="form">
          <button type="submit">Connected?</button>
        </form>
      </div>
    </>
  );
}
  
export default App;