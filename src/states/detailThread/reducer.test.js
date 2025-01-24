/**
 * test scenario for threadsReducer
 *
 * - threadReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggled like thread when given by UP_VOTE_THREAD action
 *
 */

import { describe, it, expect } from 'vitest';
import detailThreadReducer from "./reducer";
import {ActionType} from "./action.js";


describe('detailThreadReducer function', () => {
    it('should return the initial state when given an unknown action', () => {
        // arrange
        const initialState = null;
        const action = { type: 'UNKNOWN' };
        // action
        const nextState = detailThreadReducer(initialState, action);
        // assert
        expect(nextState).toEqual(initialState);
    });

    it('should return the thread detail when given the RECEIVE_THREAD_DETAIL action', () => {
        // arrange
        const initialState = null;
        const action = {
            type: ActionType.RECEIVE_THREAD_DETAIL,
            payload: {
                detailThread: {
                    id: "thread-1",
                    title: "Thread Pertama",
                    body: "Ini adalah thread pertama",
                    category: "General",
                    createdAt: "2021-06-21T07:00:00.000Z",
                    owner: {
                        id: "users-1",
                        name: "John Doe",
                        avatar: "https://generated-image-url.jpg",
                    },
                    upVotesBy: [],
                    downVotesBy: [],
                    comments: [],
                },
            },
        };
        // action
        const nextState = detailThreadReducer(initialState, action);
        // assert
        expect(nextState).toEqual(action.payload.detailThread);
    });

    it('should clear the thread detail when given the CLEAR_THREAD_DETAIL action', () => {
        // arrange
        const initialState = {
            id: "thread-1",
            title: "Thread Pertama",
            body: "Ini adalah thread pertama",
        };
        const action = { type: ActionType.CLEAR_THREAD_DETAIL };
        // action
        const nextState = detailThreadReducer(initialState, action);
        // assert
        expect(nextState).toBeNull();
    });

    it('should add a comment when given the ADD_COMMENT_THREAD action', () => {
        // arrange
        const initialState = {
            id: "thread-1",
            comments: [],
        };
        const action = {
            type: ActionType.ADD_COMMENT_THREAD,
            payload: {
                comment: {
                    id: "comment-1",
                    content: "Ini adalah komentar pertama",
                },
            },
        };
        // action
        const nextState = detailThreadReducer(initialState, action);
        // assert
        expect(nextState).toEqual({
            ...initialState,
            comments: [action.payload.comment],
        });
    });

    it('should toggle up-vote when given the UP_VOTE_THREAD_DETAIL action', () => {
        // arrange
        const initialState = {
            id: "thread-1",
            upVotesBy: [],
            downVotesBy: [],
        };
        const action = {
            type: ActionType.UP_VOTE_THREAD_DETAIL,
            payload: { userId: 'user-1' },
        };
        // action: up vote
        const nextState = detailThreadReducer(initialState, action);
        // assert
        expect(nextState).toEqual({
            ...initialState,
            upVotesBy: ['user-1'],
        });

        // action: neutral vote
        const nextState2 = detailThreadReducer(nextState, action);
        // assert
        expect(nextState2).toEqual(initialState);
    });

    it('should toggle down-vote when given the DOWN_VOTE_THREAD_DETAIL action', () => {
        // arrange
        const initialState = {
            id: "thread-1",
            upVotesBy: ['user-1'],
            downVotesBy: [],
        };
        const action = {
            type: ActionType.DOWN_VOTE_THREAD_DETAIL,
            payload: { userId: 'user-1' },
        };
        // action: down vote
        const nextState = detailThreadReducer(initialState, action);
        // assert
        expect(nextState).toEqual({
            ...initialState,
            upVotesBy: [],
            downVotesBy: ['user-1'],
        });

        // action: neutral vote
        const nextState2 = detailThreadReducer(nextState, action);
        // assert
        expect(nextState2).toEqual({
            ...initialState,
            upVotesBy: [],
            downVotesBy: [],
        });
    });

    it('should neutralize votes when given the NEUTRAL_VOTE_THREAD_DETAIL action', () => {
        // arrange
        const initialState = {
            id: "thread-1",
            upVotesBy: ['user-1'],
            downVotesBy: ['user-2'],
        };
        const action = {
            type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
            payload: { userId: 'user-1' },
        };
        // action
        const nextState = detailThreadReducer(initialState, action);
        // assert
        expect(nextState).toEqual({
            ...initialState,
            upVotesBy: [],
            downVotesBy: ['user-2'],
        });
    });
});
