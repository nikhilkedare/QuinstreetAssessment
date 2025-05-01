function maskPhone(input) {
    input.addEventListener('input', function (e) {
        let x = this.value.replace(/\D/g, '').slice(0, 10);
        let formatted = '';
        if (x.length > 0) formatted = '(' + x.substring(0, 3);
        if (x.length >= 4) formatted += ') ' + x.substring(3, 6);
        if (x.length >= 7) formatted += '-' + x.substring(6, 10);
        this.value = formatted;
    });
}

maskPhone(document.getElementById('phone'));

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');

    let isValid = true;

    [name, phone, email].forEach(field => field.classList.remove('error'));

    if (name.value.trim().length < 2) {
        name.classList.add('error');
        isValid = false;
    }
    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phone.value)) {
        phone.classList.add('error');
        isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('error');
        isValid = false;
    }

    if (!isValid) return;

    submitBtn.disabled = true;
    fetch('https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        name: name.value,
        city: city.value,
        state: state.value,
        phone: phone.value,
        email: email.value
        })
    }).then(() => {
        submitBtn.textContent = 'Submitted';
    }).catch(() => {
        submitBtn.textContent = 'Submitted';
    });
});