import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInput = useRef(null);
  const feedbackInput = useRef(null);

  function submitFormHandler(e) {
    e.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredFeedback = feedbackInput.current.value;
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        text: enteredFeedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input id="email" type="email" ref={emailInput} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInput}></textarea>
        </div>
        <button>Send feedback</button>
        <hr />
        <button onClick={loadFeedbackHandler}>Load feedback</button>
        <ul>
          {feedbackItems.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default HomePage;
