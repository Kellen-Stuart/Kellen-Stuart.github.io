import React from 'react';
import { Button } from 'react-bootstrap';

function ContactButton() {
  const handleClick = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="text-center mt-4">
      <Button 
        variant="primary" 
        size="lg" 
        onClick={handleClick}
        style={{ fontWeight: 'bold', borderRadius: '20px', padding: '10px 20px' }}
      >
        Contact Kellen
      </Button>
    </div>
  );
}

export default ContactButton;
