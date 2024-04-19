<?php

// this class is not about any table, but the table that will include the csv data
class TableSetup extends GetEnv {
    private array $columnNames;
    private int $numberOfColumns;
    private array $columnTypes;
    private array $csvData;

    public function __construct() {
        $this->columnNames = parent::get_csv_columns();
        $this->numberOfColumns = count($this->columnNames);

        $this->csvData = parent::get_csv_data();

        // var_dump($this->csvData);

        // depending on the number of columns and the types that you want each column to be,
        // change the array below
        $this->columnTypes = ["VARCHAR(106)", "VARCHAR(16)", "VARCHAR(10)", "VARCHAR(10)", "VARCHAR(9)"];
    }

    // getter function for the DataGateway class to use
    public function getColumnNames(): array {
        return $this->columnNames;
    }

    // public function getNumberColumns(): int {
    //     return $this->numberOfColumns;
    // }

    public function getColumnTypes(): array {
        return $this->columnTypes;
    }

    public function getCSVData(): array {
        return $this->csvData;
    }
}