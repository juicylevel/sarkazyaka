<?php

require_once 'utils.php';
require_once 'db/AppDB.php';
require_once 'mapping/DBMapper.php';
require_once 'mapping/ClientMapper.php';

/**
 * Обработка запросов.
 */
abstract class Action {
    /**
     * Ссылка на объект для работы с БД.
     */
    protected $db;

    /**
     * Преобразователь полей трансферных объектов для БД.
     */
    protected $dbMapper;

    /**
     * Преобразователь полей трансферных объектов для клиента.
     */
    protected $clientMapper;

    /**
     * Идентификатор текущего пользователя.
     */
    protected $userId;

    /**
     * Конструктор.
     *
     * @param $mysqlConfig Конфигурация БД.
     * @param $userSocialId Идентификатор пользователя в социальной сети.
     * @param $payload Данные запроса.
     */
    public function __construct ($mysqlConfig, $userSocialId, $payload) {
        $this->db = new AppDB($mysqlConfig);
        $this->dbMapper = new DBMapper();
        $this->clientMapper = new ClientMapper();
        $this->userId = $this->db->getUserId($userSocialId);
        $this->prepare($payload);
    }

    /**
     * Подготовка параметров запроса.
     *
     * @param $payload Данные запроса.
     */
    abstract protected function prepare ($payload = null);

    /**
     * Выполнение запроса.
     */
    abstract public function execute ();
}

?>
