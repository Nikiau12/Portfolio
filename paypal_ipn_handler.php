<?php
// Подключение библиотеки PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

// Записываем данные запроса
$raw_post_data = file_get_contents('php://input');
$raw_post_array = explode('&', $raw_post_data);
$myPost = [];
foreach ($raw_post_array as $keyval) {
    $keyval = explode('=', $keyval);
    if (count($keyval) == 2) {
        $myPost[$keyval[0]] = urldecode($keyval[1]);
    }
}

// Добавляем 'cmd=_notify-validate' для проверки
$req = 'cmd=_notify-validate';
foreach ($myPost as $key => $value) {
    $value = urlencode($value);
    $req .= "&$key=$value";
}

// Настройка запроса к PayPal
$ch = curl_init('https://www.paypal.com/cgi-bin/webscr');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
curl_setopt($ch, CURLOPT_CAINFO, __DIR__ . '/cert/cacert.pem');
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Connection: Close']);

$response = curl_exec($ch);
curl_close($ch);

// Проверка ответа от PayPal
if (strcmp($response, "VERIFIED") == 0) {
    // Получаем данные о транзакции
    $txn_id = $_POST['txn_id'];
    $payment_status = $_POST['payment_status'];
    $payer_email = $_POST['payer_email'];
    $amount = $_POST['mc_gross'];
    $currency = $_POST['mc_currency'];

    // Проверяем статус оплаты
    if ($payment_status == "Completed") {
        // Отправка уведомления с помощью PHPMailer
        $mail = new PHPMailer(true);
        try {
            // Настройка отправки письма
            $mail->setFrom('no-reply@kotrelevnikita.com', 'Nikita Kotrelev');
            $mail->addAddress('Fomachlenosos@gmail.com');  // Ваш email
            $mail->Subject = 'Успешная оплата через PayPal';
            $mail->Body    = "
                <html>
                <head><title>Успешная оплата</title></head>
                <body>
                    <h2>Детали успешной оплаты</h2>
                    <p><strong>ID транзакции:</strong> $txn_id</p>
                    <p><strong>Сумма:</strong> $amount $currency</p>
                    <p><strong>Email плательщика:</strong> $payer_email</p>
                </body>
                </html>
            ";
            $mail->isHTML(true);  // Отправка письма в формате HTML
            $mail->send();
        } catch (Exception $e) {
            echo "Ошибка при отправке сообщения: {$mail->ErrorInfo}";
        }
    }
} else {
    // Если ответ PayPal НЕ VERIFIED, логируем ошибку
    error_log("IPN Verification Failed");
}
?>
