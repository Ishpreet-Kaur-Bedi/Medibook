import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";
// isOpen?: boolean: This property represents whether the modal is open or closed. It is optional (?) and of type boolean. By default, it is assumed that the modal is closed if this prop is not provided.

// onClose: () => void: This property represents a function that will be called when the modal is closed. It is a required prop and defined as a function that takes no arguments and does not return anything (void). This allows you to provide a callback function that will be executed when the user closes the modal.

// onSubmit: () => void: This property represents a function that will be called when the user submits or confirms an action within the modal. It is a required prop and defined as a function that takes no arguments and does not return anything (void). This allows you to provide a callback function that will be executed when the user performs the desired action within the modal.

// title?: string: This property represents the title of the modal. It is optional (?) and of type string. By default, it is assumed that the modal does not have a title if this prop is not provided.

// body?: React.ReactElement: This property represents the body content of the modal. It is optional (?) and of type React.ReactElement. This allows you to pass any valid React element/component as the body content of the modal.

// footer?: React.ReactElement: This property represents the footer content of the modal. It is optional (?) and of type React.ReactElement. This allows you to pass any valid React element/component as the footer content of the modal.

// actionLabel: string: This property represents the label or text of the primary action button within the modal. It is a required prop and of type string. This allows you to provide a label for the primary action button.

// disabled?: boolean: This property represents whether the primary action button should be disabled. It is optional (?) and of type boolean. By default, it is assumed that the button is enabled if this prop is not provided.

// secondaryAction?: () => void: This property represents a function that will be called when the user performs a secondary action within the modal. It is optional (?) and defined as a function that takes no arguments and does not return anything (void). This allows you to provide a callback function that will be executed when the user performs a secondary action.

// secondaryActionLabel?: string: This property represents the label or text of the secondary action button within the modal. It is optional (?) and of type string. This allows you to provide a label for the secondary action button.
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div
          className="
          relative 
          w-full
          md:w-4/6
          lg:w-2/5
          xl:w-2/5
          my-8
          pt-6
          mx-auto 
          lg:h-auto
          md:h-auto
          "
        >
          {/*content*/}
          <div
            className={`
            translate
            duration-300
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div
              className="
              
              translate
              lg:h-auto
              md:h-auto
              sm:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
            >
              {/*header*/}
              <div
                className="
                flex 
                items-center 
                p-1
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                <button
                  onClick={handleClose}
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    right-2
                    top-2
                  "
                >
                  <IoMdClose size={18} />
                </button>
                <hr />
                <div className="text-lg font-semibold my-5">{title}</div>
              </div>
              {/*body*/}
              <div className="relative p-1 px-6 flex-auto">{body}</div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-1 px-6">
                <div
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button 
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
                <hr />
              </div>
              <hr />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
