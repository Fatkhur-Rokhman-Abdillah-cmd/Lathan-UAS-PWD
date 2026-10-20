document.addEventListener('DOMContentLoaded', function () {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const serviceCards = Array.from(document.querySelectorAll('.service-card'));
    const categoryFilter = document.getElementById('categoryFilter');
    const orderCount = document.getElementById('orderCount');
    const orderTotal = document.getElementById('orderTotal');
    const resetOrder = document.getElementById('resetOrder');

    if (serviceCards.length && categoryFilter && orderCount && orderTotal && resetOrder) {
        const quantityInputs = serviceCards.map(function (card) {
            return card.querySelector('.quantity-input');
        });
        const rupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        });

        function updateOrderSummary() {
            let itemCount = 0;
            let total = 0;

            serviceCards.forEach(function (card, index) {
                const quantityInput = quantityInputs[index];
                const quantity = Math.max(0, Number.parseInt(quantityInput.value, 10) || 0);
                const price = Number(card.dataset.harga);

                quantityInput.value = quantity;
                itemCount += quantity;
                total += quantity * price;
            });

            orderCount.textContent = String(itemCount);
            orderTotal.textContent = rupiah.format(total);
        }

        categoryFilter.addEventListener('change', function () {
            const selectedCategory = categoryFilter.value;

            serviceCards.forEach(function (card) {
                card.hidden = selectedCategory !== 'semua' && card.dataset.kategori !== selectedCategory;
            });
        });

        quantityInputs.forEach(function (quantityInput) {
            quantityInput.addEventListener('input', updateOrderSummary);
            quantityInput.addEventListener('change', updateOrderSummary);
        });

        resetOrder.addEventListener('click', function () {
            quantityInputs.forEach(function (quantityInput) {
                quantityInput.value = '0';
            });

            categoryFilter.value = 'semua';
            serviceCards.forEach(function (card) {
                card.hidden = false;
            });
            updateOrderSummary();
        });

        updateOrderSummary();
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name');
            const status = document.getElementById('formStatus');

            status.textContent = `Terima kasih, ${name.value.trim()}. Formulir berhasil divalidasi, tetapi pesan belum dikirim karena formulir ini belum terhubung ke layanan pengiriman.`;
            status.classList.remove('error');
        });
    }
});
