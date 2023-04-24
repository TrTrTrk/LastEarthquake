<?php

$targetText = "震源・震度に関する情報";

$url = "https://www.data.jma.go.jp/developer/xml/feed/eqvol.xml";
// $url = "https://www.data.jma.go.jp/developer/xml/feed/eqvol1.xml";/テスト用データ　ファイルが存在しない

$xml = @simplexml_load_file($url); //XMLファイルを読み込む

if ($xml == false)  return;
else {

    foreach ($xml->entry as $entry) {

        if (isset($targetXml) == false && $entry->title == $targetText) {
           
            //関数の頭に@を付けることでブラウザに出るエラーを非表示にする
            $targetXml = @simplexml_load_file((string)$entry->link['href']); //最初のデータだけ取得する

            //テスト用データ ファイルが存在しない
            // $targetXml = @simplexml_load_file("C:\Users\Teruki\Desktop\地震Web_ver1\TestXMLdata\eqvol2.xml"); //最初のデータだけ取得する
            break;

        }
    }
}
