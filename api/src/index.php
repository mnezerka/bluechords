<?php
require_once 'config.php';

 // Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
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

    switch ($ep) {
   
        default:
            onError404("Endpoint $ep does not exist");
    }
} 

function handleGet($ep) {

    switch ($ep) {

        case 'info':
            if (!validateRequest()) onError403('Invalid authorization');
            phpinfo();
            break;
    
        default:
            header("HTTP/1.0 404 Not Found");
            echo "Endpoint $ep does not exist";
            die();
    }
}

function main() {
    $ep = isset($_REQUEST['request']) ? $_REQUEST['request'] : null;
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

main();

?>
