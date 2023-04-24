<!DOCTYPE html>

<html lang="ja">

<!-- How many minutes have passed since the latest earthquake? -->
<!-- 最新の地震から何分経過？ -->
<?php include_once(dirname(__FILE__) . "/head.php")  ?>

<?php $targetXml //makeData.phpで読み込むデータ  
?>

<body>

    <?php include_once(dirname(__FILE__) . "/header.php") ?>

    <?php include_once(dirname(__FILE__) .  "/makeData.php")  ?>

    <?php include_once(dirname(__FILE__) .  "/dispData.php")  ?>

    <?php include_once(dirname(__FILE__) .  "/footer.php") ?>

</body>

</html>