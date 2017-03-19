<?php

require_once 'utils.php';
require_once 'DataBase.php';

/**
 * Выполнение запросов к БД.
 */
class AppDB extends DataBase {
    /**
     * Идентификатор текущего пользователя.
     */
    private $userId;

    /**
	 * Конструктор.
     */
    public function __construct ($mysqlConfig, $userSocialId) {
        parent::__construct($mysqlConfig);

        $this->userId = $this->getUserId($userSocialId);
    }

    // Работа с пользователями

    /**
     * Получение идентификатора текущего пользователя по socialId.
     */
    private function getUserId ($userSocialId) {
        $sql = 'SELECT id FROM user WHERE social_id = ' . $userSocialId;
        $stmt = $this->pdo->query($sql);
        $result = $stmt->fetch(PDO::FETCH_OBJ);
        return $result->id;
    }

    // Работа с записями

    /**
     * Добавление новой записи.
     *
     * @param $record Данные записи.
     * @return $result Результат выполнения.
     */
    public function addRecord ($record) {
        $result = null;

        $title = $record['title'];
        $contentItems = $record['content'];
        $tagsIds = $record['tags'];

        try {
            $this->pdo->beginTransaction();

            $recordId = $this->insert('record', array(
                'title' => $title,
                'user_id' => $this->userId
            ))[0];

            if (!empty($contentItems)) {
                add_field_to_array_items($contentItems, 'record_id', $recordId);
                $this->insert('content_item', $contentItems);
            }

            if (!empty($tagsIds)) {
                $recordTags = array();
                // TODO: refactor to method
                foreach ($tagsIds as $key => $value) {
                    $recordTags[$key]['tag_id'] = $value;
                }
                //
                add_field_to_array_items($recordTags, 'record_id', $recordId);
                $this->insert('record_tag', $recordTags);
            }

            $this->pdo->commit();
            $result = array('recordId' => $recordId);
        } catch (Exception $exception) {
            $this->pdo->rollBack();
            $result = array('error' => $exception->getMessage());
        }

        return $result;
    }

    /**
     * Обновление записи.
     *
     * @param $record Данные записи.
     * @return $result Результат выполнения.
     */
    public function updateRecord ($record) {
        $result = null;

        $recordId = $record['id'];
        $title = $record['title'];
        $content = $record['content'];
        $tags = $record['tags'];

        try {
            $this->pdo->beginTransaction();

            if (!empty($title)) {
                $this->update('record', array(
                    'id' => $recordId,
                    'title' => $title
                ));
            }

            if (!empty($content)) {
                $createdContentItems = $content['created'];
                $updatedContentItems = $content['updated'];
                $deletedContentItemsIds = $content['deleted'];

                if (!empty($createdContentItems)) {
                    add_field_to_array_items($createdContentItems, 'record_id', $recordId);
                    $this->insert('content_item', $createdContentItems);
                }

                if (!empty($updatedContentItems)) {
                    // TODO
                }

                if (!empty($deletedContentItemsIds)) {
                    // TODO
                }
            }

            if (!empty($tags)) {
                $addedTagsIds = $tags['added'];
                $deletedTagsIds = $tags['deleted'];

                /*if (!empty($addedTagsIds)) {
                    $recordTags = array();
                    // TODO: refactor to method
                    foreach ($tagsIds as $key => $value) {
                        $recordTags[$key]['tag_id'] = $value;
                    }
                    //
                    add_field_to_array_items($recordTags, 'record_id', $recordId);
                    $this->insert('record_tag', $recordTags);
                }*/

                if (!empty($deletedTagsIds)) {
                    $recordTagsIds = $this->getRecordTagsIds($recordId, $deletedTagsIds);
                    $this->delete('record_tag', $recordTagsIds);
                }
            }

            $this->pdo->commit();
            $result = array('recordId' => $recordId);
        } catch (Exception $exception) {
            $this->pdo->rollBack();
            $result = array('error' => $exception->getMessage());
        }

        return $result;
    }

    // Работа с тэгами

    /**
     * Получение списка id записей в таблице record_tag по значениям поля tag_id.
     *
     * @param $tagsIds array Список id записей в таблице tag.
     * @return $result array Список id записей в таблице record_tag.
     */
    private function getRecordTagsIds ($recordId, $tagsIds) {
        $result = array();
        $sql = 'SELECT id FROM record_tag WHERE record_id = :recordId AND tag_id IN (' . join(',', $tagsIds) . ')';
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':recordId', $recordId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
}
