import { useState } from "react";
import { ListGroup } from "react-bootstrap";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button
        onClick={addElement}
        className="bg-success btn text-white border-0 m-1"
      >
        Add Element
      </button>
      <ListGroup>
        {array.map((item, index) => (
          <ListGroup.Item key={index} className="w-25">
            {item}
            <button
              onClick={() => deleteElement(index)}
              className="bg-danger btn text-white border-0 ms-5"
            >
              Delete
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
