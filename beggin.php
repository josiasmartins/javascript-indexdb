$nomes = ["André", "Bruno", "Carlos", "Diego","Eduardo","xx"];

?>

<ul> 

  <?php

  for($indice=0;$indice<6;$indice++){

    ?>

  <li><?php echo $nomes[$indice] ?>  </li> 

  <?php

  }

  ?>

</ul>