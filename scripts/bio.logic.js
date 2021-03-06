logic = (function() {
    var conf;
    var start;
    var stop;
    var no;

    function init( conf ){
        conf = conf
        no = conf.action.no;
    }

    function getBio(daysOfLive){
      return {
        'physical' : Math.sin(2 * Math.PI * daysOfLive / 23),
        'emotional' : Math.sin(2 * Math.PI * daysOfLive / 28),
        'intellectual' : Math.sin(2 * Math.PI * daysOfLive /33)
      }
    }

    function getDaysOfLive(firstDate){
       return Math.round(Math.abs( firstDate.getTime() - (new Date()).getTime() ) / (24 * 60 * 60 * 1000));
    }

    function formatDateIn(d) {
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        //return [year, month, day].join('-');
        return [day, month].join('-');
    }

    function getDateToChart(d){
      var firstDate = new Date(
          d.yyyy,
          d.mm - 1,
          d.dd
      );
      var firstDaysOfLiveIn = getDaysOfLive(firstDate);

      var out = [];
      for(var i = -1*no; i <= no; i++ ){
        var daysOfLiveIn = firstDaysOfLiveIn + i;

        var d = new Date();
        d.setDate( d.getDate() + i);
        var bio = getBio(daysOfLiveIn);
        //console.log(daysOfLiveIn);
        //console.log(bio);

        var formatDate = formatDateIn(d);
        var values = {
          'formatDate' : (i === 0) ?  '---'+formatDate+'---' : formatDate,
          'physical' : Math.round(bio.physical * 100),
          'emotional' : Math.round(bio.emotional * 100),
          'intellectual' : Math.round(bio.intellectual * 100)
        }
        out.push(values);
      }
      return out;
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
        var firstDaysOfLive = getDaysOfLive(firstDate);
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (24 * 60 * 60 * 1000)));
        var compatibilityPhysical = Math.round(100 * Math.abs(Math.cos(Math.PI * diffDays / 23)));
        var compatibilityEmotional = Math.round(100 * Math.abs(Math.cos(Math.PI * diffDays / 28)));
        var compatibilityIntellectual = Math.round(100 * Math.abs(Math.cos(Math.PI * diffDays / 33)));

        var bio = getBio(firstDaysOfLive);
        var physical = bio.physical;
        var emotional = bio.emotional;
        var intellectual = bio.intellectual;

        var average =(physical + emotional + intellectual) / 3;

        var physicalTomorrow = Math.sin(2 * Math.PI * (firstDaysOfLive + 1) / 23);
        var emotionalTomorrow = Math.sin(2 * Math.PI * (firstDaysOfLive + 1) / 28);
        var intellectualTomorrow = Math.sin(2 * Math.PI * (firstDaysOfLive + 1) /33);
        var averageTomorrow = (physicalTomorrow + emotionalTomorrow + intellectualTomorrow) / 3;

        var physicalSign =  Math.sign(physicalTomorrow - physical);
        var emotionalSign = Math.sign(emotionalTomorrow - emotional);
        var intellectualSign = Math.sign(intellectualTomorrow - intellectual);
        var averageSign = Math.sign(averageTomorrow - average);

        //console.log("p="+physical+"  e="+emotional+" i="+intellectual);

        return {
            'yourDaysOfLive' : firstDaysOfLive,
            'yourPhysical' : Math.round(physical * 100) + "%",
            'yourEmotional' : Math.round(emotional * 100) + "%",
            'yourIntellectual' : Math.round(intellectual * 100) + "%",
            'yourAverage' : Math.round( average * 100 ) + "%",

            'physicalSign' :  physicalSign,
            'emotionalSign' : emotionalSign,
            'intellectualSign' : intellectualSign,
            'averageSign' : averageSign,

            'diffDays' : diffDays,
            'compatibilityPhysical' : compatibilityPhysical + "%",
            'compatibilityEmotional' : compatibilityEmotional + "%",
            'compatibilityIntellectual' : compatibilityIntellectual + "%",
            'compatibilityAverage' : Math.round((compatibilityPhysical + compatibilityEmotional + compatibilityIntellectual) / 3) + "%"
        }
    }

    return {
        getResult : getResult,
        getDateToChart: getDateToChart,
        init : init
    };

})();
