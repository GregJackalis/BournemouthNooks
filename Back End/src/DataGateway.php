<?php

// This class includes all the Query Functions that will be used through the usage of the PDO-type variable
class DataGateway {
    private PDO $conn;
    private array $columnInfo;

    public function __construct(DatabaseConnection $database, TableSetup $csvSetup) {
        $this->$conn = $database->getConnectionObj();

        $isTable = $this->tableExists("datasets");

        if (!$isTable) {
            $this->columnInfo = [$csvSetup->getColumnNames(), $csvSetup->getColumnTypes()];
            $this->buildTable();
        }

    }

    // the dunction below needs to be fixed!!! its not working 100% just a first step towards my next task
    private function buildTable(): void {
        $columnNames = $this->columnInfo[0];
        $dataTypes = $this->columnInfo[1];

        // Constructing the SQL query string
        $columns = [];
        foreach ($columnNames as $index => $columnName) {
            $dataType = $dataTypes[$index];
            $columns[] = "`$columnName` $dataType";
        }

        $sql = "CREATE TABLE datasets (
            id INT AUTO_INCREMENT PRIMARY KEY,
            " . implode(",", $columns) . ")";
        

        // Preparing the statement
        $stmt = $this->$conn->prepare($sql);
        
        // Execute the statement
        $stmt->execute();

    }

    private function tableExists(string $tableName): bool {
        $sql = "SHOW TABLES";

        $stmt = $this->$conn->prepare($sql);

        $stmt->execute();

        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

        return in_array($tableName, $tables);
    }

    public function getCol(): array {
        $sql = "SELECT * FROM Courses";

        $stmt = $this->$conn->query($sql);
        
        $db_data = [];
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) { $db_data[] = $row; }
        
        return $db_data;

    }

    public function getSpecific(string $id): array {
        $sql = "SELECT * FROM Courses WHERE id = ?";

        $stmt = $this->$conn->prepare($sql);

        $stmt->bindValue(1, $id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

}

?>