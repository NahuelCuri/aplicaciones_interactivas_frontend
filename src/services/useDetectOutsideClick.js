import { useState, useEffect, useRef } from 'react';

export const useDetectOutsideClick = (initialState) => {
  const triggerRef = useRef(null);
  const nodeRef = useRef(null);

  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target) &&
        nodeRef.current &&
        !nodeRef.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  return { triggerRef, nodeRef, isActive, setIsActive };
};
