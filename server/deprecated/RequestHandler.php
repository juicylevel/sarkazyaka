<?php

require_once 'utils.php';
require_once 'AppDB.php';

/**
 * Обработка запросов с клиента.
 */
class RequestHandler {
    /**
	 * Объект для работы с БД.
	 */
	private $db;

	/**
	 * Создание объекта для работы с БД.
	 */
	public function __construct ($userSocialId) {
        $mysqlConfig = array(
            'host' => '127.0.0.1',
            'database' => 'sarkozyaka',
            'user' => 'root',
            'password' => '',
        );
		$this->db = new AppDB($mysqlConfig, $userSocialId);
	}

    /**
     * Создание записи.
     */
    public function createRecord ($record) {
        // TODO: результат должен формироваться здесь
        // (нужно анализировать тип данных значения, которое возвращает addRecord)
        return $this->db->addRecord($record);
    }

    /**
     * Обновление записи.
     */
    public function updateRecord ($record) {
        return $this->db->updateRecord($record);
    }
}
