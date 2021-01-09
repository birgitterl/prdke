import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { postMessage } from '../../actions/messageservice';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { setAlert } from '../../actions/alert';

export function Message({ postMessage }) {
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setEmoji(emojiObject);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!emoji) {
      console.log('no emoji');
      var data = {
        text: text,
        emoji: null
      };
      postMessage(data);
    } else {
      var data = {
        text: text,
        emoji: emoji.emoji
      };
      postMessage(data);
      console.log('postMessage called');
      setText('');
      setEmoji(null);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <h3>Post a Message</h3>
      <Form.Group controlId="text">
        <Form.Control
          as="textarea"
          rows={5}
          type="text"
          id="text"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="You can write 280 characters..."
          maxLength="280"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        {emoji ? (
          <span>Your emoji: {emoji.emoji}</span>
        ) : (
          <div>
            <h4>Show your mood and select an emoji!</h4>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </Form.Group>
      <br></br>
      <Button type="submit" className="btn-primary-width-full">
        Post new message
      </Button>
    </Form>
  );
}

Message.propTypes = {
  postMessage: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(mapStateToProps, {
  postMessage
})(Message);
