import { useEffect, useRef } from "react";

const ChatMessage = ({ message, sender, icon, loading }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    if (sender === "bot" && !loading && messageRef.current) {
      messageRef.current.innerHTML = "";
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < message.length) {
          messageRef.current.innerHTML += message.charAt(i);
          i++;
        } else {
          clearInterval(typingEffect);
        }
      }, 20);
      return () => clearInterval(typingEffect);
    }
  }, [message, sender, loading]);

  return (
    <div className={`message ${sender}`}>
      {sender === "bot" && icon && (
        <img src={icon} alt="Bot" className="message-icon" />
      )}
      <div className="message-content">
        {loading ? (
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        ) : (
          <p ref={messageRef}>{sender === "user" ? message : ""}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
