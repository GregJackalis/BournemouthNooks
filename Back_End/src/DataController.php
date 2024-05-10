<?php

class DataController {
    private array $jsonResponse = [];
    private DataGateway $data_gateway;

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

    public function setupAndProcess(DataGateway $gateway, string $http_req, ?string $id): void {
        $this->$data_gateway = $gateway;
        if ($id) { // if id exists, meaning it is NOT NULL
            // $this->processResourceRequest($http_req, $id);
            $this->processSpecificRequest($http_req, $id);
        } else {
            $this->processDataColRequest($http_req, $id);
            // $this->sendResponse(["id was NOT given on the url"]);
        } 
    }

    private function processDataColRequest(string $http_req): void {
        switch ($http_req) {
            case "GET" :
                $data = $this->$data_gateway->getCol();
                $this->sendResponse([$data]);
                break;

            default:
                $this->sendResponse(["Method not Allowed", 405]);
        }
    }

    private function processSpecificRequest(string $http_req, $id): void {
        switch ($http_req) {
            case "GET":
                $data = $this->$data_gateway->getSpecific($id);
                $this->sendResponse([$data]);
                break;
            
            default:
                $this->sendResponse(["Method not Allowed", 405]);
        }
    }

    
}


?>