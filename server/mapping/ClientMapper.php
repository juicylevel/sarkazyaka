<?php

require_once 'utils.php';
require_once 'Mapper.php';

/**
 * Формирование объектов для передачи клиенту.
 */
class ClientMapper extends Mapper {
    /**
     * Формирование списка записей с контентом и тэгами.
     *
     * @param $records array Список записей из БД.
     * @param $allContentItems array Список элементов контента всех записей.
     * @param $allTags array Список тэгов всех записей.
     * @return array
     */
    public function recordsList ($records, $allContentItems, $allTags) {
        $result = array();

        foreach ($records as $recordIndex => $recordData) {
            $recordId = $recordData['id'];

            $recordContentItems = get_items_by_field($allContentItems, 'record_id', $recordId);
            $recordContent = $this->recordContentItems($recordContentItems);

            $tags = get_items_by_field($allTags, 'record_id', $recordId);
            $recordTags = $this->recordTags($tags);

            $record = array(
                'id' => $recordData['id'],
                'title' => $recordData['title'],
                'userSocialId' => $recordData['userSocialId'],
                'author' => array('photo' => 'img/user_1072742.jpg', 'name' => 'Юрий Рыков'),
                'editable' => true, // TODO
                'hasImage' => true, // TODO
                'hasAudio' => true, // TODO
                'hasVideo' => true, // TODO
                'createDate' => $this->formatDate($recordData['create_date']),
                'updateDate' => $this->formatDate($recordData['update_date']),
                'content' => $recordContent,
                'tags' => $recordTags
            );

            $result[] = $record;
        }

        return $result;
    }

    /**
     * Формирование списка элементов контента записи.
     *
     * @param $recordContentItems array Список элементов контента
     * записи полученнный из БД.
     * @return array
     */
    private function recordContentItems ($recordContentItems) {
        $result = array();
        foreach ($recordContentItems as $index => $contentItem) {
            $type = $contentItem['type'];
            $dbField = $this->contentItemsMap[$type];
            $recordItem = array(
                'id' => $contentItem['id'],
                'order' => $contentItem['item_order'],
                'data' => $contentItem[$dbField]
            );
            $result[] = $recordItem;
        }
        return $result;
    }

    /**
     * Формирование списка тэгов записи.
     *
     * @param $recordContentItems array Список элементов контента
     * записи полученнный из БД.
     * @return array
     */
    private function recordTags ($recordTags) {
        $result = array();
        foreach ($recordTags as $index => $recordTag) {
            $tag = array(
                'id' => $recordTag['tag_id'],
                'name' => $recordTag['name'],
                'color' => $recordTag['color']
            );
            $result[] = $tag;
        }
        return $result;
    }

    /**
     * Форматирование даты для отображения на клиенте.
     *
     * @param $dateTime string Исходное значение даты.
     * @return string
     */
    private function formatDate ($dateTime) {
        $result;
        if (!empty($dateTime)) {
            $result = date('d.m.Y H:i:s', strtotime($dateTime));
        } else {
            $result = $dateTime;
        }
        return $result;
    }
}

?>
