/**
 * Получение списка записей.
 */
public function getRecords () {
    $sql = 'SELECT record.*, user.id as userId, user.social_id as userSocialId FROM record, user WHERE record.user_id = user.id';
    $stmt = $this->pdo->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

/**
 * Получение элементов контента по идентификаторам записей.
 */
public function getContentItemsByRecords ($recordIds) {
    $sql = 'SELECT * FROM content_item WHERE record_id IN (' . implode(',', $recordIds) . ')';
    $stmt = $this->pdo->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

/**
 * Получение тэгов по идентификаторам записей.
 */
public function getRecordsTags ($recordIds) {
    $sql = 'SELECT tag.*, record_tag.* FROM tag, record_tag ' .
           'WHERE record_tag.record_id IN (' . implode(',', $recordIds) . ') ' .
           'AND record_tag.tag_id = tag.id';
    $stmt = $this->pdo->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

/**
 * Вставка записи.
 */
public function insertRecord ($title) {
    $sql = 'INSERT INTO record (title, user_id) VALUES (:title, :user_id)';
    $stmt = $this->pdo->prepare($sql);
    $data = array(':title' => $title, ':user_id' => $this->userId);
    $result = $stmt->execute($data);
    return $this->pdo->lastInsertId();
}

public function updateRecord ($updatedData) {
    try {
        $this->pdo->beginTransaction();

        $recordId = $updatedData['recordId'];
        $recordData = $updatedData['recordData'];

        if (!empty($recordData)) {
            $this->update('record', $recordId, $recordData);
        }

        /*if (!empty($updatedContentItems)) {
            foreach ($updatedContentItems as $key => $updatedContentItem) {
                $this->update(
                    'content_item',
                    $updatedContentItem['id'],
                    $updatedContentItem['updatedData']
                );
            }
        }

        if (!empty($createdContentItems)) {
            foreach ($createdContentItems as $key => $createdContentItem) {
                $createdContentItem['record_id'] = $recordId;
                $this->insert(
                    'content_item',
                    $createdContentItem['contentItemData']
                );
            }
        }

        if (!empty($deletedContentItemsIds)) {
            foreach ($deletedContentItemsIds as $key => $deletedContentItemId) {
                $this->delete('content_item', $deletedContentItemId);
            }
        }*/

        $this->pdo->commit();
    } catch (Exception $e) {
        $this->pdo->rollBack();
        return array('error' => $e->getMessage());
    }
}

/**
 * Вставка элементов контента записи.
 */
public function insertContentItems ($recordId, $content) {
    $rowsToInsert = array();
    foreach ($content as $key => $item) {
        $row = array(
            'record_id' => $recordId,
            'type' => $item['type'],
            'item_order' => $item['order']
        );

        if ($item['type'] == 'text') {
            $row['text'] = $item['data'];
        }

        $rowsToInsert[] = $row;
    }
    $this->multiInsert('content_item', $rowsToInsert);
}

/**
 * Получение списка тэгов.
 */
public function getTags () {
    $sql = 'SELECT * FROM tag';
    $stmt = $this->pdo->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

/**
 * Вставка нового тэга.
 */
public function insertTag ($name, $color) {
    $sql = 'INSERT INTO tag (name, color) VALUES (:name, :color)';
    $stmt = $this->pdo->prepare($sql);
    $data = array(':name' => $name, ':color' => $color);
    $result = $stmt->execute($data);
    return $this->pdo->lastInsertId();
}

/**
 * Обновление тэга.
 */
public function updateTag ($id, $updated) {
    $updatedFields = join(', ', array_map(function ($value) {
        return $value . ' = ?';
    }, array_keys($updated)));

    $updatedValues = array_values($updated);
    array_push($updatedValues, $id);

    $sql = 'UPDATE tag SET ' . $updatedFields . ' WHERE id = ?';
    $stmt = $this->pdo->prepare($sql);
    return $stmt->execute($updatedValues);
}

/**
 * Вставка тэгов для записи.
 */
public function insertRecordTags ($recordId, $tags) {
    $rowsToInsert = array();
    foreach ($tags as $key => $tagId) {
        $rowsToInsert[] = array(
            'record_id' => $recordId,
            'tag_id' => $tagId,
        );
    }
    $this->multiInsert('record_tag', $rowsToInsert);
}
