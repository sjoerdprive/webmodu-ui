import { DragEventHandler, useId, useRef, useState } from "react";
import classes from "./dropzone.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FileArray } from "express-fileupload";

type DropzoneProps = {
  className?: string;
  children?: React.ReactNode;
  hideDragOverlay?: boolean;
  onDrop?: (files: File[] | FileList) => Promise<void>;
};

export const DropzoneComponent = ({
  className,
  children,
  hideDragOverlay,
  onDrop,
}: DropzoneProps) => {
  const [isDragging, setDragging] = useState(0);
  const id = useId();
  const inputField = useRef<HTMLInputElement>(null);
  const fieldId = useId();

  const activateDragging: DragEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
    event.dataTransfer.setData("text/plain", event.currentTarget.id);
    setDragging((prev) => prev + 1);
  };

  const deactivateDragging: DragEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging((prev) => prev - 1);
  };

  const handleDrop: DragEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedItems = event.dataTransfer.files;

    if (!droppedItems) return;

    const fileArray = [...droppedItems];

    setDragging(0);

    onDrop?.(fileArray);
  };

  const handleDragOver: DragEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
    event.dataTransfer.setData("text/plain", event.currentTarget.id);
  };

  return (
    <div
      className={classNames(classes.dropzone, className)}
      onDrop={handleDrop}
      onDragEnter={activateDragging}
      onDragLeave={deactivateDragging}
      onDragOver={handleDragOver}
      id={fieldId}
    >
      <input
        className={classNames("focus-only", classes.input)}
        type="file"
        multiple
        id={id}
        ref={inputField}
      />

      <label
        htmlFor={id}
        className={classNames(
          classes.dropHover,
          (isDragging < 1 || hideDragOverlay) && classes.hidden
        )}
      >
        <div className={classes.uploadIconWrapper}>
          <FontAwesomeIcon size="4x" icon={faUpload} />
        </div>
      </label>

      {children}
    </div>
  );
};
