<?php

class Auth {
    
    function userExists($userName) {
        global $BLUECHORDS_USERS;

        $result = false;
        foreach ($BLUECHORDS_USERS as $user) {
            if ($user[0] === $userName) {
                $result = true;
                break;
            }
        }
        return $result;
    } 

    function userIsValid($userName, $password) {
        global $BLUECHORDS_USERS;

        $result = false;
        foreach ($BLUECHORDS_USERS as $user) {
            if ($user[0] === $userName && $user[1] === $password) {
                $result = true;
                break;
            }
        }
        return $result;
    } 


    function getToken($userName) {
        global $BLUECHORDS_SECRET;

        $token = array(
            'username' => $userName
        );
        $tokenJson = json_encode($token);
        $tokenBase64 = base64_encode($tokenJson);
        $result = $tokenBase64 . '.' . md5($BLUECHORDS_SECRET . $tokenBase64);
        return $result;
    }

    function validateToken($token) {
        global $BLUECHORDS_SECRET;

        $parts = explode('.', $token);

        if (count($parts) != 2) return false; 
        $sign = md5($BLUECHORDS_SECRET . $parts[0]);
        if ($sign != $parts[1]) return false;

        $data = Auth::getTokenData($token);
        if (!property_exists($data, 'username')) return false;
        if (!Auth::userExists($data->username)) return false;

        return true;
    }

    function getTokenData($token) {
        $parts = explode('.', $token);
        if (count($parts) != 2) return null; 
        return json_decode(base64_decode($parts[0]));
    }

    function getRequestToken() {
        $headers = array_change_key_case(apache_request_headers(), CASE_LOWER);
        if(isset($headers['authorization-bp'])) {
            $matches = array();
            preg_match('/BP (.*)/', $headers['authorization-bp'], $matches);
            if(isset($matches[1])) {
                $token = $matches[1];
                return $token;
            }
        } 
        return null;
    }

    function getRequestTokenData() {
        global $BLUECHORDS_SECRET;

        $token = Auth::getRequestToken();
        if (!is_null($token)) {
            return Auth::getTokenData($token);
        } 
        return null;
    }

    function validateRequest() {
        global $BLUECHORDS_SECRET;

        $token = Auth::getRequestToken();
        if (!is_null($token)) {
            return Auth::validateToken($token, $BLUECHORDS_SECRET);
        } 
        return false;
    }
}
?>
