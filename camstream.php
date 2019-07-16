<?php

require './config.php';
$queries = require './queries.php';

$dbo = oci_connect(DB_USER, DB_PASS, CONN_STR);

if(!$dbo) {
    $e = $oci_error();    
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
    // exit(404);
}

$queryObj = oci_parse($dbo, $queries["selectionQuery"]);
oci_execute($stid);

$cam = array();

while ($row = oci_fetch_array($queryObj, OCI_ASSOC+OCI_RETURN_NULLS))  {
    array_push($cam, $row);
}

// $file = fopen("camera.csv", "r");
// $i = 0;
// while (!feof($file)) {
//         $line_of_text .= fgets($file);
// }
// $data = explode("\n", $line_of_text);
// fclose($file);


// $z =  sizeof($data);
// //echo $data[i];

// $i = 0;
// $b = 0;
// for ($i = 0; $i < $z; $i++) {
//         // calculations
//         //echo $i;
//         $string = $data[$i];
//         //echo $data[$i];
//         //echo "<p>";
//         $string2 = str_replace(',', ' ', $string);

//         //echo "<p>";
//         //echo "<p>";

//         $string3 = substr($string2, 0, 3);
//         //echo "<p>";
//         $string4 = substr($string2, 4, 7);
//         //echo "<p>";
//         //echo "<p>";

//         //echo "<p>-------------------------------</p>";

//         //echo $string3;
//         //echo "<p>";
//         //echo $string4;

//         $cam[$b] = $string3;
//         //echo "par:", $string3;
//         $b = $b + 1;
//         $cam[$b] = $string4;
//         //echo $data[$i];
//         //echo "<p>";
//         //echo $string3;
//         //echo $string4;
//         //echo "<p>-------------------------------</p>";
//         //echo "tablica:",$cam[$b];
//         $b = $b + 1;
// }
//echo $data[2];


echo "<p>";

echo "<p>";


$uid = $_GET['uid'];
$card = $_GET['card'];
$phone = $_GET['phone'];
$cameras = array(
        103, '10.16.1.65',
        109, '10.16.1.66',
        106, '10.16.1.67',
        108, '10.16.1.68',
        101, '10.16.1.69',
        113, '10.16.1.70',
        107, '10.16.1.71',
        112, '10.16.1.72',
        105, '10.16.1.73',
        110, '10.16.1.74',
        104, '10.16.1.75',
        114, '10.16.1.76',
        102, '10.16.1.77',
        119, '10.16.1.78',
        120, '10.16.1.79',
        118, '10.16.1.80',
        115, '10.16.1.81',
        116, '10.16.1.83',
        117, '10.16.1.83',
        111, '10.16.1.84',
        100, '10.16.1.91',
        1, '10.16.1.137',
        2, '10.16.1.139',
        3, '10.16.1.143',
        4, '10.16.1.142',
        5, '10.16.1.141',
        6, '10.16.1.140',
        7, '10.16.1.138',
        8, '10.16.1.136',
        9, '10.16.1.146',
        10, '10.16.1.144',
        11, '10.16.1.145',
        12, '10.16.1.131',
        13, '10.16.1.133',
        14, '10.16.1.135',
        15, '10.16.1.134',
        16, '10.16.1.132',
);



//var_dump($cam);
//o "search: ";
//echo $data[0];
$key = array_search($uid, $cam);
if ($key !== false) {
        echo "<p>";
        echo $key;
        echo "<p>";


        echo  "<p>Real bed ID: ", $uid;
        echo "<p>";
        $cam_id = $cam[$key + 1];
        echo  "<p>Real Camera ID: ", $cam_id;
        echo "<p>";
        $cam_ip = array_search($cam_id, $cameras);
        $cam_ip = $cameras[$cam_ip + 1];
        echo "<p>";

        echo  "<p>Real Camera IP: ", $cam_ip;
        echo "<p>";








        $ip = $cam_ip;
        $username = "admin";
        $password = "1234";
        $redirect = "vod:?ForceURI=1_Asset=" . urlencode("rtsp://${username}:${password}@${ip}/h264") . "_BasicVOD=1&backurl=http%3A%2F%2Flocalhost%2Flincor%2F";
        //echo $redirect;
        $bed_cam = "0";
        $cam = "0";
        $camera_ip = "0";
} else {
        echo "<h1>Camera not found - please contact administrator";
}


?>
<html>

<head>
        <meta http-equiv="refresh" content="0;URL=<?= $redirect ?>">
</head>

<body />

</html>