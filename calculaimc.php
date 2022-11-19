<!DOCTYPE html>
<html>
<body>
<?php
$texto;
function calculaImc($massa) {
    if ($massa <= 18.5 ) {
        $texto = "Magreza";
    } else if ($massa >= 18.51 && $massa <= 24.9) {
        $texto = "Saudável";
        echo "text saudavel";
    } else if ($massa >= '25.0' && $massa <= '29.9') {
        $texto = "Sobrepeso";
    } else if ($massa >= '30.0' && $massa <= '34.9') {
        $texto = "Obesidade Grau I";
    } else if ($massa >= '35.0' && $massa <= '39.9') {
        $texto = "Obesidade Grau II";
    } else if ($massa > '39.9') {
        $texto = "Obesidade Grau III";
    } 
    (float)$massa;
    echo "Atenção, seu IMC {$massa}, e você está classificado como {$texto}";
}
calculaImc("39.92");
?>
</body>
</html>
