import { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(7);
  console.log(count);
  return (
    <div id="wd-counter-use-state">
      <h2>Counter: {count}</h2>
      <button
        onClick={() => setCount(count + 1)}
        id="wd-counter-up-click"
        className="bg-success border-0 btn text-white me-2"
      >
        Up
      </button>
      <button
        onClick={() => setCount(count - 1)}
        id="wd-counter-down-click"
        className="bg-danger border-0 btn text-white"
      >
        Down
      </button>
      <hr />
    </div>
  );
}
