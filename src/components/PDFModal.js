import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function PDFModal() {
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    setShowModal(true);
  }, []);

  const handlePrint = () => {
    window.location.href = '/print-resume';
    setShowModal(false);
  }

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} className='print-hide'>
        <Modal.Header closeButton>
          <Modal.Title>Need a PDF?</Modal.Title>
        </Modal.Header>
        <Modal.Body>"No" for long-form resume. "Yes" for short-form PDF resume.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PDFModal;