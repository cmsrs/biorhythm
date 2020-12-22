logic = (function() {
    var conf;

    function init( conf ){
        conf = conf
    }

    function getResult(d){

        var firstDate = new Date(
            d.yyyy,
            d.mm - 1,
            d.dd
        );

        var secondDate = new Date(
            d.yyyy2,
            d.mm2 - 1,
            d.dd2
        );

        // hours  minutes  seconds  milliseconds
        var firstDaysOfLive = Math.round(Math.abs(firstDate.getTime() / (24 * 60 * 60 * 1000)));
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (24 * 60 * 60 * 1000)));
        var compatibilityPhysical = Math.round(100 * Math.abs(Math.cos(Math.PI * diffDays / 23)));
        var compatibilityEmotional = Math.round(100 * Math.abs(Math.cos(Math.PI * diffDays / 28)));
        var compatibilityIntellectual = Math.round(100 * Math.abs(Math.cos(Math.PI * diffDays / 33)));

        var physical = Math.sin(2 * Math.PI * firstDaysOfLive / 23);
        var emotional = Math.sin(2 * Math.PI * firstDaysOfLive / 28);
        var intellectual = Math.sin(2 * Math.PI * firstDaysOfLive /33);

        return {
            'yourDaysOfLive' : firstDaysOfLive,
            'yourPhysical' : Math.round(physical * 100),
            'yourEmotional' : Math.round(emotional * 100),
            'yourIntellectual' : Math.round(intellectual * 100),
            'yourAverage' : Math.round( ((physical + emotional + intellectual) / 3) * 100 ),
            'diffDays' : diffDays,
            'compatibilityPhysical' : compatibilityPhysical,
            'compatibilityEmotional' : compatibilityEmotional,
            'compatibilityIntellectual' : compatibilityIntellectual,
            'compatibilityAverage' : Math.round((compatibilityPhysical + compatibilityEmotional + compatibilityIntellectual) / 3)
        }
    }

    return {
        getResult : getResult,
        init : init
    };

})();
