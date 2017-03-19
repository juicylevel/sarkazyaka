<?php

require_once 'utils.php';
require_once 'Action.php';

/**
 * Создание новой записи.
 */
class CreateRecord extends Action {

    private $recordId;
    private $title;
    private $content;
    private $tagsIds;

    /**
     * @inheritDoc
     */
    protected function prepare ($record) {
        $this->title = extarct_value($record, 'title');
        $this->content = extarct_value($record, 'content');
        $this->tagsIds = extarct_value($record, 'tags');
    }

    /**
     * @inheritDoc
     */
    public function execute () {
        $result = null;

        try {
            $this->db->beginTransaction();

            $this->recordId = $this->addRecord();
            $this->addContent();
            $this->addTags();

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
     * Добавление новой записи.
     */
    private function addRecord () {
        return $this->db->addRecord(
            $this->dbMapper->addedRecord(
                $this->title,
                $this->userId
            )
        );
    }

    /**
     * Добавление элементов контента записи.
     */
    private function addContent () {
        if (!empty($this->content)) {
            $contentItems = $this->dbMapper->addedContentItems(
                $this->content,
                $this->recordId
            );
            $this->db->addRecordContentItems($contentItems);
        }
    }

    /**
     * Добавление тэгов записи.
     */
    private function addTags () {
        if (!empty($this->tagsIds)) {
            $recordTags = $this->dbMapper->addedRecordTags(
                $this->tagsIds,
                $this->recordId
            );
            $this->db->addRecordTags($recordTags);
        }
    }
}

?>
