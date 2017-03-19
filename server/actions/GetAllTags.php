<?php

require_once 'utils.php';
require_once 'Action.php';

/**
 * Получение всех тэгов.
 */
class GetAllTags extends Action {
    /**
     * @inheritDoc
     */
    protected function prepare ($payload = null) { }

    /**
     * @inheritDoc
     */
    public function execute () {
        $result = null;

        try {
            $result = $this->db->getAllTags();
        }
        catch (Exception $exception) {
            $result = array('error' => $exception->getMessage());
        }

        return $result;
    }
}

?>
