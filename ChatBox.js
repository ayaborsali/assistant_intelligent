import { useState } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);

    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Erreur connexion au serveur" }]);
    }

    setInput("");
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h2>Assistant TataDashboard 🤖</h2>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "scroll", padding: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: "5px 0" }}>
            <b>{msg.role}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Pose ta question..."
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
}

export default ChatBox;
