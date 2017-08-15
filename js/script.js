$(document).ready(function () {
    if (navigator.geolocation) {

        var longitude = "";
        var latitude = "";

        function success(pos) {
            longitude = pos.coords.longitude;
            latitude = pos.coords.latitude;

            callAPI();
        };

        function error(err) {
            console.warn(`Error accessing your position:(${err.code}): ${err.message}
                Unable to determine weather.`);
        };
        navigator.geolocation.getCurrentPosition(success, error);
    };

    var fccAPI = "https://fcc-weather-api.glitch.me/";

    function urlBuilder() {
        return fccAPI + "api/current?lon=" +
            longitude + "&lat=" + latitude;
    }

    function callAPI() {
        $.ajax({
            dataType: "json",
            url: urlBuilder(),
            success: function (result) {
                $(".load").hide();
                $(".loaded, .degree").show();
                $(".city").text(result.name).append(", " + result.sys.country);
                $(".temp").text(convert(result.main.temp));
                $(".description").text(
                    firstLetterUpper(result.weather[0].description));
                setIcon(result.weather[0].icon);
            }
        });
    }

    function setIcon(url) {
        $('.weatherIcon').attr("src", url);
    }

    function firstLetterUpper(text) {
        return text.split(" ").map(function (val) {
            return val.charAt(0).toUpperCase() + val.slice(1);
        }).join(" ");
    }

    $('#toggle').on('click', function () {
        var temp = $('.temp').text();
        var deg = $('.degree');
        var tempSelector = $('.temp');
        tempSelector.text(convert(parseInt(temp)));
        if (deg.text() == 'F') {
            deg.text('C');
        } else { deg.text('F') }
    });
    var tog = true;

    function convert(temp) {

        if (tog) {
            tog = false;
            return Math.floor((temp * 9 / 5) + 32);
        } else {
            tog = true;
            return Math.round((temp - 32) * (5 / 9));
        }
    }

})

// function vehicle(arg){
//   $("body").css("background-image", "url(../img/car.png)");
// };