import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import jwt_decode from 'jwt-decode';
import { postMessage } from '../../actions/messageservice';

export function Message(props) {
  const [text, setText] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [published, setPublished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const saveMessage = () => {
    const token = localStorage.getItem('token');
    console.log(token);

    var data = {
      author: jwt_decode(token).user.username,
      text: text + '[' + chosenEmoji.emoji + ']'
    };
    console.log(data);

    postMessage(data);
    console.log('postMessage called');
    setPublished(true);
    setSubmitted(true);
  };

  const newMessage = () => {
    setText('');
    setChosenEmoji(null);
    setPublished(false);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Message posted successfully!</h4>
          <button className="btn btn-success" onClick={newMessage}>
            New Message
          </button>
        </div>
      ) : (
        <div>
          <h3>New messages/posts</h3>
          <div className="form-group">
            <label htmlFor="text">Message</label>
            <textarea
              type="text"
              className="form-control"
              id="text"
              required
              value={text}
              onChange={onChangeText}
              name="text"
              maxLength="280"
            />
          </div>
          <div>
            {chosenEmoji ? (
              <span>Your emoji: {chosenEmoji.emoji}</span>
            ) : (
              <div>
                <p>No emoji chosen. Show your emotion!</p>
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
          <br></br>
          <button onClick={saveMessage} className="btn btn-success">
            Post
          </button>
        </div>
      )}
    </div>
  );
}

export default Message;
