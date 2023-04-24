<main class="wf-roundedmplus1c container">
    <div class="row my-2">
        <div class="col-12">
            <h1>最新の地震情報</h1>
        </div>
    </div>

    <?php

    $disp = true;

    if ($xml === false) {

        echo "<p id='failedGetData'> データの取得に失敗しました </p>";
        $disp = false;
    } else if (!isset($targetXml) || $targetXml === false) {

        echo "<p id='NoData'>" . "地震の情報がありません" . "</p>";
        $disp = false;
    } else {

        //地震の発生日時
        $originTime = $targetXml->Body->Earthquake->OriginTime;
        $lastTime = new DateTime($originTime);
        $earthquakeOccurredTime  = $lastTime->format('Y年m月d日 H時i分s秒');

        //震央地名
        $epicenterName = $targetXml->Body->Earthquake->Hypocenter->Area->Name;

        //深さ
        //タグの内容に、緯度・経度・深度の順に連結された文字列で表現されている。
        //正規表現で数値を取得して深度（最後の要素）を取得する
        $latitude_longitude_depth = $targetXml->Body->Earthquake->Hypocenter->Area->children('jmx_eb', true)->Coordinate;
        preg_match_all('/[+-]?\d+(?:\.\d+)?/', $latitude_longitude_depth, $matches);

        $latitude = (int)$matches[0][0]; //緯度
        $longitude = (int)$matches[0][1]; //経度

        $lastNum = abs((int)$matches[0][count($matches[0]) - 1]);
        $depth = (string) ($lastNum / 1000); //深度を計算して取得する

        //マグニチュード
        $magnitude = (string) $targetXml->Body->Earthquake->children('jmx_eb', true)->Magnitude;
    }

    ?>

    <div class="row justify-content-center my-2 bg-opacity-75">
        <div class="col-sm-12 col-lg-6 my-2 my-sm-5 text-center">
            <table>
                <tbody>
                    <tr>
                        <th>地震の発生日時</th>
                        <td id="earthquakeOccurredTime"><?php if ($disp && isset($earthquakeOccurredTime)) echo $earthquakeOccurredTime ?></td>
                    </tr>
                    <tr>
                        <th>震央地名</th>
                        <td id="epicenterName"><?php if ($disp && isset($epicenterName)) echo $epicenterName ?></td>
                    </tr>
                    <tr>
                        <th>深さ</th>
                        <td id="depth"><?php if ($disp && isset($depth)) echo $depth . "km" ?></td>
                    </tr>
                    <tr>
                        <th>マグニチュード</th>
                        <td id="magnitude"><?php if ($disp && isset($magnitude)) echo $magnitude . "M" ?></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-12 col-lg-6 my-2 my-sm-5">
            <h2 class="my-2" <?php if ($disp == false) echo "class='dispNon'" ?>>最新地震からの経過時間</h1>
                <p class="my-2" <?php if ($disp == false) echo "class='dispNon'" ?>><strong><time id="dispTime"></time></strong></p>
                <time id="hiddenLastTime"><?php if ($disp && isset($magnitude)) echo $lastTime->format('Y-m-d H:i:s'); ?></time>
        </div>
    </div>
</main>