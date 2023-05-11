/* eslint-disable max-len */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Modalize } from 'react-native-modalize';
import InfoModal from './InfoModal';
import { closeInfoModal } from '../../store/actions/info';
import { AnyAction } from 'redux';
import { describe, beforeEach, it, expect } from '@jest/globals';
import { MockStore } from 'redux-mock-store';

const mockStore = configureMockStore([]);

jest.mock('react-native-modalize', () => {
  return {
    Modalize: jest.fn().mockImplementation(() => {
      return {
        open: jest.fn(),
        close: jest.fn(),
      };
    }),
  };
});

describe('InfoModal', () => {
  let store: MockStore<unknown, AnyAction>;

  beforeEach(() => {
    store = mockStore({
      app: {
        modalInfo: {
          open: true,
          content: [
            {
              name: 'Feature 1',
              description: 'This is the first feature',
            },
            {
              name: 'Feature 2',
              description: 'This is the second feature',
            },
          ],
          title: 'Info Modal Title',
        },
      },
      theme: {
        colors: {
          light: '#FFFFFF',
          dark: '#000000',
        },
      },
    });
  });

  it('renders the modal with the correct title and content', () => {
    const { getByText } = render(
      <Provider store={store}>
        <InfoModal />
      </Provider>
    );

    expect(getByText('Info Modal Title')).toBeDefined();
    expect(getByText('Feature 1')).toBeDefined();
    expect(getByText('This is the first feature')).toBeDefined();
    expect(getByText('Feature 2')).toBeDefined();
    expect(getByText('This is the second feature')).toBeDefined();
  });

  it('closes the modal when the Close button is pressed', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <InfoModal />
      </Provider>
    );

    fireEvent.press(getByTestId('close-button'));

    expect(store.getActions()).toContainEqual(closeInfoModal());
  });

  it('opens and closes the modal based on the "open" property in redux store', () => {
    const { rerender } = render(
      <Provider store={store}>
        <InfoModal />
      </Provider>
    );

    expect(Modalize.prototype.open).toHaveBeenCalled();

    store.dispatch({
      type: 'SET_MODAL_INFO',
      payload: {
        open: false,
        content: [],
        title: '',
      },
    });

    rerender(
      <Provider store={store}>
        <InfoModal />
      </Provider>
    );

    expect(Modalize.prototype.close).toHaveBeenCalled();
  });
});
