import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ContactButton({ showDownloadPdf = false, downloadLabel = 'Download PDF' }) {
  const buttonStyle = { fontWeight: 'bold', borderRadius: '20px', padding: '10px 20px' };
  const resumePdfPath = '/Kellen-Stuart-Resume.pdf';

  const handleDownloadPdf = async () => {
    try {
      const response = await fetch(resumePdfPath, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      const blob = await response.blob();
      const signature = await blob.slice(0, 5).text();
      const looksLikePdf =
        contentType.includes('application/pdf') ||
        blob.type === 'application/pdf' ||
        signature.startsWith('%PDF-');

      if (!looksLikePdf) {
        throw new Error('Download payload is not a valid PDF.');
      }

      const downloadUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.download = 'Kellen-Stuart-Resume.pdf';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch {
      window.location.assign('/print-resume');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mt-4 print-hide">
      <Link to="/contact">
        <Button 
          variant="primary" 
          size="lg" 
          style={buttonStyle}
        >
          Contact Kellen
        </Button>
      </Link>
      {showDownloadPdf && (
        <Button
          onClick={handleDownloadPdf}
          variant="primary"
          size="lg"
          style={buttonStyle}
        >
          {downloadLabel}
        </Button>
      )}
    </div>
  );
}

export default ContactButton;
