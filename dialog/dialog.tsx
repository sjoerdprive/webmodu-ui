import { useCallback, useMemo, useRef, useState } from "react";
import classes from "./dialog.module.scss";
import classNames from "classnames";
import { Icon } from "..";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type DialogProps = {
  className?: string;
  children?: React.ReactNode;
  buttonText?: string;
  prompt?: Record<string, any>;
  modal?: boolean;
  buttonRenderer?: (buttonProps: any) => React.ReactNode;
  dialogRenderer?: (dialogProps: any) => React.ReactNode;
};

export const DialogComponent = ({
  className,
  children,
  buttonText,
  modal,
  prompt,
  buttonRenderer,
  dialogRenderer,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isOpen, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    modal ? dialogRef.current?.showModal() : dialogRef.current?.show();
    setOpen(true);
  }, [modal, dialogRef, setOpen]);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    setOpen(false);
  }, [modal, dialogRef, setOpen]);

  const buttonProps = useMemo(
    () => ({
      onClick: () => (isOpen ? closeDialog() : openDialog()),
    }),
    [isOpen, closeDialog, openDialog]
  );

  const dialogProps = useMemo(
    () => ({
      ref: dialogRef,
      className: classes.dialogElement,
    }),
    [dialogRef]
  );

  const Prompts = useMemo(() => {
    if (!prompt) return undefined;

    return (
      <footer>
        {Object.values(prompt).map(([key, callback]) => {
          return <button onClick={callback}>{key}</button>;
        })}
      </footer>
    );
  }, []);

  return (
    <div className={classNames(classes.modal, className)}>
      {!!buttonRenderer ? (
        buttonRenderer(buttonProps)
      ) : (
        <button {...buttonProps}>{buttonText}</button>
      )}
      {dialogRenderer ? (
        dialogRenderer(dialogProps)
      ) : (
        <dialog {...dialogProps}>
          <header className={classes.header}>
            <button className={classes.closeButton} onClick={closeDialog}>
              <Icon faIcon={faTimes} label="Close modal" hideLabel />
            </button>
          </header>
          <div className={classes.body}>{children}</div>
          {Prompts}
        </dialog>
      )}
    </div>
  );
};
