let tg = window.Telegram.WebApp;
tg.expand();

// Жестко включаем режим Телеграма
document.body.classList.add('telegram-app');

// Включаем нижнюю кнопку
tg.MainButton.setText("ОФОРМИТЬ ЗАКАЗ");
tg.MainButton.color = "#159447";
tg.MainButton.textColor = "#ffffff";
tg.MainButton.show();
