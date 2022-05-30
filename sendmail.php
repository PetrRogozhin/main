<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\PHPMailer;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru','phpmailer/language/');
	$mail->isHTML(true);

	$mail->setFrom('rplirik@gmail.com', 'Petr');
	$mail->addAddress('19200834@turan-edu.kz');
	$mail->Subject = 'Новая завяка';

	$body = '<h1>Пришла Новая Заявка</h1>';
	if(trim(!empty($_POST['name']))){0
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){0
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['message']))){0
		$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	}

	$mail->Body = $body;

	if (!$mail->send()) {
		$message = 'Error';
	}
	else {
		$message = 'Letter was sent';
	}
	$response = ['message' => $message];

	header('Content-Type: application/json');
	echo json_encode($response);
?>