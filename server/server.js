// Подключаем нужные зависимости
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk');
require('dotenv').config({ path: 'server/node/API-ключи.env' }); // Указываем путь к файлу .env в папке API-ключи
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Разрешаем кросс-доменные запросы

// Статические файлы (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Настройка клиента PayPal с использованием переменных окружения из .env
paypal.configure({
    mode: 'live',  // Используйте 'sandbox' в тестовом режиме, 'live' в продакшн
    client_id: process.env.PAYPAL_CLIENT_ID,  // Переменная из .env
    client_secret: process.env.PAYPAL_CLIENT_SECRET  // Переменная из .env
});

// Маршрут для создания заказа
app.post('/api/orders', (req, res) => {
    const cart = req.body.cart;

    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: 'http://localhost:8080/api/orders/execute',
            cancel_url: 'http://localhost:8080/api/orders/cancel'
        },
        transactions: [{
            item_list: {
                items: cart.map(item => ({
                    name: item.name,
                    price: parseFloat(item.price).toFixed(2),  // Убедитесь, что цена - строка
                    currency: 'USD',
                    quantity: item.quantity
                }))
            },
            amount: {
                currency: 'USD',
                total: cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2)  // Убедитесь, что сумма - строка
            },
            description: 'Описание заказа'
        }]
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: error.response || error.message });
        } else {
            res.json({ id: payment.id });  // Возвращаем ID созданного заказа
        }
    });
});

// Маршрут для выполнения заказа (после успешной оплаты)
app.post('/api/orders/execute', (req, res) => {
    const payerId = req.body.payerID;  // Используем правильные имена переменных
    const paymentId = req.body.paymentId;  // Обратите внимание на правильность данных

    const execute_payment_json = {
        payer_id: payerId
    };

    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: error.response || error.message });
        } else {
            if (payment.state === 'approved') {
                res.send({ status: 'success' });
            } else {
                res.status(500).json({ error: 'Payment failed' });
            }
        }
    });
});

// Маршрут для отмены заказа
app.post('/api/orders/cancel', (req, res) => {
    res.status(200).send({ message: "Оплата отменена" });
});

// Главная страница
app.get('/', (req, res) => {
    res.send('<h1>Добро пожаловать на страницу оплаты PayPal!</h1>');
});

// Запуск сервера
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
