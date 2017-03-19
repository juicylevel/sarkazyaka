<?php

require_once 'utils.php';

/**
 * Класс-обёртка для работы с БД.
 * Выполняет соединение с СУБД, базовые операции, шаблонные запросы к БД.
 */
class DBWrapper {
    /**
     * Представляет соединение между PHP и сервером базы данных.
     */
    protected $pdo;

    /**
	 * Подключение к базе данных.
     *
     * @param $mysqlConfig Конфигурация БД.
     */
    public function __construct ($mysqlConfig) {
        $this->pdo = new PDO(
            'mysql:host=' . $mysqlConfig['host'] . ';dbname=' . $mysqlConfig['database'] . ';charset=utf8',
            $mysqlConfig['user'],
            $mysqlConfig['password'],
            array(
                PDO::ATTR_PERSISTENT => TRUE,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE,
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8;SET time_zone = "Europe/Moscow"'
            )
        );
    }

    /**
     * Запуск транзакции.
     */
    public function beginTransaction () {
        $this->pdo->beginTransaction();
    }

    /**
     * Завершение транзакции.
     */
    public function commitTransaction () {
        $this->pdo->commit();
    }

    /**
     * Откат транзакции.
     */
    public function rollBackTransaction () {
        $this->pdo->rollBack();
    }

    /**
     * Вставка записи/записей в таблицу.
     *
     * @param $table Наименование таблицы.
     * @param $insertedData Данные для вставки в таблицу (объект или список объектов).
     * @return Список id вставленных записей.
     */
    protected function insert ($table, $insertedData) {
        $insertedData = wrap_to_array($insertedData);
        $rowIds = array();

        foreach ($insertedData as $key => $rowData) {
            $fields = join(', ', array_keys($rowData));
            $fieldsPlaceholders = join(', ', array_map(function ($fieldName) {
                return ':' . $fieldName;
            }, array_keys($rowData)));

            $sql = 'INSERT INTO ' . $table . ' (' . $fields . ') VALUES (' . $fieldsPlaceholders . ')';
            $stmt = $this->pdo->prepare($sql);
            foreach ($rowData as $fieldName => $fieldValue) {
                $stmt->bindValue((':' . $fieldName), $fieldValue);
            }

            $stmt->execute();
            $rowIds[] = $this->pdo->lastInsertId();
        }

        return $rowIds;
    }

    /**
     * Обновление записей в таблице.
     *
     * @param $table Наименование таблицы.
     * @param $updatedRows Обновляемые записи в таблице (объект или список объектов).
     */
    protected function update ($table, $updatedRows) {
        $updatedRows = wrap_to_array($updatedRows);

        foreach ($updatedRows as $key => $row) {
            $id = $row['id'];
            unset($row['id']);

            $fields = join(', ', array_map(function ($fieldName) {
                return $fieldName . ' = :' . $fieldName;
            }, array_keys($row)));

            $sql = 'UPDATE ' . $table . ' SET ' . $fields . ' WHERE id = :id';
            $stmt = $this->pdo->prepare($sql);
            foreach ($row as $fieldName => $fieldValue) {
                $stmt->bindValue((':' . $fieldName), $fieldValue);
            }
            $stmt->bindValue(':id', $id);

            $stmt->execute();
        }
    }

    /**
     * Удаление записей из таблицы.
     *
     * @param $table Наименование таблицы.
     * @param $ids Идентификатор или список идентификаторов.
     */
    protected function delete ($table, $ids) {
        $ids = wrap_to_array($ids);
        $sql = 'DELETE FROM ' . $table . ' WHERE id IN (' . join(',', $ids) . ')';
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute();
    }
}
