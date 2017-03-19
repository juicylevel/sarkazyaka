<?php

require_once 'utils.php';
require_once 'Action.php';

/**
 * Создание тэга.
 */
class CreateTag extends Action {

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

            $tagId = $this->db->createTag($this->tag);

            $this->db->commitTransaction();

            $result = array('tagId' => $tagId);
        }
        catch (Exception $exception) {
            $this->db->rollBackTransaction();
            $result = array('error' => $exception->getMessage());
        }

        return $result;
    }
}

?>
