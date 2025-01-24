/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { asyncRegisterUser } from './action';
import api from '../../utils/api';
import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';

const fakeUserData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
};

const fakeErrorResponse = new Error('Registration failed');

describe('asyncRegisterUser thunk', () => {
    beforeEach(() => {
        api._register = api.register;
    });

    afterEach(() => {
        api.register = api._register;
        delete api._register;
    });

    it('should dispatch action correctly when data fetching success', async () => {
        api.register = vi.fn(() => Promise.resolve());
        
        const dispatch = vi.fn();
        
        await asyncRegisterUser(fakeUserData)(dispatch);
        
        expect(api.register).toHaveBeenCalledWith(fakeUserData);
        expect(dispatch).not.toHaveBeenCalled(); // No actions are dispatched on success
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
        api.register = vi.fn(() => Promise.reject(fakeErrorResponse));
        
        const dispatch = vi.fn();
        
        window.alert = vi.fn();
        
        await asyncRegisterUser(fakeUserData)(dispatch);
        
        expect(api.register).toHaveBeenCalledWith(fakeUserData);
        expect(dispatch).not.toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});
