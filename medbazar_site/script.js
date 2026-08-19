// Инициализация Telegram
let tg = window.Telegram.WebApp;
tg.expand();
document.body.classList.add('telegram-app');

// Настраиваем главную зеленую кнопку Телеграма
tg.MainButton.setText("ОФОРМИТЬ ЗАКАЗ");
tg.MainButton.color = "#159447";
tg.MainButton.textColor = "#ffffff";
tg.MainButton.show();

let totalSum = 0;

// Ждем полной загрузки экрана, чтобы скрипт точно увидел все кнопки
window.addEventListener('load', () => {
    
    // Ищем все кнопки корзины на сайте
    let buttons = document.querySelectorAll('button, .add-to-cart');
    
    buttons.forEach(btn => {
        // Проверяем, что это нужная кнопка
        if (btn.innerText.trim().toLowerCase().includes('в корзину') || btn.classList.contains('add-to-cart')) {
            
            btn.addEventListener('click', function(e) {
                e.preventDefault(); // Защита от лишних срабатываний
                
                // Надежный поиск цены товара (чтобы скрипт никогда не ломался)
                let price = 85000; // Стандартная цена, если скрипт не найдет цифры
                try {
                    let card = this.closest('.product-card') || this.parentElement.parentElement;
                    let priceEl = card.querySelector('.new-price');
                    if (priceEl) {
                        price = parseInt(priceEl.innerText.replace(/\D/g, '')) || 85000;
                    }
                } catch(err) {}

                // 1. Прячем кнопку "В корзину"
                this.style.display = 'none';
                
                // 2. Создаем счетчик с готовым крутым дизайном
                let counter = document.createElement('div');
                counter.style.display = 'flex';
                counter.style.justifyContent = 'space-between';
                counter.style.alignItems = 'center';
                counter.style.background = '#f1f3f5';
                counter.style.borderRadius = '8px';
                counter.style.padding = '4px';
                counter.style.height = '38px';
                counter.style.width = '100%';
                
                counter.innerHTML = `
                    <button class="qty-min" style="background:#fff; border:none; width:32px; height:32px; border-radius:6px; font-weight:bold; color:#159447; font-size:18px; cursor:pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">-</button>
                    <span class="qty-val" style="font-weight:bold; font-size:15px; color:#222;">1</span>
                    <button class="qty-plus" style="background:#fff; border:none; width:32px; height:32px; border-radius:6px; font-weight:bold; color:#159447; font-size:18px; cursor:pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">+</button>
                `;
                
                // Вставляем счетчик на место старой кнопки
                this.parentNode.insertBefore(counter, this.nextSibling);
                
                let valSpan = counter.querySelector('.qty-val');
                let currentQty = 1;
                
                // Добавляем сумму и обновляем текст
                totalSum += price;
                updateMainButton();
                
                // 3. Логика кнопки ПЛЮС
                counter.querySelector('.qty-plus').addEventListener('click', (event) => {
                    event.preventDefault();
                    currentQty++;
                    valSpan.innerText = currentQty;
                    totalSum += price;
                    updateMainButton();
                });
                
                // 4. Логика кнопки МИНУС
                counter.querySelector('.qty-min').addEventListener('click', (event) => {
                    event.preventDefault();
                    currentQty--;
                    totalSum -= price;
                    if (totalSum < 0) totalSum = 0; // Сумма не может быть меньше нуля
                    
                    if (currentQty <= 0) {
                        counter.remove(); // Удаляем счетчик
                        btn.style.display = 'block'; // Возвращаем кнопку "В корзину"
                    } else {
                        valSpan.innerText = currentQty;
                    }
                    updateMainButton();
                });
            });
        }
    });
});

// Функция, которая меняет цифры на зеленой кнопке Телеграма
function updateMainButton() {
    if (totalSum > 0) {
        tg.MainButton.setText("ОФОРМИТЬ НА " + totalSum.toLocaleString('ru-RU') + " СУМ");
    } else {
        tg.MainButton.setText("ОФОРМИТЬ ЗАКАЗ");
    }
}
