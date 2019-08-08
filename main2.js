$( document ).ready(function() {

  var inc = 1;

  var votoMovie = "";


  function tutto(){

        var valore = $(".cerca").val();

        var word = "&query=" + valore;


        var urlMovie = "https://api.themoviedb.org/3/search/movie?api_key=085f025c352f6e30faea971db0667d31"+word+pagNum ;
        var urlSerie = "https://api.themoviedb.org/3/search/tv?api_key=085f025c352f6e30faea971db0667d31"+word ;


        var pagNum = "&page=" + inc;
        console.log("numero pagina",pagNum);
        $(".page").text(inc);



        var settings = {
          async: true,
          crossDomain: true,
          url: urlMovie,
          method: "GET",
          headers: {},
          data: "{}"
        }


        function chiamataFilm(){
          $.ajax(settings).done(function (response) {
            // console.log("oggetto response",response.results);
            console.log("oggetto response film",response);


            for (var i = 0; i < response.results.length; i++) {
              // console.log("singolo film",response.results[i]);

              //creo variabili riferimento per handlebars
              var titoloMovie = response.results[i].title;
              var titoloMovie = response.results[i].original_title;
              var titoloOriginaleMovie = response.results[i].original_title;
              var linguaMovie = response.results[i].original_language;
              var posterMovie = response.results[i].poster_path;


              //prende il voto lo divide a metà lo arrotonda e me lo restituisce intero
              //per ogni film
              votoMovie = response.results[i].vote_average;
              //numero di stelle inserire
              var numStelle = Math.round(votoMovie / 2);
              // console.log("N stelle: ",numStelle);

              //fare funzione per non ripetersi
              //trama
              var tramaMovie = response.results[i].overview;
              var incipit = tramaMovie.length;
              console.log("lunghezza trama",incipit);
              if (incipit > 60) {
                tramaMovie = tramaMovie.slice(0, 80) + "...";
              }


              var urlImg = "https://image.tmdb.org/t/p/w342"+posterMovie;

              //fare funzione per non ripetersi
              if (posterMovie == null) {
                var urlImg = "error.jpg"
              }



              //template handelbars
              var sorgenteCodice = $("#dataBase").html();

              var template = Handlebars.compile(sorgenteCodice);

              //richiamo le variabili definite
              var daInserire = {
                titoloFilm: titoloMovie,
                titoloOriginale: titoloMovie,
                lingua: linguaMovie,
                voto :  numStelle,
                poster : urlImg,
                trama : tramaMovie

               };

              var html = template(daInserire);

              $(".container").append(html);
              //fine templating handlebars


            }//fine ciclo for oggetti





            $(".rate").each(
              function(){
                var num = $(this).attr("data-numero");
                var diff = 5 - num;
                for (var i = 0; i < num; i++) {
                  $(this).append('<i class="fa fa-star" aria-hidden="true"></i>')
                }
                for (var i = 0; i < diff; i++) {
                  $(this).append('<i class="fa fa-star-o" aria-hidden="true"></i>')
                }
                if (num == 0) {
                  $(this).text("0")
                }
              }
            )

            $(".lang").each(
              function(){
                var linguaggio = $(this).attr("data-lingua");
                //casi bandiera in base lingua
                switch (linguaggio) {
                  case "en":
                    $(this).html("<img src='flags/en.png' width='25px'>")
                    break;
                  case "ja":
                    $(this).html("<img src='flags/ja.png' width='25px'>")
                    break;
                  case "de":
                    $(this).html("<img src='flags/de.png' width='25px'>")
                    break;
                  case "fr":
                    $(this).html("<img src='flags/fr.png' width='25px'>")
                    break;
                  case "ru":
                    $(this).html("<img src='flags/ru.png' width='25px'>")
                    break;
                  default:
                    $(this).html("boooooh")
                }

              })

          })

              console.log("CHIAMATA FILM");

        }


        //facciola la chiamata
        chiamataFilm();

        var settings = {
          async: true,
          crossDomain: true,
          url: urlSerie,
          method: "GET",
          headers: {},
          data: "{}"
        }

        chiamataFilm();


        // pulisco il campo dell input
        // $(".cerca").val("");
        //pulisco il contenitore quando rifaccio la chiamata non si accavallano il risultato vecchio con quello nuovo
        $(".container").empty();


  }//fine funzione tutto


  $(".btn-search").click(
    function(){
      inc = 1;
      tutto()
    }
  )


  $('input').keydown(function(e){

    var tasto = e.which;
    if (tasto == 13) {
      inc = 1;
      tutto()
      }
    })


    $(".next").click(
      function(){
        inc = inc+1;
        $(".container").empty();
        tutto()
      }
    )

    $(".prev").click(
      function(){
        if (inc > 1) {
          inc = inc-1;
          $(".container").empty();
          tutto()
        }

      }
    )




});
