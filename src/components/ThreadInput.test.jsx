/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call thread function when thread button is clicked
 */

import React from 'react';
import {
    describe, it, expect, afterEach,  vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import ThreadInput from './ThreadInput';

expect.extend(matchers);

describe('ThreadInput component', () => {
    afterEach(() => {
        cleanup();
    });

    it('should handle title, category and body typing correctly', async () => {
        // Arrange
        render(<ThreadInput addThread={() => {}}/>);
        const titleInput = await screen.getByPlaceholderText('Title');
        const categoryInput = await screen.getByPlaceholderText('Category');
        const bodyInput = await screen.getByPlaceholderText('What are you thinking?');

        // Action
        await userEvent.type(titleInput, 'titletest');
        await userEvent.type(categoryInput, 'categorytest');
        await userEvent.type(bodyInput, 'bodytest');

        // Assert
        expect(titleInput).toHaveValue('titletest');
        expect(categoryInput).toHaveValue('categorytest');
        expect(bodyInput).toHaveValue('bodytest');
    });

    it('should call thread function when thread button is clicked', async () => {
        // Arrange
        const mockThread = vi.fn();
        render(<ThreadInput addThread={mockThread}/>);
        const titleInput = await screen.getByPlaceholderText('Title');
        await userEvent.type(titleInput, 'titletest');
        const categoryInput = await screen.getByPlaceholderText('Category');
        await userEvent.type(categoryInput, 'categorytest');
        const bodyInput = await screen.getByPlaceholderText('What are you thinking?');
        await userEvent.type(bodyInput, 'bodytest');
        const threadButton = await screen.getByRole('button', { name: 'Thread' });

        // Action
        await userEvent.click(threadButton);

        // Assert
        expect(mockThread).toBeCalledWith({
            title: 'titletest',
            category: 'categorytest',
            body: 'bodytest',
        });
    });
});
