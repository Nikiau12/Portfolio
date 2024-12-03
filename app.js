window.onload = () => {
    paypal.Buttons({
        style: {
            shape: "rect",
            layout: "vertical",
            color: "black",
            label: "paypal",
        },

        // Асинхронное создание заказа
        async createOrder(data, actions) {
            try {
                const cart = [
                    { id: "product-1", name: "Product 1", price: 100, quantity: 2 },
                    { id: "product-2", name: "Product 2", price: 200, quantity: 1 }
                ];

                // Отправляем данные на сервер для создания заказа
                const response = await fetch("/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cart }),
                });

                const orderData = await response.json();
                if (orderData.id) {
                    return orderData.id;  // Возвращаем ID созданного заказа
                }

                throw new Error("Ошибка при создании заказа");
            } catch (error) {
                console.error("Ошибка при создании заказа:", error);
                window.location.assign("/your-error-page-here");
            }
        },

        // Подтверждение и завершение оплаты
        async onApprove(data, actions) {
            try {
                const response = await fetch(`/api/orders/execute`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        paymentId: data.orderID, // Исправлено: используем 'orderID' как paymentId
                        payerID: data.payerID
                    })
                });

                const orderData = await response.json();
                if (orderData.status === "success") {
                    window.location.assign("/thank-you-page"); // Страница успеха
                } else {
                    window.location.assign("/your-error-page-here"); // Страница ошибки
                }
            } catch (error) {
                console.error("Ошибка при захвате платежа:", error);
                window.location.assign("/your-error-page-here");
            }
        },

        // Отмена операции
        onCancel(data) {
            window.location.assign("/cart-page"); // Страница корзины
        },

        // Обработка ошибок
        onError(err) {
            console.error("Ошибка PayPal:", err);
            window.location.assign("/your-error-page-here"); // Страница ошибки
        }
    }).render("#paypal-button-container");
};
