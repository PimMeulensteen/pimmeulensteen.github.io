<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">

  <title>Pim Meulensteen</title>

  <meta name="robots" content="index,follow">
  <meta name="google" content="notranslate">

  <meta name="theme-color" content="#2e2e2e">
  <meta name="keywords" content="Pim Meulensteen, Projecten, Portfolio, Website, ICT in de wolken, Informatica, ">
  <meta name="description" content="Website van Pim Meulensteen. Verzameling van mijn beste, leuks of interessanste projecten. Gemaakt voor lessen informatica in 5V in 2018.">
  <meta name="author" content="Pim Meulensteen">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="favicon.png">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style>
    html,body,a,.front,.back{background-color:#000;color:#fff;transition:.7s}
    img,.front,.back,main,header{height:100%;width:100%}
    p{color:#aaa}
    html,a{margin:0}
    a{text-decoration:none;border-bottom:1px solid #777}
    a:hover{border-bottom:1.2px solid #fff;}
    body,main,header{max-width:1200px}
    header{height:80px}
    body{font-family:sans-serif;margin:0 auto;left:0;right:0}
    
    h1,footer{margin:20px 0;text-align:center}
   
    main,header{display:flex;flex-wrap:wrap;align-content:stretch;flex-direction:row;justify-content:center;align-items:center}
    article{margin:10px;width:280px;height:280px;position:relative;perspective:30rem}
    p,h2{margin:20px}

    .front,.back{position: absolute;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-color:gray;border-width:1px;border-style:solid;transform-style:preserve-3d}
    .back{transform:rotateY(180deg);cursor:pointer}
    article:hover .front{transform:rotateY(180deg)}
    article:hover .back{transform:rotateY(360deg)}
    .seo-text{display: none;}
    @media only screen and (max-width: 619px) {article{width:80vw;height:80vw;margin:10vw 5vw}}
  </style>
</head>

<body>
  <header>
    <h1>
      Pim Meulensteen
    </h1>
  </header>
  <main>
    <p class="seo-text">Website van Pim Meulensteen. Verzameling van mijn beste, leuks of interessanste projecten. Gemaakt voor lessen informatica in 5V in 2018.</p>
    <?php
    echo 'hello';
    $string = file_get_contents("main.json");
    $json_a = json_decode($string, true);
    echo ($json_a);
    ?>
  </main>
  <footer>
    Mail:&nbsp;<a href="mailto:pim@meulensteen.net">pim@meulensteen.net</a> |&nbsp;&copy;&nbsp;2018&nbsp;| Github:&nbsp;<a href="https://github.com/PimMeulensteen">/PimMeulensteen</a>
  </footer>
  <script>
    //Variable die het aantal 'cards' boven de vouw betekent
    //Neem de minimale waarde van: 4 (max aantal cards) en (WIDTH - SCROLLBAR)/BREEDTE_KAART (aantal kaarten dat past)
    //Neem het aantal kaarten dat past in de hoogte door (HEIGHT - HEADER_HEIGHT)/HOOGTE_KAART
    //Doe dit dan keer elkaar. 
    let q = Math.min(4,Math.floor((window.innerWidth - 17)/300)) * (Math.ceil((window.innerHeight - 80)/300))
  </script>
  <!-- <script src="json.js"></script> -->
</body>


</html>