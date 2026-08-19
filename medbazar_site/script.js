let tg = window.Telegram.WebApp;
tg.expand();
document.body.classList.add('telegram-app');

// Настраиваем стартовую кнопку
tg.MainButton.setText("ОФОРМИТЬ ЗАКАЗ");
tg.MainButton.color = "#159447";
tg.MainButton.textColor = "#ffffff";
tg.MainButton.show();

let totalSum = 0; // Общая сумма корзины

// Умный скрипт: превращает кнопки в плюс/минус
document.querySelectorAll('.add-to-cart').forEach(btn => {
    // Находим цену товара в карточке
    let priceText = btn.closest('.product-card').querySelector('.new-price').innerText;
    let price = parseInt(priceText.replace(/\D/g, '')); // Достаем только цифры

    btn.addEventListener('click', function() {
        this.style.display = 'none'; // Прячем кнопку "В корзину"
        
        // Создаем блок счетчика [- 1 +]
        let counter = document.createElement('div');
        counter.className = 'quantity-control';
        counter.innerHTML = `
            <button class="qty-btn minus">-</button>
            <span class="qty">1</span>
            <button class="qty-btn plus">+</button>
        `;
        this.parentNode.appendChild(counter);
        
        let qtySpan = counter.querySelector('.qty');
        let currentQty = 1;
        
        // Добавляем стоимость в корзину
        updateTotal(price);
        
        // Кнопка ПЛЮС
        counter.querySelector('.plus').addEventListener('click', () => {
            currentQty++;
            qtySpan.innerText = currentQty;
            updateTotal(price);
        });
        
        // Кнопка МИНУС
        counter.querySelector('.minus').addEventListener('click', () => {
            currentQty--;
            if(currentQty <= 0) {
                counter.remove(); // Удаляем счетчик
                this.style.display = 'block'; // Возвращаем "В корзину"
                updateTotal(-price); // Вычитаем цену
            } else {
                qtySpan.innerText = currentQty;
                updateTotal(-price);
            }
        });
    });
});

// Функция обновления текста на кнопке Телеграма
function updateTotal(amount) {
    totalSum += amount;
    if(totalSum > 0) {
        tg.MainButton.setText(`ОФОРМИТЬ НА ${totalSum.toLocaleString('ru-RU')} СУМ`);
    } else {
        tg.MainButton.setText("ОФОРМИТЬ ЗАКАЗ");
    }
}
