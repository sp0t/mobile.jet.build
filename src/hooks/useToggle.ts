import { useCallback, useState } from 'react';

export default function useToggle(): [boolean, () => void] {
  const [isVisible, setIsVisible] = useState(false);

  const setToggle = () => {
    setIsVisible(!isVisible);
  };

  return [isVisible, setToggle];
}
