import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ closeModal, isModalOpen }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('modal')) {
        closeModal();
      }
    };

    const isMobileView = () => {
      return window.innerWidth <= 524;
    };

    if (isModalOpen  && isMobileView()) {
      document.body.classList.add('modal-open');
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.body.classList.remove('modal-open');
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
            <p className="copy2">Copy 2023 @ All rights reserved</p>
            <div className="mobile-view">
            <div className="mobile">
            <img src="/mobile-view1.png" alt="mobile-image" />
            </div>
            </div>
            <div className="modal-information">
                <h1 className="site-name2">ViziGo</h1>
            <p className="modal-text">Unlimited entertainment, anytime, anywhere. Stream on any device, at your convenience. Join us today and start enjoying your favorite content with a click. </p>
           <p className="copy1">Copy 2023 @ All rights reserved</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;