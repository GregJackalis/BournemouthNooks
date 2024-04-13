<?php

class DataController {
    private array $jsonResponse = [];

    public function __construct() {
        $this->jsonResponse = [
            "message" => "string",
            "response_code" => 200 // default
        ];
    }

    public function sendResponse(array $data): void {
        $this->jsonResponse["message"] = $data[0];
        $this->jsonResponse["response_code"] = $data[1] ?? $this->jsonResponse["response_code"];
        // if a response code is not given, then use the default response code that is given on the top of the class

        // Encode and output the jsonResponse
        echo json_encode($this->jsonResponse);
    }
}


?>