function initCalendly()
{
    Calendly.initInlineWidget({
        url: 'https://calendly.com/kellenstuart',
        parentElement: document.getElementById('kellen-calendly'),
        prefill: {},
        utm: {}
    });
}

initCalendly();