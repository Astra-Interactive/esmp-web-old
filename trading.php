<?php
include_once 'dbh.inc.php';
?>
<?php
function foo($db_name, $conn, $sql)
{
    $sql = "SELECT * FROM " . $db_name;
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);
    $data = '';
    $time = '';
    $colors = '';
    if ($resultCheck > 0) {
        $oldVal = 0;
        while ($row = mysqli_fetch_assoc($result)) {
            $data .= $row['curr_value'] . ", ";
            $time .= "'" . gmdate('m.d H:i:s', $row['curr_time']) . "', ";
            if ($row['curr_value'] >= $oldVal)
                $colors .= "'rgba(13, 184, 59, 1)', ";
            else
                $colors .= "'rgba(184, 13, 33, 1)', ";
            $oldVal = $row['curr_value'];
        }


        $data = substr($data, 0, -2);
        $colors = substr($colors, 0, -2);
        $time = substr($time, 0, -2);
    }
    return array($data, $colors, $time);
}
$db_name = "pewdie_coin";
list($data, $colors, $time) = foo($db_name, $conn, $sql);
?>










<!DOCTYPE html>

<head>
    <link rel="icon" href="img/ferris_logo.png" />

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Трейды</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/law.css">
    <link rel="stylesheet" href="css/header.css?ver=2">
    <link rel="stylesheet" href="css/create_item.css">
    <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@700&display=swap" rel="stylesheet"> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Alegreya+SC&display=swap" rel="stylesheet"> 
</head>
<style>
    .logo-image:hover,
    .li-laws:hover>.logo-image {
        transition: all 0.3s ease 0s;
        filter: drop-shadow(0px 0px 10px #6f18b7);
        scale: 1.1;
    }
</style>

<body>
    <header style="
    filter: drop-shadow(0px 0px 8px #6f18b7);">
        <a class="logo" href=".."><img src="img/BANER_TRANS_FERRIS.png" alt="logo"></a>
        <nav>
            <ul class="nav__links">
                <li class="dropdown">
                    <a href="#">Информация</a>
                    <div class="dropdown-content">
                        <a href="..">Главная</a>
                        <a href="rules">Правила</a>
                        <a href="law">Законы</a>
                        <a href="commands">Команды</a>
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

                <li><a href="donate">Донат</a></li>
                <li><a href="https://discord.gg/Gwukdr8">Дискорд</a></li>
                <li><a href="https://vk.com/empireprojekt">ВК</a></li>

<li class="dropdown">
    <a id="resource_pack_version" href="#">Ресур-пак 1.1</a>
    <div class="dropdown-content">
        <a href="files/EmpireProjektPack.zip">Полная версия</a>
        <a href="files/EmpireProjektPack_Light.zip">Легкая версия(без звуков)</a>
    </div>
</li>
            </ul>
        </nav>
    </header>

    <div style="
    width: 95%;
    background-color:#181818;
    margin-left: auto;
    margin-right: auto;
    ">
        <p style="font-family: 'Russo One', sans-serif;
font-weight: 500;
font-size: 30px;
color: #edf0f1;
text-decoration: none;
background-color:#6f18b7;
padding:5px;
text-align: center;
margin-top: 30px;
">Доступные трейды</p>


        <ul style="padding:30px;">
            <li style="font-size: 25px; list-style: none;text-align: center;" class="li-laws">
                <input type="text" id="amount" value="" readonly style="text-align:center;width:100%;border:0;font-size:20px; background-color:#181818; color:#f6931f; font-weight:bold;">

                <br><br>
                <div id="slider-range"></div>
                <br><br>
                <select name="pets" onchange="tradingOnChange(this.value)" id="material">
                    <option value="">Выберите валюту</option>
                    <option value="schlatt_coin">Schlatt Coin</option>
                    <option value="pewdie_coin">Pewdie Coin</option>
                </select>
                <br>
                <select name="pets" id="graph_type" onchange="graphOnChange(this.value)" id="material">
                    <option value="line">Линейный график</option>
                    <option value="bar">Прямоугольники</option>
                </select>
            </li>
        </ul>
        <canvas id="myChart" width="300" height="100"></canvas>

    </div>




    <script>
        function graphOnChange(value) {
            myChart.destroy();
            graph_type = value;
            renderGraph();
        }

        function tradingOnChange(value) {
            window.location.href = "?item=" + value;
            <?php
            $db_name =  $_GET["item"];
            list($data, $colors, $time) = foo($db_name, $conn, $sql); ?>
            renderGraph();
        }

        data_default_values = [<?php echo $data; ?>];
        data_default_time = [<?php echo $time; ?>];
        data_default_colors = [<?php echo $colors; ?>]

        data_colors = [<?php echo $colors; ?>];
        data_time = [<?php echo $time; ?>];
        data_values = [<?php echo $data; ?>];

        if (data_default_values.length > 50) {
            begin = data_time.length - 50;
            end = data_time.length - 1;
            data_time = data_default_time.slice(begin, end)
            data_values = data_default_values.slice(begin, end)
            data_colors = data_default_colors.slice(begin, end)
        }

        graph_type = "line";
        graph_type = $("#graph_type").val();
        var myChart;
        renderGraph();

        function renderGraph() {
            var ctx = document.getElementById('myChart').getContext('2d');

            myChart = new Chart(ctx, {
                type: graph_type,
                data: {
                    labels: data_time,
                    borderColor: "#fffff",
                    datasets: [{
                        label: <?php echo "'" . $db_name . "'" ?>,
                        data: data_values,
                        borderColor: "#fff",
                        backgroundColor: data_colors,
                        pointBackgroundColor: data_colors,
                        pointBorderColor: data_colors,
                        pointHoverBackgroundColor: 'rgb(26, 117, 201,1)',
                        hoverBackgroundColor: 'rgb(26, 117, 201,1)',
                        hoverBorderColor: data_colors,
                        hoverBorderWidth: 2,
                        lineTension: 0,
                        fill: false,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "#888",
                            },
                            gridLines: {
                                color: "#555",
                                zeroLineColor: "#555"
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "#888"
                            },
                            gridLines: {
                                color: "#555"
                            }
                        }]
                    },
                    chartArea: {
                        backgroundColor: 'rgba(251, 85, 85, 0.4)'
                    },
                    elements: {
                        line: {
                            tension: 0
                        }
                    },
                    bezierCurve: false
                }
            });
        }
    </script>
    <script>
        $(function() {
            $("#slider-range").slider({
                range: true,
                min: 0,
                max: data_default_values.length - 1,
                values: [data_default_values.length-data_values.length, data_default_values.length - 1],
                slide: function(event, ui) {

                    begin = $("#slider-range").slider("values", 0)
                    end = $("#slider-range").slider("values", 1)
                    $("#amount").val(data_default_time[begin] + " - " + data_default_time[end]);
                    myChart.destroy();
                    data_time = data_default_time.slice(begin, end)
                    data_values = data_default_values.slice(begin, end)
                    data_colors = data_default_colors.slice(begin, end)
                    renderGraph();
                }
            });
            $("#amount").val("" + data_default_time[$("#slider-range").slider("values", 0)] + " - " + data_default_time[$("#slider-range").slider("values", 1)]);
            if (data_default_time[$("#slider-range").slider("values", 0)] == undefined)
                $("#amount").val("Выберите валюту");
        });
    </script>
    <script type="text/javascript" src="js/main.js"></script>
</body>

</html>