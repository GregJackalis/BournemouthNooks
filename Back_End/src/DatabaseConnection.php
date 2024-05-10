<?php

require_once __DIR__ . '/../Classified/getenv.php';

class DatabaseConnection extends GetEnv {
    private array $db_cred = [];

    public function __construct(string $typeOfInfo) {
        $this->db_cred = parent::get_env_data($typeOfInfo);
    }

    public function getConnectionObj() : ?PDO { // function can return either nullable-type or pdo-type data
        $dsn = "mysql:host={$this->db_cred[0]}; dbname={$this->db_cred[1]}; charset=utf8";

        try {
            return new PDO($dsn, $this->db_cred[2], $this->db_cred[3]);
        } catch (Exception $e) {
            return null;
        }
    }
}

?>