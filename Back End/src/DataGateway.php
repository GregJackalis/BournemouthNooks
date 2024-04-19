<?php

// This class includes all the Query Functions that will be used through the usage of the PDO-type variable
class DataGateway {
    private PDO $conn;
    private array $columnInfo;

    public function __construct(DatabaseConnection $database, TableSetup $csvSetup) {
        $this->$conn = $database->getConnectionObj();

        $exists = $this->tableExists("datasets");

        if (!$exists) {
            $this->columnInfo = [array_map('ltrim', $csvSetup->getColumnNames()), $csvSetup->getColumnTypes()];
            $this->buildTable();

            $csvD = $csvSetup->getCSVData();

            $this->insertCSV($csvD);

        } else {
            echo json_encode("Table to store data already exists!");
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

    // NOT WORKING YET, NEED TO WORK ON THIS
    private function insertCSV(array $data): void {
        $columns = implode(', ',$this->columnInfo[0]);
        // var_dump($columns);

        // rtrim removes from the first paramter (a string), the character that is given on the second parameter FROM THE END of the string
        // then in this case the string I'm giving it is the str_repeat function that will repeat the ? placeholder symbol for 5 times
        // using the the count() function and the column names that can be found on the first position of the local columnInfo array-type variable
        $params = rtrim(str_repeat('?, ', count($this->columnInfo[0])), ', ');


        $sql = "INSERT INTO datasets ($columns) VALUES ($params)";

        $stmt = $this->$conn->prepare($sql);
    
        foreach ($data as $row) {
            if (count($row) !== count($this->columnInfo[0])) {
                continue; // Skip if row size doesn't match column count
            }
    
            $i = 1;
            // Bind values to placeholders
            foreach ($row as $value) {
                // Note: Parameters are 1-indexed in PDO
                $stmt->bindValue($i++, $value, PDO::PARAM_STR);
            }

            // Execute the statement
            $stmt->execute();
        }

    }
    
    public function getCol(): array {
        $sql = "SELECT * FROM datasets";

        $stmt = $this->$conn->query($sql);
        
        $db_data = [];
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) { $db_data[] = $row; }
        
        return $db_data;

    }

    public function getSpecific(string $id): array {
        $sql = "SELECT * FROM datasets WHERE id = ?";

        $stmt = $this->$conn->prepare($sql);

        $stmt->bindValue(1, $id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

}

?>