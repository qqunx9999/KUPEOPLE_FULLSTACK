import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { Thread } from '../interfaces/threadEntity';
import ThreadService from '../service/ThreadService';
import Navigtion from '../component/NavBar';
import CommentForm from '../component/CommentForm';

function CreateComment_new() {
  const [thread, setThread] = useState<Thread[]>([]);
  const history = useHistory();
  const { ThreadID } = useParams();

  const temp = {
    "margin": "10px"
  };

  const fetchThread = () => {
    ThreadService.fetchThread()
      .then(obj => {
        setThread(obj);
      });
  };

  useEffect(() => {
    fetchThread();
  }, []);

  return (
    <div>
      <Navigtion />
      <div style={temp}>
        <h1>Give Comment</h1>
        <button onClick={history.goBack}>Go Back</button> <br />
        Topic:
        {thread.map(item => {
          if (item.threadID === { ThreadID }.ThreadID) {
            return " " + item.topic;
          }
        })}
        <CommentForm />
      </div>
    </div>
  );
}

export default CreateComment_new;