import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { ToggleContainer } from './styles';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'provider'> {
  isChecked?: boolean;
  onToggleChange: () => void;
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
}

const Toggle: React.FC<InputProps> = ({
  isChecked = false,
  onToggleChange,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField, provider } = useField(
    'provider',
  );

  useEffect(() => {
    registerField({
      name: provider ? 'provider' : fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, provider]);

  return (
    <ToggleContainer>
      <input
        type="checkbox"
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        checked={!isChecked}
        onChange={onToggleChange}
      />
    </ToggleContainer>
  );
};

export default Toggle;
