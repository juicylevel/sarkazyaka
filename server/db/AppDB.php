<?php

require_once 'utils.php';
require_once 'DBWrapper.php';

/**
 * Класс-обёртка для работы с БД приложения.
 * Выполняет конкретные запросы к БД.
 */
class AppDB extends DBWrapper {

    //-------------------------------------------------------------------------
	// Работа с пользователями прложения
	//-------------------------------------------------------------------------

    /**
     * Получение идентификатора текущего пользователя по socialId.
     *
     * @param $userSocialId Идентификатор пользователя в социальной сети.
     * @param int Идентификатор пользователя в БД приложения.
     */
    public function getUserId ($userSocialId) {
        $sql = 'SELECT id FROM user WHERE social_id = ' . $userSocialId;
        $stmt = $this->pdo->query($sql);
        $result = $stmt->fetch(PDO::FETCH_OBJ);
        return $result->id;
    }

    //-------------------------------------------------------------------------
	// Работа с записями
	//-------------------------------------------------------------------------

    /**
     * Добавление новой записи.
     *
     * @param $title string Заголовок записи.
     * @param $userId int Идентификатор пользователя.
     * @return int Идентификатор добавленной записи.
     */
    public function addRecord ($record) {
        return $this->insert('record', $record)[0];
    }

    /**
     * Обновление полей таблицы record.
     *
     * @param $id int Идентификатор записи.
     * @param $fields array Обновляемые поля таблицы record.
     */
    public function updateRecord ($record) {
        return $this->update('record', $record);
    }

    /**
     * Получение списка записей.
     *
     * @param $offset int Начальная позиция.
     * @param $count int Количество.
     * @return array
     */
    public function getRecords ($offset = null, $count = null) {
        $sql = 'SELECT record.*, user.id as userId, user.social_id as ' .
               'userSocialId FROM record, user WHERE record.user_id = user.id ' .
               'ORDER BY record.create_date DESC ';

        if (!empty($offset) && !empty($count)) {
            $sql .= 'LIMIT ' . $offset . ',' . $count;
        }

        $stmt = $this->pdo->query($sql);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    //-------------------------------------------------------------------------
	// Работа с тэгами записи
	//-------------------------------------------------------------------------

    /**
     * Добавление тэгов к записи.
     *
     * @param $recordTags array Список тэгов записи.
     * @return array Идентификаторы добавленнных тэгов записи.
     */
    public function addRecordTags ($recordTags) {
        return $this->insert('record_tag', $recordTags);
    }

    /**
     * Удаление тэгов записи.
     *
     * @param $recordId Идентификатор записи.
     * @param $tagsIds Идентификаторы тэгов.
     */
    public function deleteRecordTags ($recordId, $tagsIds) {
        $recordTagsIds = $this->getRecordTagsIds($recordId, $tagsIds);
        $this->delete('record_tag', $recordTagsIds);
    }

    /**
     * Получение списка id записей в таблице record_tag по значениям
     * поля tag_id.
     *
     * @param $tagsIds array Список id записей в таблице tag.
     * @return $result array Список id записей в таблице record_tag.
     */
    private function getRecordTagsIds ($recordId, $tagsIds) {
        $sql = 'SELECT id FROM record_tag WHERE record_id = :recordId ' .
               'AND tag_id IN (' . join(',', $tagsIds) . ')';
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':recordId', $recordId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    /**
     * Получение тэгов записей.
     *
     * @param $recordIds array Идентификаторы записей.
     * @return array
     */
    public function getRecordsTags ($recordIds) {
        $sql = 'SELECT tag.*, record_tag.* FROM tag, record_tag ' .
               'WHERE record_tag.record_id IN (' . implode(',', $recordIds) . ') ' .
               'AND record_tag.tag_id = tag.id';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Создание тэга.
     *
     * @param $tag array Данные создаваемого тэга.
     */
    public function createTag ($tag) {
        return $this->insert('tag', $tag);
    }

    /**
     * Обновление тэга.
     *
     * @param $tag array Данные обновляемого тэга.
     */
    public function updateTag ($tag) {
        $this->update('tag', $tag);
    }

    /**
     * Получение списка всех тэгов.
     *
     * @return array
     */
    public function getAllTags () {
        $sql = 'SELECT * FROM tag ORDER BY id DESC';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //-------------------------------------------------------------------------
	// Работа с элементами контента записи
	//-------------------------------------------------------------------------

    /**
     * Добавление элементов содержимого записи.
     *
     * @param $contentItems Элементы контента записи.
     * @return array Идентификаторы добавленнных элементов.
     */
    public function addRecordContentItems ($contentItems) {
        return $this->insert('content_item', $contentItems);
    }

    /**
     * Обновление элементов контента записи.
     *
     * @param $contentItems array Список элементов контента.
     */
    public function updateContentItems ($contentItems) {
        $this->update('content_item', $contentItems);
    }

    /**
     * Удаление элементов контента записи.
     *
     * @param $contentItemsIds Идентификаторы элементов контента записи.
     */
    public function deleteContentItems ($contentItemsIds) {
        $this->delete('content_item', $contentItemsIds);
    }

    /**
     * Получение типов элементов контента по id.
     *
     * @param $contentItemsIds array Идентификаторы элементов контента.
     * @return array Массив типов array(0 => array(id => id, type => type)).
     */
    public function getContentItemsTypes ($contentItemsIds) {
        $sql = 'SELECT id, type FROM content_item WHERE id IN (' . join(',', $contentItemsIds) . ')';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Получение элементов контента записей.
     *
     * @param $recordIds array Идентификаторы записей.
     * @return array
     */
    public function getRecordsContentItems ($recordIds) {
        $sql = 'SELECT * FROM content_item WHERE record_id IN (' . implode(',', $recordIds) . ')';
        $stmt = $this->pdo->query($sql);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}

?>
