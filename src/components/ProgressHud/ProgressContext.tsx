import React, { createContext, useContext, useReducer } from 'react';

import ProgressHud from './ProgressHud';

interface State {
  showProgress?: any;
  hideProgress?: any;
}

const initialState: State = {
  showProgress: null,
  hideProgress: null,
};

const ProgressContext = createContext(initialState);

type Props = { children: React.ReactNode };

const ProgressProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), {
    isLoading: false,
    message: '',
  });

  const { isLoading, message } = state;

  const showProgress = (message: string = '') => {
    dispatch({ isLoading: true, message });
  };

  const hideProgress = () => {
    dispatch({ isLoading: false, message: '' });
  };

  const value = { showProgress, hideProgress };

  return (
    <ProgressContext.Provider value={value}>
      {children}

      {isLoading && <ProgressHud message={message} />}
    </ProgressContext.Provider>
  );
};

const useProgress = () => {
  const progressContext = useContext(ProgressContext);

  if (progressContext === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }

  return progressContext;
};

export { ProgressContext, ProgressProvider, useProgress };
