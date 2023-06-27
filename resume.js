const modal = document.getElementById('exampleModal');
const modalInstance = new bootstrap.Modal(modal);
modalInstance.show();

const pdfButton = document.getElementById('save-resume');

pdfButton.addEventListener('click', function () {
    modalInstance.hide();
    const calendly = document.getElementById('kellen-calendly');
    calendly.style.display = 'none';
    window.print();
})