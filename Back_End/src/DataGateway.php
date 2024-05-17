<?php

// This class includes all the Query Functions that will be used through the usage of the PDO-type variable
class DataGateway {
    private PDO $conn;
    private array $columnInfo;

    public function __construct(DatabaseConnection $database, TableSetup $csvSetup) {
        $this->$conn = $database->getConnectionObj();

        $exists = $this->tableExists("places");

        if (!$exists) {
            try {
                $this->columnInfo = [array_map('ltrim', $csvSetup->getColumnNames()), $csvSetup->getColumnTypes()];   
                $this->buildTable();     
            } catch (Exception $e) {
                echo json_encode("Error when bulding table for CSV data: " . $e->getMessage());
                exit();
            }
            

            try {
                $csvD = $csvSetup->getCSVData();
                $this->insertCSV($csvD);
            } catch (Exception $e) {
                echo json_encode("Error when inserting CSV data to table: " . $e->getMessage());
                exit();
            }
            

        } else {
            // echo json_encode("Table to store data already exists!");
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

        $sql = "CREATE TABLE places (
            id INT AUTO_INCREMENT PRIMARY KEY,
            " . implode(",", $columns) . ")";
        
            echo json_encode($sql);
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

    // i was thinking of using this function with the tableExists variable but it only made it more complicating, 
    // but i will leave it here for now in case i use it in the future
    private function tableEmpty(string $tableName): int {
        $sql = "SELECT COUNT(*) FROM $tableName";
        $stmt = $this->$conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $result = count($result);
        return $result;
    }

    private function insertCSV(array $data): void {
        $columns = implode(', ', array_map(function($column) {
            return "`$column`";
        }, $this->columnInfo[0]));

        // var_dump($columns);        

        // rtrim removes from the first paramter (a string), the character that is given on the second parameter FROM THE END of the string
        // then in this case the string I'm giving it is the str_repeat function that will repeat the ? placeholder symbol for 5 times
        // using the the count() function and the column names that can be found on the first position of the local columnInfo array-type variable
        $params = rtrim(str_repeat('?, ', count($this->columnInfo[0])), ', ');

        $sql = "INSERT INTO places ($columns) VALUES ($params)";
        echo json_encode($sql);
        
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
        $sql = "SELECT * FROM places";

        $stmt = $this->$conn->query($sql);
        
        $db_data = [];
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) { $db_data[] = $row; }
        
        return $db_data;

    }

    public function getSpecific(string $id): array|false {
        $sql = "SELECT * FROM places WHERE id = ?";

        $stmt = $this->$conn->prepare($sql);

        $stmt->bindValue(1, $id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        // return $data;
        return $data !== false ? $data : false;
    }
}

?>