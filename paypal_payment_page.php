<?php
session_start();
if (!isset($_SESSION['shipping_info'])) {
    header("Location: process_form.php");
    exit();
}

$shipping_info = $_SESSION['shipping_info'];
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Оплата через PayPal</title>
    <script src="https://www.paypal.com/sdk/js?client-id=ARt042pqq3nQh8ENi2eqXS013tzKqrkRRsPsn4lJIPrAGcdoXh0GuxS1Zmyj0V7Kdf1AdY_uHfPNUK5K&components=buttons"></script>
</head>
<body>
    <h1>Подтверждение данных</h1>
    <p><strong>Имя:</strong> <?php echo htmlspecialchars($shipping_info['name']); ?></p>
    <p><strong>Адрес:</strong> <?php echo htmlspecialchars($shipping_info['address']); ?></p>
    <p><strong>Телефон:</strong> <?php echo htmlspecialchars($shipping_info['phone']); ?></p>

    <h2>Перейдите к оплате</h2>
    <div id="paypal-button-container"></div>

    <script>
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: { value: '100.00' }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Спасибо за оплату, ' + details.payer.name.given_name);
                    window.location.href = 'thank_you.php';
                });
            },
            onError: function(err) {
                alert("Произошла ошибка: " + err);
            }
        }).render('#paypal-button-container');
    </script>
</body>
</html>
