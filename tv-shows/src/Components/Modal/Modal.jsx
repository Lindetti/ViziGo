import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ closeModal, isModalOpen }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('modal')) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [closeModal, isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="closeDiv">
              <div className="close-icon" onClick={closeModal}>
                <span className="close-x">&times;</span>
              </div>
            </div>
            <div className="mobile-view">
            <div className="mobile">
            <img src="/mobileDB.png" alt="mobile-image" />
            </div>
            </div>
            <div className="modal-information">
                <h1 className="site-name2">FlixPrime</h1>
            <p className="modal-text">Unlimited entertainment, anytime, anywhere. Stream on any device, at your convenience. Join us today and start enjoying your favorite content with a click. </p>
           <p className="copy">Copy 2023 @ All rights reserved</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;