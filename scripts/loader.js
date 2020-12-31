var conf = {
    lang : 'pl',
    text : {
        pl : {
            title : 'Biorytm',
            your_date: 'Podaj swoją datę urodzin',
            friend_date: 'Podaj datę urodzin innej osoby (opcjonalne)',
            calculate: 'Oblicz',

            strYourBiorhythm : 'Twój biorytm na dziś',
            yourDaysOfLive : 'Dni jakie przeżyłeś/aś',
            yourPhysical : 'Biorytm fizyczny',
            yourEmotional : 'Biorytm emocjonalny',
            yourIntellectual : 'Biorytm intelektualny',
            yourAverage : 'Biorytm (średnia)',

            strCompatibility : 'Biopowinowactwo',
            diffDays : 'Rożnicza dni między Wami',
            compatibilityPhysical : 'Biopowinowactwo fizyczne',
            compatibilityEmotional : 'Biopowinowactwo emocjonalne',
            compatibilityIntellectual : 'Biopowinowactwo intelektualne',
            compatibilityAverage : 'Biopowinowactwo (średnia)'
        },
        en : {
            title : 'Biorhythm',
            your_date: 'Enter your date of birth',
            friend_date: 'Enter someone birthday (optional)',
            calculate: 'Calculate',

            strYourBiorhythm : 'Your biorhythm for today',
            yourDaysOfLive: 'Days you have lived',
            yourPhysical: 'Physical biorhythm',
            yourEmotional: 'Emotional biorhythm',
            yourIntellectual: 'Intellectual biorhythm',
            yourAverage: 'Biorhythm (average)',

            strCompatibility : 'Partner compatibility',
            diffDays: 'Differential days between you',
            compatibilityPhysical: 'Physical compatibility',
            compatibilityEmotional: 'Emotional compatibility',
            compatibilityIntellectual: 'Intellectual compatibility',
            compatibilityAverage: 'Partner compatibility (average)'
        }
    },
};

window.addEventListener("load", function() {
    if(typeof  lang !==  'undefined' ){
        conf.lang =  lang;
    }

    display.initialize( conf );

}, false);
