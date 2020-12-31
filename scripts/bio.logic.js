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

        //var tomorrow = new Date();
        //tomorrow.setDate(tomorrow.getDate() + 1);
        //var test = Math.sign( ( (new Date()).getTime() - tomorrow.getTime() ) / (24 * 60 * 60 * 1000) +5 );
        //console.log(test);

        // hours  minutes  seconds  milliseconds
        var firstDaysOfLive = Math.round(Math.abs( firstDate.getTime() - (new Date()).getTime() ) / (24 * 60 * 60 * 1000));
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (24 * 60 * 60 * 1000)));
        var compatibilityPhysical = Math.round(100 * Math.abs(Math.cos(Math.PI * diffDays / 23)));
        var compatibilityEmotional = Math.round(100 * Math.abs(Math.cos(Math.PI * diffDays / 28)));
        var compatibilityIntellectual = Math.round(100 * Math.abs(Math.cos(Math.PI * diffDays / 33)));

        var physical = Math.sin(2 * Math.PI * firstDaysOfLive / 23);
        var emotional = Math.sin(2 * Math.PI * firstDaysOfLive / 28);
        var intellectual = Math.sin(2 * Math.PI * firstDaysOfLive /33);
        var average =(physical + emotional + intellectual) / 3;

        var physicalTomorrow = Math.sin(2 * Math.PI * (firstDaysOfLive + 1) / 23);
        var emotionalTomorrow = Math.sin(2 * Math.PI * (firstDaysOfLive + 1) / 28);
        var intellectualTomorrow = Math.sin(2 * Math.PI * (firstDaysOfLive + 1) /33);
        var averageTomorrow = (physicalTomorrow + emotionalTomorrow + intellectualTomorrow) / 3;

        var physicalSign =  ((physicalTomorrow - physical) < 0) ? '-' : '+';
        var emotionalSign = ((emotionalTomorrow - emotional) < 0)  ? '-' : '+';
        var intellectualSign = ((intellectualTomorrow - intellectual) < 0)  ? '-' : '+';
        var averageSign = ((averageTomorrow - average) < 0 ) ? '-' : '+';

        //console.log("p="+physical+"  e="+emotional+" i="+intellectual);

        return {
            'yourDaysOfLive' : firstDaysOfLive,
            'yourPhysical' : Math.round(physical * 100) + "% (" + physicalSign + ")",
            'yourEmotional' : Math.round(emotional * 100) + "% (" + emotionalSign + ")",
            'yourIntellectual' : Math.round(intellectual * 100) + "% (" + intellectualSign + ")",
            'yourAverage' : Math.round( average * 100 ) + "% (" + averageSign + ")" ,
            'diffDays' : diffDays,
            'compatibilityPhysical' : compatibilityPhysical + "% ",
            'compatibilityEmotional' : compatibilityEmotional + "% ",
            'compatibilityIntellectual' : compatibilityIntellectual + "% ",
            'compatibilityAverage' : Math.round((compatibilityPhysical + compatibilityEmotional + compatibilityIntellectual) / 3) + "% "
        }
    }

    return {
        getResult : getResult,
        init : init
    };

})();
