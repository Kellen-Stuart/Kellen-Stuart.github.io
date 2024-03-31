import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ContactButton() {

  return (
    <div className="text-center mt-4">
      <Link to="/contact">
        <Button 
          variant="primary" 
          size="lg" 
          style={{ fontWeight: 'bold', borderRadius: '20px', padding: '10px 20px' }}
        >
          Contact Kellen
        </Button>
      </Link>
    </div>
  );
}

export default ContactButton;
