<?php

require_once 'utils.php';
require_once 'Mapper.php';

/**
 * Формирование объектов для передачи слою, работающему с БД.
 */
class DBMapper extends Mapper {
    /**
     * Формирование объекта добавляемой записи для сохранения в БД.
     *
     * @param $title string Заголовок записи.
     * @param $userId int Идентификатор пользователя.
     * @return array
     */
    public function addedRecord ($title, $userId) {
        return array(
            'title' => $title,
            'user_id' => $userId
        );
    }

    /**
     * Формирование списка полей и их значений обновляемой записи.
     *
     * @param $recordId ini Идентификатор записи.
     * @param $title string Заголовок записи.
     * @return array
     */
    public function updatedRecord ($recordId, $title) {
        return array(
            'id' => $recordId,
            'title' => $title
        );
    }

    /**
     * Формирование списка новых элементов контента записи для сохранения в БД.
     *
     * @param $contentItems array Список элементов отправленных клиентом.
     * @param $recordId int Идентификатор записи.
     * @return array
     */
    public function addedContentItems ($contentItems, $recordId) {
        $result = array();
        foreach ($contentItems as $index => $contentItem) {
            $dataValue = $contentItem['data'];
            $type = $contentItem['type'];
            $dbDataField = $this->contentItemsMap[$type];
            $item = array(
                'item_order' => $contentItem['order'],
                'record_id' => $recordId,
                'type' => $type,
                $dbDataField => $dataValue
            );
            $result[] = $item;
        }
        return $result;
    }

    /**
     * Формирование списка обновляемых элементов контента записи для сохранения в БД.
     *
     * @param $contentItems array Список элементов отправленных клиентом.
     * @return array
     */
    public function updatedContentItems ($contentItems) {
        $result = array();
        foreach ($contentItems as $index => $contentItem) {
            $dataValue = $contentItem['data'];
            $type = $contentItem['type'];
            $dbDataField = $this->contentItemsMap[$type];
            $item = array(
                'id' => $contentItem['id'],
                'item_order' => $contentItem['order'],
                $dbDataField => $dataValue
            );
            $result[] = $item;
        }
        return $result;
    }

    /**
     * Формирование списка новых тегов записи для сохранения в БД.
     *
     * @param $tagsIds array Список идентификаторов тэгов.
     * @param $recordId int Идентификатор записи.
     * @return array
     */
    public function addedRecordTags ($tagsIds, $recordId) {
        $recordTags = array();
        foreach ($tagsIds as $key => $tagId) {
            $recordTags[] = array(
                'tag_id' => $tagId,
                'record_id' => $recordId
            );
        }
        return $recordTags;
    }
}

?>
