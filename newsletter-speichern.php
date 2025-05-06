<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = strip_tags($_POST["newsletter_email"]);
    $datum = date("Y-m-d H:i:s");

    $eintrag = "[$datum] Newsletter-Anmeldung: $email\n";

    file_put_contents("newsletter-anmeldungen.txt", $eintrag, FILE_APPEND | LOCK_EX);

    echo "Danke für Ihre Anmeldung zum Newsletter!";
}
?>
