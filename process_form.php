<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['first-name'] ?? '');
    $address = htmlspecialchars($_POST['address'] ?? '');
    $phone = htmlspecialchars($_POST['phone'] ?? '');

    if (!$name || !$address || !$phone) {
        die("Ошибка: Все поля обязательны для заполнения.");
    }

    $_SESSION['shipping_info'] = [
        'name' => $name,
        'address' => $address,
        'phone' => $phone
    ];

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/autoload.php';

    $mail = new PHPMailer(true);
    try {
        $mail->setFrom('no-reply@example.com', 'Nikita Kotrelev');
        $mail->addAddress('Fomachlenosos@gmail.com');
        $mail->Subject = 'Новый заказ на сайте';
        $mail->Body = "
            <html>
            <body>
                <h2>Информация о заказе</h2>
                <p><strong>Имя:</strong> $name</p>
                <p><strong>Адрес:</strong> $address</p>
                <p><strong>Телефон:</strong> $phone</p>
            </body>
            </html>";
        $mail->isHTML(true);
        $mail->send();

        header("Location: paypal_payment_page.php");
        exit();
    } catch (Exception $e) {
        die("Ошибка отправки письма: {$mail->ErrorInfo}");
    }
}
