<?php

declare(strict_types=1); // using this php enables a strict mode in which data types are checked

spl_autoload_register(function ($class) {
    require __DIR__ . "/src/$class.php";
}); // autoloader for requiring files that have the same name as the class inside them

set_exception_handler("ErrorHandler::handleException"); 

header("Content-type: application/json; charset=UTF-8"); 

$request_uri = $_SERVER["REQUEST_URI"];

$urlParts = explode("/", $request_uri);


var_dump($urlParts[3]);

$controller = new DataController();

if ($urlParts[3] != 'datacol') {
    $controller->sendResponse(["unsupported URL!", 404]);
    http_response_code(404);
    exit;
}

$id = $urlParts[4] ?? null; 

$db_connetion = new DatabaseConnection('db');

$db_connetion = $db_connetion->getConnectionObj();

if ($db_connetion) {
    $controller->sendResponse(["Successfully connected to DB"]);
} else {
    $controller->sendResponse(["There was an error connecting to DB", 500]);
    exit;
}



?>