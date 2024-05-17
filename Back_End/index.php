<?php
declare(strict_types=1); // using this php enables a strict mode in which data types are checked

// error_reporting(E_ALL);
// ini_set('display_errors', 1);
spl_autoload_register(function ($class) {

    $file = __DIR__ . "/src/$class.php";
    // echo "Autoloading class: $class from $file<br>";

    try {
        require $file;
    } catch (Throwable $e) {
        var_dump($e);
    }
});

set_exception_handler("ErrorHandler::handleException"); 

header("Content-type: application/json; charset=UTF-8"); 

header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Return empty 200 response for preflight requests
    http_response_code(200);
    exit;
}

$request_uri = $_SERVER["REQUEST_URI"];

$urlParts = explode("/", $request_uri);

$controller = new DataController();

// if ($urlParts[3] != 'datacol') { // datacol == data collection
//     $controller->sendResponse([$urlParts, 405]);
//     http_response_code(405);
//     exit;
// }

$id = $urlParts[4] ?? null; 

$db_connetion = new DatabaseConnection('db');

if (!$db_connetion) {
    $controller->sendResponse(["There was an error connecting to DB", 500]);
    exit;
} else {
    // $controller->sendResponse(["Successfully connected to DB"]);
}

$csvSetup = new TableSetup();

$gateway = new DataGateway($db_connetion, $csvSetup);

$controller->setupAndProcess($gateway, $_SERVER["REQUEST_METHOD"], $id);

?>