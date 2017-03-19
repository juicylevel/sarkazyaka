<?php

require_once 'utils.php';
require_once 'Action.php';

/**
 * Обновление записи.
 */
class UpdateRecord extends Action {

    private $recordId;
    private $title;
    private $content;
    private $tags;

    /**
     * @inheritDoc
     */
    protected function prepare ($record = null) {
        $this->recordId = extarct_value($record, 'id');
        $this->title = extarct_value($record, 'title');
        $this->content = extarct_value($record, 'content');
        $this->tags = extarct_value($record, 'tags');
    }

    /**
     * @inheritDoc
     */
    public function execute () {
        $result = null;

        try {
            $this->db->beginTransaction();

            $this->updateBaseFields();
            $this->updateContent();
            $this->updateTags();

            $this->db->commitTransaction();

            $result = array('recordId' => $this->recordId);
        }
        catch (Exception $exception) {
            $this->db->rollBackTransaction();
            $result = array('error' => $exception->getMessage());
        }

        return $result;
    }

    /**
     * Обновление основных полей записи.
     */
    private function updateBaseFields () {
        if (!empty($this->title)) {
            $record = $this->dbMapper->updatedRecord(
                $this->recordId,
                $this->title
            );
            $this->db->updateRecord($record);
        }
    }

    /**
     * Обновление содержимого записи.
     */
    private function updateContent () {
        if (!empty($this->content)) {
            $this->addContentItems();
            $this->updateContentItems();
            $this->deleteContentItems();
        }
    }

    /**
     * Добавление новых элементов содержимого записи.
     */
    private function addContentItems () {
        $createdItems = extarct_value($this->content, 'created');
        if (!empty($createdItems)) {
            $added = $this->dbMapper->addedContentItems(
                $createdItems,
                $this->recordId
            );
            $this->db->addRecordContentItems($added);
        }
    }

    /**
     * Обновление элементов содержимого записи.
     */
    private function updateContentItems () {
        $contentItems = extarct_value($this->content, 'updated');
        if (!empty($contentItems)) {
            $contentItemsIds = extarct_values($contentItems, 'id');
            $types = $this->db->getContentItemsTypes($contentItemsIds);
            $contentItems = merge_array_fields($contentItems, $types, 'id');
            $updated = $this->dbMapper->updatedContentItems($contentItems);
            $this->db->updateContentItems($updated);
        }
    }

    /**
     * Удаление элементов содержимого записи.
     */
    private function deleteContentItems () {
        $contentItemsIds = extarct_value($this->content, 'deleted');
        if (!empty($contentItemsIds)) {
            $this->db->deleteContentItems($contentItemsIds);
        }
    }

    /**
     * Обновление тэгов записи.
     */
    private function updateTags () {
        if (!empty($this->tags)) {
            $this->addTags();
            $this->deleteTags();
        }
    }

    /**
     * Добавление тэгов к записи.
     */
    private function addTags () {
        $addedTagsIds = extarct_value($this->tags, 'added');
        if (!empty($addedTagsIds)) {
            $recordTags = $this->dbMapper->addedRecordTags(
                $addedTagsIds,
                $this->recordId
            );
            $this->db->addRecordTags($recordTags);
        }
    }

    /**
     * Удаление тэгов записи.
     */
    private function deleteTags () {
        $deletedTagsIds = extarct_value($this->tags, 'deleted');
        if (!empty($deletedTagsIds)) {
            $this->db->deleteRecordTags($this->recordId, $deletedTagsIds);
        }
    }
}

?>
