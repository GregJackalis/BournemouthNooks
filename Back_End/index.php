<?php
declare(strict_types=1); // using this php enables a strict mode in which data types are checked

error_reporting(E_ALL);
ini_set('display_errors', 1);
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

$request_uri = $_SERVER["REQUEST_URI"];

$urlParts = explode("/", $request_uri);

$controller = new DataController();

if ($urlParts[3] != 'datacol') { // datacol == data collection
    $controller->sendResponse(["unsupported URL!", 405]);
    http_response_code(405);
    exit;
}

$id = $urlParts[4] ?? null; 

$db_connetion = new DatabaseConnection('db');

if ($db_connetion) {
    $controller->sendResponse(["Successfully connected to DB"]);
} else {
    $controller->sendResponse(["There was an error connecting to DB", 500]);
    exit;
}

$csvSetup = new TableSetup();

$gateway = new DataGateway($db_connetion, $csvSetup);

$controller->setupAndProcess($gateway, $_SERVER["REQUEST_METHOD"], $id);

?>