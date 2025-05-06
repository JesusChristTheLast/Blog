<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = strip_tags($_POST["name"]);
    $email = strip_tags($_POST["email"]);
    $nachricht = strip_tags($_POST["nachricht"]);
    $betreff = strip_tags($_POST["betreff"]);
    $datum = date("Y-m-d H:i:s");

    $eintrag = "[$datum] $betreff | Name: $name | Email: $email | Nachricht: $nachricht\n";

    file_put_contents("kontakt-nachrichten.txt", $eintrag, FILE_APPEND | LOCK_EX);

    echo "Vielen Dank für Ihre Nachricht!";
}
?>
