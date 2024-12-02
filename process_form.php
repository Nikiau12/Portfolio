<?php
session_start();

// Проверяем, что данные пришли из формы
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = htmlspecialchars($_POST['first-name']);
    $address = htmlspecialchars($_POST['address']);
    $phone = htmlspecialchars($_POST['phone']);

    // Сохраняем данные в сессии
    $_SESSION['shipping_info'] = [
        'name' => $name,
        'address' => $address,
        'phone' => $phone
    ];

    // Подключаем PHPMailer
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/autoload.php';

    $mail = new PHPMailer(true);

    try {
        // Настройки отправителя
        $mail->setFrom('no-reply@example.com', 'Nikita Kotrelev');
        $mail->addAddress('Fomachlenosos@gmail.com');  // Адрес получателя

        // Тема и тело письма
        $mail->Subject = 'Новый заказ на сайте';
        $mail->Body    = "
            <html>
            <head><title>Новый заказ</title></head>
            <body>
                <h2>Информация о заказе</h2>
                <p><strong>Имя:</strong> $name</p>
                <p><strong>Адрес:</strong> $address</p>
                <p><strong>Телефон:</strong> $phone</p>
            </body>
            </html>
        ";
        $mail->isHTML(true);

        // Отправка письма
        $mail->send();

        // Перенаправление на страницу оплаты
        header("Location: paypal_payment_page.php");
        exit();
    } catch (Exception $e) {
        echo "Ошибка при отправке сообщения. Попробуйте снова.";
    }
}
?>


<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Информация о доставке</title>
</head>
<body>
    <h1>Введите информацию о доставке</h1>

    <form id="shipping-form" method="POST" action="process_form.php">
    <label for="first-name">Имя:</label>
    <input type="text" id="first-name" name="first-name" required>

    <label for="last-name">Фамилия:</label>
    <input type="text" id="last-name" name="last-name" required>

    <label for="address">Адрес:</label>
    <input type="text" id="address" name="address" required>

    <label for="city">Город:</label>
    <input type="text" id="city" name="city" required>

    <label for="zip">ZIP код:</label>
    <input type="text" id="zip" name="zip" required>

    <label for="email">Электронная почта:</label>
    <input type="email" id="email" name="email" required>

    <label for="phone">Телефон:</label>
    <input type="text" id="phone" name="phone" required>

    <button type="submit" style="display:none;">Подтвердить</button>
</form>

</body>
</html>
