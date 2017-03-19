<?php

require_once 'utils.php';
require_once 'Action.php';

/**
 * Получение списка записей.
 */
class GetRecords extends Action {

    private $offset;
    private $count;

    /**
     * @inheritDoc
     */
    protected function prepare ($page = null) {
        $this->offset = extarct_value($page, 'offset');
        $this->count = extarct_value($page, 'count');
    }

    /**
     * @inheritDoc
     */
    public function execute () {
        $result = null;

        try {
            $records = $this->db->getRecords($this->offset, $this->count);
            $recordIds = extarct_values($records, 'id');
            $contentItems = $this->db->getRecordsContentItems($recordIds);
            $tags = $this->db->getRecordsTags($recordIds);
            $result = $this->clientMapper->recordsList($records, $contentItems, $tags);
        }
        catch (Exception $exception) {
            $result = array('error' => $exception->getMessage());
        }

        return $result;
    }
}

?>
