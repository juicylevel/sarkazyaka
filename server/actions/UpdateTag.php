<?php

require_once 'utils.php';
require_once 'Action.php';

/**
 * Обновление тэга.
 */
class UpdateTag extends Action {

    private $tag;

    /**
     * @inheritDoc
     */
    protected function prepare ($tag = null) {
        $this->tag = $tag;
    }

    /**
     * @inheritDoc
     */
    public function execute () {
        $result = null;

        try {
            $this->db->beginTransaction();

            $this->db->updateTag($this->tag);

            $this->db->commitTransaction();

            $result = array('tagId' => $this->tag['id']);
        }
        catch (Exception $exception) {
            $this->db->rollBackTransaction();
            $result = array('error' => $exception->getMessage());
        }

        return $result;
    }
}

?>
