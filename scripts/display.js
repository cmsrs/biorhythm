display = (function() {

    function initialize( conf ){
        logic.init( conf );
        setup( conf );
        appendDateOptions();
        document.getElementById('submit').addEventListener("click",  clickSubmit, false);
    }

    function clickSubmit(e) {
        e.preventDefault();

        var dataIn = {
          'dd' : parseInt(document.getElementById('dd').value),
          'dd2' : parseInt(document.getElementById('dd2').value),
          'mm' : parseInt(document.getElementById('mm').value),
          'mm2' : parseInt(document.getElementById('mm2').value),
          'yyyy' : parseInt(document.getElementById('yyyy').value),
          'yyyy2' : parseInt(document.getElementById('yyyy2').value)
        };

        localStorage.setItem('bio_date_in',  JSON.stringify(dataIn));

        var dataOut = logic.getResult(dataIn);
        //console.log(dataOut);

        var result = document.getElementById('result');
        result.innerHTML = '';

        for (const prop in dataOut) {
            //var pocent = (( prop === 'yourDaysOfLive' ) || ( prop === 'diffDays' )) ? '' : '%';
            var iDiv = document.createElement('div');
            iDiv.id = prop;
            iDiv.className = 'info';
            iDiv.textContent = conf.text[conf.lang][prop] + ' : ' + dataOut[prop]; // + pocent;
            result.appendChild(iDiv);

            if(prop === 'yourDaysOfLive'){
                var descDiv1 = document.createElement('div');
                descDiv1.className = 'info_bold';
                descDiv1.textContent = conf.text[conf.lang].strYourBiorhythm;
                result.appendChild(descDiv1);
            }
            if(prop === 'yourAverage'){
                var descDiv2 = document.createElement('div');
                descDiv2.className = 'info_bold';
                descDiv2.textContent = conf.text[conf.lang].strCompatibility;
                result.appendChild(descDiv2);
            }
        }

        var dataChart = logic.getDateToChart(dataIn);
        drawChart(dataChart);
    }

    function drawChart(dataChart) {
        //console.log(dataChart);
        var dataE = [];
        var dataI = [];
        var dataP = [];
        var labels = [];

        for (const i in  dataChart){
          dataE.push( dataChart[i].emotional);
          dataI.push( dataChart[i].intellectual);
          dataP.push( dataChart[i].physical);
          labels.push( dataChart[i].formatDate);
        }


        var config = {
    			type: 'line',
    			data: {
    				labels: labels,
    				datasets: [{
    					label: 'Emotional',
    					backgroundColor: window.chartColors.red,
    					borderColor: window.chartColors.red,
    					data: dataE,
    					fill: false,
    				}, {
    					label: 'Intellectual',
    					backgroundColor: window.chartColors.blue,
    					borderColor: window.chartColors.blue,
    					data: dataI,
    					fill: false,
            }, {
    					label: 'Physical',
    					backgroundColor: window.chartColors.green,
    					borderColor: window.chartColors.green,
    					data: dataP,
    					fill: false,

    				}]
    			},
    			options: {
    				responsive: true,
    				plugins: {
    					title: {
    						display: true,
    						text: 'Chart.js Line Chart'
    					},
    					tooltip: {
    						mode: 'index',
    						intersect: false,
    					}
    				},
    				hover: {
    					mode: 'nearest',
    					intersect: true
    				},
    				scales: {
    					x: {
    						display: true,
    						scaleLabel: {
    							display: true,
    							labelString: 'Month'
    						}
    					},
    					y: {
    						display: true,
    						scaleLabel: {
    							display: true,
    							labelString: 'Value'
    						}
    					}
    				}
    			}
    		};

        var ctx = document.getElementById('canvas').getContext('2d');
        window.myLine = new Chart(ctx, config);

    }

    function setup( conf ) {
        var el_h1 =  document.getElementsByTagName('h1');
        if( el_h1.length  ){
            el_h1[0].textContent = conf.text[conf.lang].title;
        }

        document.getElementById('your_date').textContent = conf.text[conf.lang].your_date;
        document.getElementById('friend_date').textContent = conf.text[conf.lang].friend_date;
        document.getElementById('submit').value = conf.text[conf.lang].calculate;
    }

    function appendDateOptions() {
        var days = [];
        var months = [];
        var years = [];

        var bioDateIn = JSON.parse(localStorage.getItem('bio_date_in'));

        var dd = document.getElementById('dd');
        var dd2 = document.getElementById('dd2');

        var mm = document.getElementById('mm');
        var mm2 = document.getElementById('mm2');

        var yyyy = document.getElementById('yyyy');
        var yyyy2 = document.getElementById('yyyy2');

        for (var i = 1; i <= 31; i++) {
            dd.options[dd.options.length] = new Option(i, i, true, (( bioDateIn && (bioDateIn.dd === i) ) ? true : false));
            dd2.options[dd2.options.length] = new Option(i, i, true, (( bioDateIn && (bioDateIn.dd2 === i) ) ? true : false));

            if (i <= 12) {
              mm.options[mm.options.length] = new Option(i, i, true, (( bioDateIn && (bioDateIn.mm === i) ) ? true : false));
              mm2.options[mm2.options.length] = new Option(i, i, true, (( bioDateIn && (bioDateIn.mm2 === i) ) ? true : false));
            }
        }

        var yearStart = (new Date()).getFullYear();
        for (var ii = yearStart; ii >= 1920; ii--) {
          yyyy.options[yyyy.options.length] = new Option(ii, ii, true, (( bioDateIn && (bioDateIn.yyyy === ii) ) ? true : false) );
          yyyy2.options[yyyy2.options.length] = new Option(ii, ii, true, (( bioDateIn && (bioDateIn.yyyy2 === ii) ) ? true : false) );
        }
    }

    return {
        initialize : initialize
    }
})();
