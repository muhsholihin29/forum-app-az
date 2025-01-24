import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput.jsx';
import ThreadsList from '../components/ThreadsList.jsx';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread, asyncDownVoteThread, asyncNeutralVoteThread, asyncUpVoteThread } from '../states/threads/action';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states); // @TODO: get threads, users, and authUser state from store

  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to populate threads and users data
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = (thread) => {
    const { title, category, body } = thread;
    dispatch(asyncAddThread({ title, category, body }));
  };


  const onUpVote = (id) => {
    // @TODO: dispatch async action to toggle like thread
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVote = (id) => {
    // @TODO: dispatch async action to toggle like thread
    dispatch(asyncDownVoteThread(id));
  };

  const onNeutralVote = (id) => {
    // @TODO: dispatch async action to toggle like thread
    dispatch(asyncNeutralVoteThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <ThreadInput addThread={onAddThread} />
      <ThreadsList threads={threadList} upVote={onUpVote}  downVote={onDownVote} neutralVote={onNeutralVote}/>
    </section>
  );
}

export default HomePage;
