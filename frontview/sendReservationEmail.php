<?php
    // Allow CORS if needed (for cross-origin requests)
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    // Function to handle the request
    function sendEmail() {
        // Ensure the request is POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405); // Method Not Allowed
            echo json_encode(["error" => "Only POST requests are allowed."]);
            return;
        }

        // Get the raw POST data
        $data = json_decode(file_get_contents('php://input'), true);

        // Validate the required fields
        if (
            empty($data['surname']) || empty($data['firstName']) || 
            empty($data['email']) || empty($data['phoneNumber']) || 
            empty($data['checkIn']) || empty($data['checkOut']) || 
            empty($data['guestPerRoom'])
        ) {
            http_response_code(400); // Bad Request
            echo json_encode(["error" => "all fields are required."]);
            return;
        }

        // Extract the data
        $email = $data['email'];
        $subject = '$data['subject']';
        $message = '$data['message']';

        // You can add additional headers if necessary
        
// 
        $headers = "From: montevarhotels@gmail.com\r\n";
        $headers .= "Reply-To: montevarhotels@gmail.com\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // Send the email
        $mailSent = mail($email, $subject, $message, $headers);

        // Check if the email was sent successfully
        if ($mailSent) {
            http_response_code(200); // OK
            echo json_encode(["success" => "Email sent successfully."]);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(["error" => "Failed to send email."]);
        }
    }

    // Call the function to handle the request
    sendEmail();
?>
