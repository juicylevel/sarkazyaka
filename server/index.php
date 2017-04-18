<?php

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Credentials: true'); 
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT'); 
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
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
		die('Unsupported REQUEST_METHOD "' . $requestMethod . '"');
}

extract($requestData);

$userSocialId = 1072742;

$actionClass = ucfirst($request);
require_once 'actions/' . $actionClass . '.php';

$response = array('apiMethod' => $request);

if (!empty($actionClass)) {
    $mysqlConfig = array(
        'host' => '127.0.0.1',
        'database' => 'sarkazyaka',
        'user' => 'root',
        'password' => '',
    );

    $requestPayload = null;
    if (isset($payload)) {
        $requestPayload = $payload;
    }

    $action = new $actionClass(
        $mysqlConfig,
        $userSocialId,
        $requestPayload
    );

    $result = $action->execute();

    if (!empty($result['error'])) {
        $response['error'] = $result['error'];
    } else {
        $response['result'] = $result;
    }
}

sleep(3);

echo json_encode($response, JSON_NUMERIC_CHECK);

?>
