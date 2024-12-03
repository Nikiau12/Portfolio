<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

$raw_post_data = file_get_contents('php://input');
$myPost = [];
foreach (explode('&', $raw_post_data) as $keyval) {
    $keyval = explode('=', $keyval);
    if (count($keyval) == 2) {
        $myPost[$keyval[0]] = urldecode($keyval[1]);
    }
}

$req = 'cmd=_notify-validate';
foreach ($myPost as $key => $value) {
    $req .= "&$key=" . urlencode($value);
}

$ch = curl_init('https://www.paypal.com/cgi-bin/webscr');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_CAINFO, __DIR__ . '/cert/cacert.pem');
$response = curl_exec($ch);
if (curl_errno($ch) || !$response) {
    error_log('Ошибка cURL: ' . curl_error($ch));
    curl_close($ch);
    exit();
}
curl_close($ch);

if (strcmp($response, "VERIFIED") === 0) {
    $txn_id = $_POST['txn_id'];
    $payment_status = $_POST['payment_status'];
    $payer_email = $_POST['payer_email'];
    $amount = $_POST['mc_gross'];
    $currency = $_POST['mc_currency'];

    if ($payment_status === "Completed") {
        $mail = new PHPMailer(true);
        try {
            $mail->setFrom('no-reply@kotrelevnikita.com', 'Nikita Kotrelev');
            $mail->addAddress('Fomachlenosos@gmail.com');
            $mail->Subject = 'Успешная оплата через PayPal';
            $mail->Body = "
                <html>
                <body>
                    <h2>Детали успешной оплаты</h2>
                    <p><strong>ID транзакции:</strong> $txn_id</p>
                    <p><strong>Сумма:</strong> $amount $currency</p>
                    <p><strong>Email плательщика:</strong> $payer_email</p>
                </body>
                </html>";
            $mail->isHTML(true);
            $mail->send();
        } catch (Exception $e) {
            error_log('Ошибка отправки письма: ' . $mail->ErrorInfo);
        }
    }
} else {
    error_log('IPN Verification Failed: ' . $response);
}
