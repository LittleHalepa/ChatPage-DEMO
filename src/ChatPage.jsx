import "./Styles/ChatPage.css";
import { useState } from "react";

function ChatPage() {

  const [friendsList, setFriendsList] = useState([]);
  const [currentChat, setCurrentChat] = useState("No one selected!");
  const [selectedFriendIndex, setSelectedFriendIndex] = useState(null);
  const [messages, setMessages] = useState([]);

  function handleFindClick() {
    let potentialFriend = document.querySelector(".search-bar-div input").value;

    for (let i = 0; i < friendsList.length; i++) {
      if (friendsList[i] === potentialFriend) {
        document.querySelector(".search-bar-div input").value = "";
        potentialFriend = "";
        break;
      }
    }

    if (potentialFriend === "") {
      return;
    }

    setFriendsList(f => [...f, potentialFriend]);

    document.querySelector(".search-bar-div input").value = "";
  }

  function handleFindKeyDown(event) {
    if (event.key === "Enter") {
      handleFindClick();
    }
  }

  function handleDeleteClick(index) {
    const newFriendsList = friendsList.filter((_, i) => i !== index);

    if (friendsList[index] === currentChat) {
      setCurrentChat("No one selected!");
      setMessages([]);
    }

    setFriendsList(newFriendsList);
    setSelectedFriendIndex(null);
  }

  function handleSelectChat(event, index) {

    if (event.target.tagName === "H2") {
      const newCurrentChat = event.target.innerText;
      if (newCurrentChat === currentChat) {
        return;
      }
      setCurrentChat(newCurrentChat);
    } else {
      const newCurrentChat = event.target.querySelector(".chat-list-item h2").innerText;
      if (newCurrentChat === currentChat) {
        return; 
      }
      setCurrentChat(newCurrentChat);
    }
    setSelectedFriendIndex(index);
    setMessages([]);

  }

  function handleAddMessage() {
    if (currentChat === "No one selected!") {
      return;
    }

    const newMessage = document.querySelector(".message-input").value;

    if (newMessage) {
      setMessages(m => [...m, newMessage]);
      document.querySelector(".message-input").value = "";
    }
  }

  function handleMessageKeyDownAdd(event) {
    if (event.key === "Enter") {
      handleAddMessage();
    }
  }

  return (
    
    
    <div className="container">

      <ul>
        {messages.map((message, index) => (
          <li key={index} className="message-item-li">
            <h3 className="author-of-message">You:</h3>
            <div className="message-div-item">
              <p className="message-text-item">
                {message}
              </p>
            </div>
          </li>
        ))}
      </ul>
      
        <header className="header">
          <h1 className="header-chat-name">{currentChat}</h1>
        </header>
        <nav className="side-bar">
          <div className="search-bar-div">
            <div>
              <input type="text" placeholder="Find friends" onKeyDown={handleFindKeyDown}/>
              <button onClick={handleFindClick}>Find</button>
            </div>
          </div>
          <div className="chat-list-div">
            <ul>
              {friendsList.map((friend, index) => (
                <li key={index}>
                  <div className="chat-list-item" onClick={(event) => handleSelectChat(event, index)} style={{
                  backgroundColor: selectedFriendIndex === index ? "rgba(61, 69, 238, 0.51)" : "rgb(61, 69, 238)"
                  }}>
                    <h2 onClick={handleSelectChat} className="h2-friend">
                      {friend}
                    </h2>
                    <button onClick={() => handleDeleteClick(index)}>
                      <i class='bx bxs-trash-alt'></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <footer>
          <input type="text" placeholder="Type your message here!" className="message-input" onKeyDown={handleMessageKeyDownAdd}/>
          <button onClick={handleAddMessage}>Send</button>
        </footer>
      </div>
    

  );
}

export default ChatPage;