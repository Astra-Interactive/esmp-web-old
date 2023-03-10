<!DOCTYPE html>

<head>
    <link rel="icon" href="img/ferris_logo.png" />

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>EMPIRE PROJEKT</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/main.css?ver=2">
    <link rel="stylesheet" href="css/law.css">
    <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
    <link rel="stylesheet" href="css/header.css?ver=2">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Alegreya+SC&display=swap" rel="stylesheet">
</head>




<body>
    <?php
include( 'navbar.php');
?>
    <!--
    <header style="
    filter: drop-shadow(0px 0px 8px #185eb7);">
        <a class="logo" href=""><img src="img/BANER_TRANS_FERRIS.png" alt="logo"></a>
        <nav>
            <ul class="nav__links">
                <li class="dropdown">
                    <a href="#">Информация</a>
                    <div class="dropdown-content">
                        <a href="..">Главная</a>
                        <a href="faq">Частые вопросы</a>
                        <a href="rules">Правила</a>
                        <a href="law">Законы</a>
                        <a href="commands">Команды</a>
                        <a href="updates">Обновления</a>
                    </div>
                </li>

                <li class="dropdown">
                    <a href="#">Игра</a>
                    <div class="dropdown-content">
                        <a href="imgs">Картинки</a>
                        <a href="create_item">Предметы</a>
                        <a href="trading.php">Трейды</a>
                    </div>
                </li>


                <li class="dropdown">
                    <a id="resource_pack_version" href="#">Ресур-пак 1.1</a>
                    <div class="dropdown-content">
                        <a href="files/EmpireProjektPack.zip">Полная версия</a>
                        <a href="files/EmpireProjektPack_Light.zip">Легкая версия(без звуков)</a>
                    </div>
                </li>
                <li><a href="donate">Донат</a></li>
                <li><a href="https://discord.gg/Gwukdr8">Дискорд</a></li>
                <li><a href="https://vk.com/empireprojekt">ВК</a></li>
            </ul>
        </nav>
    </header>
-->

    <div style="
    width: 95%;
    background-color:#181818;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 150px;
  z-index: 1;
    ;
    ">


        <p id="main-logo-name" style="
        font-weight: 500;
        font-size: 30px;
        color: #edf0f1;
        text-decoration: none;
        background-color:#185eb7;
  z-index: 1;
        padding:5px;
        text-align: center;
        margin-top: 30px;">EMPIRE PROJEKT


            <img class="logo-image" style="height: 64px; width:64px;" src="img/ferris_logo.png">
        </p>



        <script>
            var url = "https://api.minetools.eu/ping/play.empireprojekt.ru";
            $.getJSON(url, function (r) {
                if (r.error) {
                    $('#rest').html('Сервер выключен');
                    $('#coll_players').css('background-color', '#370000')
                    return false;
                }
                var plStr = '<br>Сейчас играют: <br>'
                console.log(r.players.sample);
                r.players.sample.forEach(el => plStr += el.name + '; ');


                $('#players_online').html('Сейчас на сервере играет ' + r.players.online + '/' + r.players.max + ' человек на версии ' + r.version.name + '\n' + plStr);
                $('#coll_players').css('background-color', '#00370e')
            });
        </script>




        <button id="coll_players" class="collapsible_empty"
            style="text-align: center;padding: 15px;background-color:rgb(91, 69, 0);">
            <span id="players_online" data-playercounter-ip="51.178.221.76">
                <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/ferris_logo.png">
                Загрузка...
                <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/ferris_logo.png">

            </span>
        </button>

        <ul style="padding:30px;">
            <li style="font-size: 25px; list-style: none;text-align: center;" class="li-laws">
                <img class="logo-image" style="width: 25px; height: auto; display: inline" src="img/schlatt_coin.png">

                <a style="
                color: #F7C701;
                text-decoration:none;
                transition: all 0.3s ease 0s;" target="_blank"
                    href="https://www.donationalerts.com/r/empireprojekt">Поддержать проект</a>
                <img class="logo-image" style="width: 25px; height: auto; display: inline" src="img/schlatt_coin.png">
            </li>
        </ul>

        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/warning.svg">
            1.16.4 ip: play.EmpireProjekt.ru
        </div>
        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/warning.svg">
            Информация о донате по <a style="
            color: #F7C701;
            text-decoration:none;
            transition: all 0.3s ease 0s;" target="_blank" href="donate">ссылке.</a>.
        </div>
        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/warning.svg">
            Приват имеется, однако любой игрок сможет ставить/ломать блоки в вашем привате.<br>
            Преимущество привата в том, что вашу собственость не смогут взорвать/залить лавой. Также можете отключить
            спавн мностров и включить приветсвтенное сообщение при входе в приват.
            .
        </div>
        <ul style="padding:30px;">
            <li style="font-size: 25px; list-style: none;text-align: center;" class="li-laws">
                <img class="logo-image" style="width: 25px; height: auto; display: inline" src="img/parchment.svg">
                Информация о сервере:
            </li>
        </ul>

        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/info.svg">
            На сервере присутствуют кастомные предметы, в том числе пластинки с музыкой. Для этого необходим наш
            <a style="
                color: #1881b7;
                text-decoration:none;
                
                transition: all 0.3s ease 0s;" href="files/EmpireProjektPack.zip">Ресурс-пак</a>
        </div>

        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/info.svg">
            Если вы хотите, чтобы на сервер был
            добавлен какой-либо предмет, то напишите об этом в <a style="
                color: #1881b7;
                text-decoration:none;
                transition: all 0.3s ease 0s;" href="https://discord.gg/Gwukdr8">Дискорд</a>
        </div>
        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/info.svg">
            Присутствует система рангов. Их вы получаете в /ranks после определенных достижений на сервере или же
            просто за время игры.
        </div>
        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/info.svg">
            Имеются роли <span style="color: rgb(1, 212, 133);">Cтража</span> <span
                style="color: rgb(1, 143, 212);">Оракла</span>
            и <span style="color: rgb(29, 190, 206);">Инквизитора</span>. Последнюю получить маловероятно, однако
            первые две вполне возможно, если вы <span style="color: #52c211;">Гражданин</span> или выше.
        </div>
        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/info.svg">
            Присутствует система законов,за нарушение которых полагается соответствующая кара.
        </div>
        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/info.svg">
            Если вы <span style="color: #52c211;">Гражданин</span> или выше, то можете загружать на сервер свои
            картинки через ImageMap. Подробнее в командах.
        </div>
        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/info.svg">
            Если вы <span style="color: #52c211;">Гражданин</span> или выше, то можете создавать свои кланы.
        </div>
        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/info.svg">
            Если вы <span style="color: #52c211;">Гражданин</span> или выше, то можете создавать свои регионы /rg
            claim.<br>
            Регионы спасут вас только от взрывов динамитов и т.д. Все игроки смогу ломать и ставить блоки в вашем
            регионе.
        </div>
        <div class="collapsible_empty">
            <img class="logo-image" style="width: 15px; height: auto; display: inline" src="img/info.svg">
            На сервере имеется внутриигровой магазин, где вы можете купить любой игровой предмет за внутриигровую
            валюту.
        </div>
    </div>




    <script type="text/javascript" src="js/main.js"></script>
</body>

</html>