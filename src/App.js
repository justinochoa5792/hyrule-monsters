import Axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [creature, setCreature] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await Axios.get(
      `https://botw-compendium.herokuapp.com/api/v2/entry/${search}`
    );
    setCreature(response.data);
  };

  return (
    <div className="App">
      <h1>Creatures of Hyrule</h1>
      <div className="formContainer">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for Creatures"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      {Object.keys(creature).length > 0 ? (
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src={creature.data.image}
            alt={creature.data.name}
          />
          <div className="card-body">
            <h5 className="card-title">{creature.data.name}</h5>
            <p className="card-text">{creature.data.description}</p>
            <p className="card-text">
              <strong>Location:</strong>
              {creature.data.common_locations}
            </p>
          </div>
        </div>
      ) : (
        <h2>No Creatures Found</h2>
      )}
    </div>
  );
}

export default App;
