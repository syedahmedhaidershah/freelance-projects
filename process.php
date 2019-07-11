<?php

require_once __DIR__.'/vendor/autoload.php';
header('Content-type: application/json');
use DialogFlow\Client;
use function GuzzleHttp\json_encode;

$posts = json_decode(file_get_contents('php://input'), true);
$res = null;

try {
    $client = new Client('8a6fad8de95c45e7b9145613f926502a');
    
    $query = $client->get('query', [
        'query' => $posts["message"],
        'sessionId' => $posts["sessid"]
    ]);

    $response = $query->getBody();
    $params = json_decode($response, true);
    $res = [
        "message" => $params["result"]["fulfillment"]["speech"],
        "error" => false
    ];
} catch (\Exception $error) {
    $res = [
        "message" => $error->getMessage(),
        "error" => true
    ];
}
die(json_encode($res));
?>
