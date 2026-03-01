<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	http_response_code(403);
	exit;
}

$to = "seccon@aol.com";
$subject = "SECCON - WEB ENQUIRY";

$first = htmlspecialchars($_POST['first_name'] ?? '');
$last = htmlspecialchars($_POST['last_name'] ?? '');
$phone = htmlspecialchars($_POST['phone'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

$body = "New Web Enquiry\n\n";
$body .= "Name: $first $last\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n\n";
$body .= "Message:\n$message\n";

$headers = "From: Website <seccon@aol.com>\r\n";
$headers .= "Reply-To: $email\r\n";

mail($to, $subject, $body, $headers);