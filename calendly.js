function initCalendly()
{
    Calendly.initInlineWidget({
        url: 'https://calendly.com/kellenstuart?hide_gdpr_banner=1',
        parentElement: document.getElementById('kellen-calendly'),
        prefill: {},
        utm: {}
    });
}

initCalendly();