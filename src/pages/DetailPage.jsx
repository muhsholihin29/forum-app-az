import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DetailThread from '../components/DetailThread.jsx';
import ThreadItem from '../components/ThreadItem.jsx';
import ThreadCommentInput from '../components/ThreadCommentInput.jsx';
import {
  asyncAddCommentThread,
  asyncDownVoteDetailThread, asyncNeutralVoteDetailThread,
  asyncReceiveDetailThread,
  asyncUpVoteDetailThread
} from '../states/detailThread/action';
import CommentList from '../components/CommentList.jsx';

function DetailPage() {
  const { id } = useParams();
  const {
    detailThread = null,
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [id, dispatch]);

  const onUpVoteThread = () => {
    // @TODO: dispatch async action to toggle like thread detail
    dispatch(asyncUpVoteDetailThread());
  };

  const onDownVoteThread = () => {
    dispatch(asyncDownVoteDetailThread());
  };

  const onNeutralVoteThread = () => {
    dispatch(asyncNeutralVoteDetailThread());
  };

  const onCommentThread = (content) => {
    dispatch(asyncAddCommentThread(id, content));
  };


  if (!detailThread) {
    return null;
  }

  return (
    <section className="detail-page">
      {
        detailThread.parent && (
          <div className="detail-page__parent">
            <h3>Replying To</h3>
            <ThreadItem {...detailThread.parent} authUser={authUser.id}/>
          </div>
        )
      }
      <DetailThread {...detailThread} authUser={authUser.id} upVoteThread={onUpVoteThread}
        downVoteThread={onDownVoteThread} neutralVoteThread={onNeutralVoteThread}/>
      <ThreadCommentInput commentThread={onCommentThread}/>
      <CommentList comments={detailThread.comments}/>
    </section>
  );
}

export default DetailPage;
