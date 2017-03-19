<?php

header('Content-type: application/json; charset=utf-8');
date_default_timezone_set('Europe/Moscow');
mb_internal_encoding('UTF-8');

$requestMethod = $_SERVER['REQUEST_METHOD'];
switch ($requestMethod) {
    case 'GET':
        $requestData = $_GET;
        break;
    case 'POST':
        $postBody = @file_get_contents('php://input');
        $requestData = json_decode($postBody, true);
        break;
    default:
		trigger_error('Unknow REQUEST_METHOD "' . $requestMethod . '"', E_USER_ERROR);
}

//print_r($_SERVER);

extract($requestData);

require_once 'RequestHandler.php';

$requestHandler = new RequestHandler($userSocialId);

switch ($request) {
	case 'getRecords':
		//$result = $requestHandler->getRecords();
		break;
    case 'createRecord':
        $result = $requestHandler->createRecord($record);
        break;
    case 'updateRecord':
        $result = $requestHandler->updateRecord($record);
        break;
    case 'getTags':
        //$result = $requestHandler->getTags();
        break;
    case 'createTag':
        //$result = $requestHandler->createTag($tag);
        break;
    case 'editTag':
        //$result = $requestHandler->editTag($tag);
        break;
	default:
		trigger_error('Unknow method "' . $request . '"', E_USER_ERROR);
}

//sleep(1);

$response = array('apiMethod' => $request, 'result' => $result);
echo json_encode($response, JSON_NUMERIC_CHECK);

?>
