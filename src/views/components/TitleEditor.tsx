import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';

export interface TitleEditorProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onOK: (newTitle: string) => void;
  onCancel?: () => void;
  behaviorOnBlur?: 'onOK' | 'onCancel' | 'None'; // default None
  isResetOnOut?: boolean;
}

export const TitleEditor: React.FC<TitleEditorProps> = props => {
  const { value, onOK, onCancel, behaviorOnBlur, isResetOnOut, ...inputProps } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState(value);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setInputText(e.target.value),
    [setInputText],
  );

  const handleSubmit = useCallback(() => {
    onOK(inputRef.current ? inputRef.current.value.trim() : value);
    if (isResetOnOut) setInputText(value);
  }, [onOK, value, isResetOnOut]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
      if (isResetOnOut) setInputText(value);
    }
  }, [value, onCancel, isResetOnOut]);

  const handleBlur = useCallback(() => {
    if (behaviorOnBlur === 'onOK') handleSubmit();
    if (behaviorOnBlur === 'onCancel') handleCancel();
  }, [behaviorOnBlur, handleSubmit, handleCancel]);

  const handleKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
    e => (e.key === 'Enter' ? handleSubmit() : e.key === 'Escape' && handleCancel()),
    [handleSubmit, handleCancel],
  );

  return (
    <input
      ref={inputRef}
      value={inputText}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      type="text"
      autoComplete="off"
      {...inputProps}
    />
  );
};
export default TitleEditor;
