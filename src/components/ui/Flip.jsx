import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";

const Flip = ({ question, answer }) => {
  const [showanswer, setShowanswer] = useState(false);

  return (
    <article
      onClick={() => setShowanswer((prev) => !prev)}
      className="flip tips"
    >
      <div>
        <h3>{question}</h3>
        <button className="flip-icon">
          {showanswer ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      {showanswer && <p>{answer}</p>}
    </article>
  );
};

export default Flip;
