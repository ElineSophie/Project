var globaldata = []
var glob = []

var selected_year = 2009

window.onload = function loadData(){

      // Load in data
    var requests = [d3v5.json("../../data/netherlands/nld.json"),
    d3v5.json("../../data/netherlands/map.json"),
    d3v5.json("../../data/netherlands/datanetherlands.json"),
    d3v5.json("../../data/netherlands/prognose.json"),
    d3v5.json("../../data/netherlands/jaarverdeling.json")];
    Promise.all(requests).then(function(res) {

      dataMaps(res[0], res[1], res[3], res[4])
      //
      keys = Object.keys(res[2])
      values = Object.values(res[2])

      globaldata.push(res[2]);
      globaldata.push(res[1]);
        // updateMap();

      // Remove netherlands in dataset
      for (d in res[2]){
          res[2][d].shift();
        };

      initScatter(res[2]["2009"]);

      d3v5.select("#Gender1").on("change", function(d){
        if("Totaal aantal lopend" == this.value){
          var select = document.getElementById("AgeTot");
          select.className = "show";
          var hide1 = document.getElementById("AgeMen");
          hide1.className = "hide";
          var hide2 = document.getElementById("AgeWomen");
          hide2.className = "hide";
        }
        else if ("Totaal aantal mannen lopend" == this.value){
          var select = document.getElementById("AgeMen");
          select.className = "show"
          var hide1 = document.getElementById("AgeTot");
          hide1.className = "hide";
          var hide2 = document.getElementById("AgeWomen");
          hide2.className = "hide";
        }
        else if ("Totaal aantal vrouwen lopend" == this.value){
          var select = document.getElementById("AgeWomen");
          select.className = "show"
          var hide1 = document.getElementById("AgeTot");
          hide1.className = "hide";
          var hide2 = document.getElementById("AgeMen");
          hide2.className = "hide";
        }
      })

      d3v5.select("#Gender2").on("change", function(d){
        if("Totaal aantal gesloten" == this.value){
          var select = document.getElementById("AgeTot");
          select.className = "show";
          var hide1 = document.getElementById("AgeMen");
          hide1.className = "hide";
          var hide2 = document.getElementById("AgeWomen");
          hide2.className = "hide";
        }
        else if ("Totaal aantal mannen gesloten" == this.value){
          var select = document.getElementById("AgeMen");
          select.className = "show"
          var hide1 = document.getElementById("AgeTot");
          hide1.className = "hide";
          var hide2 = document.getElementById("AgeWomen");
          hide2.className = "hide";
        }
        else if ("Totaal aantal vrouwen gesloten" == this.value){
          var select = document.getElementById("AgeWomen");
          select.className = "show"
          var hide1 = document.getElementById("AgeTot");
          hide1.className = "hide";
          var hide2 = document.getElementById("AgeMen");
          hide2.className = "hide";
        }
      })

      d3v5.select("#ChoiceName").on("click", function(d){

      })

        console.log(document.getElementById("Gender1").value);

      d3v5.select("#year")
          .on("change", function(d){
            var gender;
            if (document.getElementById("r1").checked){
              gender = document.getElementById("Gender1").value;
            }
            else if (document.getElementById("r2").checked){
              gender = document.getElementById("Gender2").value;
            }
            var age;
            if (document.getElementById("Gender1").value == "Totaal aantal lopend"){
              age = document.getElementById("AgeTot").value;
            }
            else if (document.getElementById("Gender1").value == "Totaal aantal mannen lopend"){
              age = document.getElementById("AgeMen").value;
            }
            else if (document.getElementById("Gender1").value == "Totaal aantal vrouwen lopend"){
              age = document.getElementById("AgeWomen").value;
            }
            else if (document.getElementById("Gender2").value == "Totaal aantal gesloten"){
              age = document.getElementById("AgeTot").value;
            }
            else if (document.getElementById("Gender2").value == "Totaal aantal mannen gesloten"){
              age = document.getElementById("AgeMen").value;
            }
            else if (document.getElementById("Gender2").value == "Totaal aantal vrouwen gesloten"){
              age = document.getElementById("AgeWomen").value;
            };

            updateScatter(this.value, gender, age);
            updateMap(this.value);
            updatePie(this.value, res[4]);
          });

      initLine(res[3]);

      initPiechart(res[4]["2009"]);

  }).catch(function(e){
      throw(e);
      });

};
