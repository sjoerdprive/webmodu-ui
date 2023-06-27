import { faTimes } from "@fortawesome/free-solid-svg-icons";
import FocusTrap from "focus-trap-react";
import { ReactPortal, useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "..";
import classes from "./modal.module.scss";

type DialogProps = {
  closeDialog: () => void;
};

type ModalProps = {
  className?: string;
  children?: React.ReactNode;
  buttonText?: string;
  prompt?: Record<string, () => void>;
  buttonRenderer?: (buttonProps: any) => React.ReactNode;
  dialogRenderer?: (dialogProps: DialogProps) => React.ReactNode;
};

export const ModalComponent = ({
  className,
  children,
  buttonText,
  prompt,
  buttonRenderer,
  dialogRenderer,
}: ModalProps) => {
  const [isOpen, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const buttonProps = useMemo(
    () => ({
      onClick: () => (isOpen ? closeDialog() : openDialog()),
    }),
    [isOpen, closeDialog, openDialog]
  );

  const dialogProps: DialogProps = useMemo(
    () => ({
      closeDialog: closeDialog,
    }),
    []
  );

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      console.log("press");
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    switch (isOpen) {
      case false:
        document.removeEventListener("keyup", keyDownHandler);
        break;
      case true:
        document.addEventListener("keyup", keyDownHandler);
        break;
      default:
        break;
    }

    return () => {
      document.removeEventListener("keyup", keyDownHandler);
    };
  }, [isOpen]);

  const Prompts = useMemo(() => {
    if (!prompt) return undefined;

    return (
      <footer className={classes.footer}>
        {Object.keys(prompt).map((key) => {
          return (
            <button key={key} onClick={prompt[key]}>
              {key}
            </button>
          );
        })}
      </footer>
    );
  }, [prompt]);

  const ModalWindow = useCallback(() => {
    // if (!isOpen) return <></>;

    return createPortal(
      <FocusTrap>
        {dialogRenderer ? (
          <div className={classes.modal}>{dialogRenderer(dialogProps)}</div>
        ) : (
          <div className={classes.modal}>
            <div className={classes.dialogElement} {...dialogProps}>
              <header className={classes.header}>
                <button className={classes.closeButton} onClick={closeDialog}>
                  <Icon faIcon={faTimes} label="Close modal" hideLabel />
                </button>
              </header>
              <div className={classes.body}>{children}</div>
              {Prompts}
            </div>
          </div>
        )}
      </FocusTrap>,
      document.body
    );
  }, [isOpen, classes, dialogRenderer]);

  return (
    <>
      {!!buttonRenderer ? (
        buttonRenderer(buttonProps)
      ) : (
        <button {...buttonProps}>{buttonText}</button>
      )}
      {isOpen && <ModalWindow />}
    </>
  );
};
