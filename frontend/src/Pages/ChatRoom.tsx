import React from 'react';
import '../CSSsource/ChatRoom.css';
import { useHistory } from 'react-router';

function ChatRoom() {
  const history = useHistory();

  return(
    <div>
      <div className="backgroundChatRoom">
        <div className="frameContractChatRoom">
          <div className="textContractChatRoom">
            Contract
          </div>
        </div>
        <div className="frameChattingNameChatRoom">
          <div className="picChattingNameChatRoom">

          </div>
          <div className="textChattingNameChatRoom">
            Name Here
          </div>
        </div>
        <div className="frameNameListChatRoom">
            <h1>Chat</h1>
            <div className="buttonGobackChatRoom"> 
              <button onClick={ history.goBack }>Go Back</button>
            </div>
        </div>
        <div className="frameChatAndInputChatRoom">
          <div className="frameChatOutputChatRoom">

          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ChatRoom;