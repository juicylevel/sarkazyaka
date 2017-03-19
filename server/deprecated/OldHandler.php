/**
 * Получение списка сарказяк для главной страницы.
 */
public function getRecords () {
    $records = $this->db->getRecords();
    $recordsIds = array_value_recursive('id', $records);
    $contentItems = $this->db->getContentItemsByRecords($recordsIds);
    $recordsTags = $this->db->getRecordsTags($recordsIds);
    // print_r($records);
    // print_r($contentItems);
    // print_r($recordsTags);

    $result = array();
    foreach ($records as $rkey => $record) {
        $recordContentItems = array();
        $recordTags = array();
        foreach ($contentItems as $cikey => $contentItem) {
            if ($contentItem['record_id'] == $record['id']) {
                $recordContentItems[] = array(
                    'id' => $contentItem['id'],
                    'order' => $contentItem['item_order'],
                    'type' => $contentItem['type'],
                    'text' => $contentItem['text']
                );
            }
        }
        foreach ($recordsTags as $tkey => $recordTag) {
            if ($recordTag['record_id'] == $record['id']) {
                $recordTags[] = array(
                    // это id не самого тэга, а id тэга записи, т.е. id ряда таблицы record_tag
                    'id' => $recordTag['id'],
                    'name' => $recordTag['name'],
                    'color' => $recordTag['color']
                );
            }
        }
        $result[] = array(
            'id' => $record['id'],
            'title' => $record['title'],
            'author' => $this->getAuthor($record['userSocialId']),
            'createDate' => format_date_time($record['create_date']),
            'updateDate' => format_date_time($record['update_date']),
            'content' => $this->getPreviewContent($recordContentItems),
            'tags' => $recordTags
        );
    }
    return $result;
}

/**
 * Обновление записи.
 */
public function updateRecord ($record) {
    $updatedData = array(
        'recordId' => null,
        'recordData' => array()
    );

    foreach ($record as $fieldName => $fieldValue) {
        if ($fieldName == 'id') {
            $updatedData['recordId'] = $fieldValue;
        } else if ($fieldName == 'content') {
            // TODO
        } else if ($fieldName == 'tags') {
            // TODO
        } else {
            $updatedData['recordData'][$fieldName] = $fieldValue;
        }
    }

    $this->db->updateRecord($updatedData);

    /*$content = $record['content'];
    $tags = $record['tags'];

    $this->db->updateRecord($record);

    if (!empty($content)) {
        $updatedItems = $content['updated'];
        $createdItems = $content['created'];
        $deletedItemsIds = $content['deleted'];
        if (!empty($updatedItems)) {
            $this->db->updatedContentItems($updatedItems);
        }
        if (!empty($createdItems) {
            $this->db->insertContentItems($recordId, $createdItems);
        }
        if (!empty($deletedItemsIds)) {
            $this->db->removeContentItems($deletedItemsIds);
        }
    }

    if (!empty($tags)) {
        $addedTagsIds = $tags['added'];
        $deletedTagsItems = $tags['deleted'];
        if (!empty($addedTagsIds)) {
            $this->db->insertRecordTags($recordId, $addedTagsIds);
        }
        if (!empty($deletedTagsItems)) {
            $this->db->deleteRecordTags($recordId, $deletedTagsItems);
        }
    }*/

    return array(
        'recordId' => $recordId
    );
}

/**
 * Получение списка тэгов.
 */
public function getTags () {
    return $this->db->getTags();
}

/**
 * Создание тэга записи.
 */
public function createTag ($tag) {
    $tagId = $this->db->insertTag($tag['name'], $tag['color']);
    return array(
        'tagId' => $tagId
    );
}

/**
 * Редактирование тэга.
 */
public function editTag ($tag) {
    $tagId = $tag['id'];
    unset($tag['id']);
    $this->db->updateTag($tagId, $tag);
    return array(
        'tagId' => $tagId
    );
}

/**
 * Получение информации об авторе сарказяки.
 */
private function getAuthor ($userSocialId) {
    $host = $_SERVER['HTTP_HOST'];
    $socialData = array(
        1072742 => array(
            'name' => 'Юра',
            'photoUrl' => $host . '/img/social/user_1072742.jpg'
        ),
        1051165 => array(
            'name' => 'Миша',
            'photoUrl' => $host . '/img/social/user_1051165.jpg'
        ),
    );
    return $socialData[$userSocialId];
}

/**
 * Формирование информации о содержимом сарказяки для списка сарказяк.
 */
private function getPreviewContent ($recordContentItems) {
    $previewContent = array(
        'text' => '',
        'hasImage' => false,
        'hasVideo' => false,
        'hasAudio' => false
    );

    foreach ($recordContentItems as $key => $contentItem) {
        switch ($contentItem['type']) {
            case 'text': case 'link': $previewContent['text'] .= $contentItem['text'] . ' '; break;
            case 'image': $previewContent['hasImage'] = true; break;
            case 'video': $previewContent['hasVideo'] = true; break;
            case 'audio': $previewContent['hasAudio'] = true; break;
            default: break;
        }
    }

    $maxTextLength = 78;
    if (mb_strlen($previewContent['text']) > $maxTextLength) {
        $previewContent['text'] = mb_substr($previewContent['text'], 0, $maxTextLength - 1) . '...';
    }

    return $previewContent;
}
