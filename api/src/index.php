<?php
require_once 'config.php';
require_once 'lib/Db.php';
require_once 'lib/Api.php';
require_once 'lib/Auth.php';

 // Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

function getApi() {
    global $DB_HOST; 
    global $DB_USER; 
    global $DB_PASS; 
    global $DB_NAME; 

    $dbConfig = [ 
        'host' => $DB_HOST,
        'username' => $DB_USER,
        'password' => $DB_PASS,
        'database' => $DB_NAME
    ];

    $db = new DbMysql($dbConfig);
    $api = new Api($db);
    return $api;
}

function onError($header, $msg) {
    header($header);
    header('Content-type: application/json');
    die('{"description": "' . $msg . '"}');
}

function onError403($msg) {
    onError("HTTP/1.0 403 Forbidden", $msg);
}

function onError404($msg) {
    onError("HTTP/1.0 404 Not Found", $msg);
}

function onError400($msg) {
    onError("HTTP/1.0 400 Bad Request", $msg);
}

function onError500($msg) {
    onError("HTTP/1.0 500 Internal Server Error", $msg);
}

// Access-Control headers are received during OPTIONS requests
function handleOptions() {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

function handlePost($ep) {
    global $BLUECHORDS_SECRET;
    global $BLUECHORDS_USERS;

    switch ($ep[0]) {

        case 'auth':
            $data = json_decode(file_get_contents('php://input'));
            if (!isset($data->username) || !isset($data->password)) {
                onError400('missing username or password');
            };


            if (!Auth::userExists($data->username)) {
                onError403('unknown user');
            };

            if (!Auth::userIsValid($data->username, $data->password)) {
                onError403('invalid password');
            };

            $token = Auth::getToken($data->username);
            $response = array(
                'token' => $token
            );

            header('Content-type: application/json');
            echo json_encode($response);
            break;

        case 'songs':
            $api = getApi();
            if (!isset($ep[1])) {
                onError400("Missing song id in endpoint path");
            }
            $songData = json_decode(file_get_contents('php://input'));

            if (!isset($songData->name) ||
                !isset($songData->artist) ||
                !isset($songData->data)) {
                onError400('missing name, artist or data attribute');
            } 

            $song = $api->saveSong($ep[1], $songData);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($song);
            break;

        default:
            onError404("Endpoint $ep[0] does not exist");
    }
} 

function handleGet($ep) {

    switch ($ep[0]) {

        case 'info':
            if (!validateRequest()) onError403('Invalid authorization');
            phpinfo();
            break;

        case 'songs':
            $sortField = 'name';
            $sortAsc = true;
            if (isset($_GET['ordering']) && strlen($_GET['ordering']) > 0) {
                $sortField = $_GET['ordering'];
                if ($sortField[0] == '-') {
                    $sortAsc = false;
                    $sortField = substr($sortField, 1);
                } 
            };

            $filter = null;
            if (isset($_GET['filter']) && strlen($_GET['filter']) > 0) {
                $filter = $_GET['filter'];
            };

            $api = getApi();
            $songs = $api->getSongs($sortField, $sortAsc, $filter);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($songs);
            break;

        case 'song':
            $api = getApi();
            $song = $api->getSong($ep[1]);
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($song);
            break;
     
        default:
            header("HTTP/1.0 404 Not Found");
            echo "Endpoint $ep[0] does not exist";
            die();
    }
}



function main() {
    $ep = isset($_REQUEST['request']) ? $_REQUEST['request'] : null;

    $ep = explode('/', $ep);

    switch($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            handlePost($ep);
            break; 

        case 'OPTIONS':
            handleOptions($ep);
            break; 

        case 'GET':
            handleGet($ep);
            break;

        default:
            onError404('Method not supported');
    }
}

try {
    main();
} catch (Exception $e) {
    onError500($e->getMessage());
}

?>
