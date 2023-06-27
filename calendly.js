function initCalendly()
{
    Calendly.initInlineWidget({
        url: 'https://calendly.com/kellenstuart?hide_gdpr_banner=1',
        parentElement: document.getElementById('kellen-calendly'),
        prefill: {},
        utm: {}
    });
}

// This fixes the bug where calendly would initialize multiple times.
const iframe = document.querySelector('iframe');
if(iframe !== null) {
    initCalendly();
}