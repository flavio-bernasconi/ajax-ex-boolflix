$( document ).ready(function() {

  var inc = 1;
  var stagSerie = 1;
  var votoMovie = "";
  var numeroFilmChiamti = 20;


  //funzione che richiama film e serie tv quando cerco
  function searchFilm(){
    var valore = $(".cerca").val();

    var word = "&query=" + valore;

    var pagNum = "&page=" + inc;
    $(".page").text(inc);


    //setting chiamta film quando cerco
    var urlMovie = "https://api.themoviedb.org/3/search/movie?api_key=085f025c352f6e30faea971db0667d31"+word+pagNum ;

    function chiamataFilm(){
      $.ajax({ url: urlMovie }).done(function (response) {
        console.log("oggetto response film",response);
        //contenitore dove incollo il template handlebars

        for (var i = 0; i < response.results.length; i++) {
          var infoMovie = response.results[i];

          //creo variabili riferimento per handlebars
          var titoloMovie = infoMovie.title;
          var titoloMovie = infoMovie.original_title;
          var titoloOriginaleMovie = infoMovie.original_title;
          var linguaMovie = infoMovie.original_language;
          var posterMovie = infoMovie.poster_path;
          var genre = infoMovie.genre_ids;
          var tipo = "movie";

          //prende il voto lo divide a metà lo arrotonda e me lo restituisce intero
          //per ogni film
          votoMovie = infoMovie.vote_average;
          //numero di stelle inserire
          var numStelle = Math.round(votoMovie / 2);

          //fare funzione per non ripetersi
          //trama
          var tramaMovie = infoMovie.overview;
          var incipit = tramaMovie.length;
          if (incipit > 60) {
            tramaMovie = tramaMovie.slice(0, 80) + "...";
          }

          var urlImg = "https://image.tmdb.org/t/p/w342"+posterMovie;

          //fare funzione per non ripetersi
          if (posterMovie == null) {
            var urlImg = "errore.jpg"
          }

          //template handelbars
          var sorgenteCodice = $("#dataBase").html();

          var template = Handlebars.compile(sorgenteCodice);

          //richiamo le variabili definite
          var daInserire = {
            titoloFilm: titoloMovie,
            titoloOriginale: titoloOriginaleMovie,
            lingua: getLang(linguaMovie),
            voto :  numStelle,
            poster : urlImg,
            trama : tramaMovie,
            popolarita : genre,
            type : tipo

           };

          var html = template(daInserire);

          $(".container").append(html);
          //fine templating handlebars

        }//fine ciclo for oggetti

      })

      // filtra();


      console.log("CHIAMATA FILM");

    }

    //facciola la chiamata
    chiamataFilm();

    //SERIEEEEEEEE
    //setting chiamta serie quando cerco
    var urlSerie = "https://api.themoviedb.org/3/search/tv?api_key=085f025c352f6e30faea971db0667d31"+word+pagNum ;

    var settings = {
      url: urlSerie,
      method: "GET"
    }


    function chiamataSerie(){
      $.ajax(settings).done(function (response) {
        console.log("oggetto response serie",response);

        for (var i = 0; i < response.results.length; i++) {
          // console.log("singolo film",response.results[i]);
          var infoSerie = response.results[i];

          //creo variabili riferimento per handlebars
          var titoloSerie = infoSerie.name;
          var titoloMovie = infoSerie.original_name;
          var titoloOriginaleMovie = infoSerie.original_title;
          var linguaMovie = infoSerie.original_language;
          var posterMovie = infoSerie.poster_path;
          var genre = infoSerie.genre_ids;
          var tipo = "serie"


          //prende il voto lo divide a metà lo arrotonda e me lo restituisce intero
          //per ogni film
          votoMovie = infoSerie.vote_average;
          //numero di stelle inserire
          var numStelle = Math.round(votoMovie / 2);

          //fare funzione per non ripetersi
          //trama
          var tramaMovie = infoSerie.overview;
          var incipit = tramaMovie.length;
          if (incipit > 60) {
            tramaMovie = tramaMovie.slice(0, 80) + "...";
          }

          //fare funzione per non ripetersi
          var urlImg = "https://image.tmdb.org/t/p/w342"+posterMovie;

          //fare funzione per non ripetersi
          if (posterMovie == null) {
            var urlImg = "errore.jpg"
          }

          //template handelbars
          var sorgenteCodice = $("#dataBase").html();

          var template = Handlebars.compile(sorgenteCodice);

          //richiamo le variabili definite
          var daInserire = {
            titoloFilm: titoloSerie,
            titoloOriginale: titoloOriginaleMovie,
            lingua: getLang(linguaMovie),
            voto :  numStelle,
            poster : urlImg,
            trama : tramaMovie,
            popolarita : genre,
            type : tipo

           };

          var html = template(daInserire);

          $(".container").append(html);
          //fine templating handlebars



        }//fine ciclo for oggetti

        //per ogni span-voto prendo l attributo a cui ho assegnato il valore del voto preso dall api
        //ciclo per il numero presente nell attributo e incollo n stelle
        //

        //stelle icone punteggio valutazione
        daiVoto();

        filtra();


          console.log(" fine CHIAMATA SERIE");


      });
    }

    // metti la bandiera
    function getLang(lang){

      var availableFlag = [
        "it",
        "en",
        "ja",
        "ru",
        "fr",
        "de"

      ];

      var flag = "";
      if (availableFlag.includes(lang)) {
        flag = "<img src='flags/" + lang + ".png'>";
      }

      return flag;


    }

    chiamataSerie();

    //nascondo i bottoni next e prev pagine
    $("a.hide").removeClass("hide");

    //pulisco il contenitore quando rifaccio la chiamata non si accavallano il risultato vecchio con quello nuovo
    $(".container").empty();


  }


  //get generi e aggiungi alla scheda
  //generi film
  var genUri = "https://api.themoviedb.org/3/genre/movie/list?api_key=085f025c352f6e30faea971db0667d31";

  function generiMovie(){
      $.ajax({ url: genUri }).done(function (response) {

        console.log("cosa sei? movie",response);

        $("div[data-type='movie'] .genere").each(
          function(){
            var attributogenere = $(this).attr("data-genere");

            for (var i = 0; i < 19; i++) {
              if (attributogenere.includes(response.genres[i].id)) {
                $(this).append("<span>" + response.genres[i].name + "</span>")
              }
            }

          }
        )
      })
    }


  //generi serie tv
  var genUra = "https://api.themoviedb.org/3/genre/tv/list?api_key=085f025c352f6e30faea971db0667d31";

  function generiSerie(){
      $.ajax({ url: genUra }).done(function (response) {

        console.log("cosa sei? serie",response);

        $("div[data-type='serie'] .genere").each(
          function(){
            var attributogenere = $(this).attr("data-genere");

            for (var i = 0; i < 16; i++) {
              if (attributogenere.includes(response.genres[i].id)) {
                $(this).append("<span>" + response.genres[i].name + "</span>")
              }
            }

          }
        )
      })
    }



  function cerca(){
  //punto di partenza delle pagine (pag1)
  inc = 1;
  //nascondo lo slider
  //quando cerco li nascondo tutti quando ricarico la home li faccio vedere
  $(".contenitoreHome,.videoFilm").hide();
  //tolgo a tutti i btn filtri la classe attivo
  $("a.attivo").removeClass("attivo");
  //e la metto a il bottone tutti
  $("a.all").addClass("attivo");

  $(".btnFiltri").show();

  //poi faccio la chiamta
  searchFilm();

  generiMovie();
  generiSerie();

  }//fine funzione cerca


  //filtra per genere
  function filtra(){
  $(".filtro").click(
    function(){
      $(".filtro").removeClass("attivo");
      $(this).addClass("attivo");
      var genereScelto = $(this).attr("data-id");
      console.log( genereScelto);
      if (genereScelto == "tutti") {
        $("div.movieSingolo").show();
      }
      else {
        $(".genere").each(
          function(){
            $("div.movieSingolo").show();
            //array di numeri corrispondenti ad un genere
            var genere = $(this).attr("data-genere");
            if (!genere.includes(genereScelto)) {
              $(this).parent().closest('div.movieSingolo').hide(10); // this gets the parent classes.
            }

            }
          )
        }
      }
    )}



  //film singolo con scheda film al click
  var urlSingolo = "https://api.themoviedb.org/3/trending/tv/week?api_key=085f025c352f6e30faea971db0667d31";

    var settings = {
      url: urlSingolo,
      method: "GET",
      data: "{}"
    }
    //serie
    function chiamataSingolo(){
      $.ajax(settings).done(function (response) {
        // console.log("oggetto response",response.results);
        console.log("oggetto singolo serie",response);

        var index = 0;

        for (var i = 0; i < numeroFilmChiamti; i++) {
          // console.log("singolo film",response.results[i]);
          index = index + 1;

          //creo variabili riferimento per handlebars
          var titoloMovie = response.results[i].name;
          var linguaMovie = response.results[i].original_language;
          var posterMovie = response.results[i].poster_path;
          var genre = response.results[i].genre_ids;
          var back = response.results[i].backdrop_path;
          var target = response.results[i].id;
          var date = response.results[i].first_air_date;

          date = date.slice(0,4);

          //prende il voto lo divide a metà lo arrotonda e me lo restituisce intero
          //per ogni film
          votoMovie = response.results[i].vote_average;
          //numero di stelle inserire
          var numStelle = Math.round(votoMovie / 2);
          // console.log("N stelle: ",numStelle);

          //fare funzione per non ripetersi
          //trama
          var tramaMovie = response.results[i].overview;


          var urlImg = "https://image.tmdb.org/t/p/w342"+posterMovie;

          //fare funzione per non ripetersi
          if (posterMovie == null) {
            var urlImg = "errore.jpg"
          }

          //template handelbars
          var sorgenteCodice = $("#schedaFilmTemplate").html();

          var template = Handlebars.compile(sorgenteCodice);

          //richiamo le variabili definite
          var daInserire = {
            titoloFilm: titoloMovie,
            lingua: linguaMovie,
            voto :  numStelle,
            trama : tramaMovie,
            riconoscimento : target,
            rilascio:date,
            gen : genre
           };

          var html = template(daInserire);

          $(".primo > .schedaFilm > .full > .half").append(html);


          //template handelbars
          var sorgenteCodice = $("#scheda").html();

          var template = Handlebars.compile(sorgenteCodice);

          //richiamo le variabili definite
          var tipo = "serie"
          var daInserire = {
            sfondo : back,
            riconoscimento : target,
            poster : urlImg,
            indice : index,
            type : tipo

           };

          var html = template(daInserire);

          $(".primo .filmSingolo").append(html);
          //fine templating handlebars
        }//fine ciclo for oggetti

        //prendo attr data-index e assegno a quello con valore 1 la classe che
        // da il margine inistro
        //cosi il primo film enllo slider non e' al vivo
        $(".filmSingolo .movieSingolo").each(
          function(){
            var attr = $(this).attr('data-index');
            if (attr == 1) {
              $(this).addClass("margine")
            }
            if (attr == numeroFilmChiamti) {
              $(this).addClass("margine2")
            }

          }
        )


      })

    }

    //facciola la chiamata film singolo
    chiamataSingolo();

    var urlSingoloM = "https://api.themoviedb.org/3/trending/movie/week?api_key=085f025c352f6e30faea971db0667d31";

    var settings = { url: urlSingoloM }

    function chiamataSingoloM(){
      $.ajax(settings).done(function (response) {
        // console.log("oggetto response",response.results);
        console.log("oggetto singolo film",response);
        var index = 0;

        for (var i = 0; i < numeroFilmChiamti; i++) {
          // console.log("singolo film",response.results[i]);
          index = index + 1;

          //creo variabili riferimento per handlebars
          var titoloMovie = response.results[i].title;
          var linguaMovie = response.results[i].original_language;
          var posterMovie = response.results[i].poster_path;
          var genre = response.results[i].genre_ids;
          var back = response.results[i].backdrop_path;
          var date = response.results[i].release_date;
          var target = response.results[i].id;


          date = date.slice(0,4);


          //prende il voto lo divide a metà lo arrotonda e me lo restituisce intero
          //per ogni film
          votoMovie = response.results[i].vote_average;
          //numero di stelle inserire
          var numStelle = Math.round(votoMovie / 2);
          // console.log("N stelle: ",numStelle);

          //fare funzione per non ripetersi
          //trama
          var tramaMovie = response.results[i].overview;


          var urlImg = "https://image.tmdb.org/t/p/w342"+posterMovie;

          //fare funzione per non ripetersi
          if (posterMovie == null) {
            var urlImg = "errore.jpg"
          }

          //template handelbars
          //template handelbars
          var sorgenteCodice = $("#schedaFilmTemplate").html();

          var template = Handlebars.compile(sorgenteCodice);

          //richiamo le variabili definite
          var daInserire = {
            titoloFilm: titoloMovie,
            lingua: linguaMovie,
            voto :  numStelle,
            trama : tramaMovie,
            riconoscimento : target,
            rilascio:date,
            gen : genre

           };

          var html = template(daInserire);

          $(".secondo > .schedaFilm > .full > .half").append(html);

          var tipo = "movie";
          //template handelbars
          var sorgenteCodice = $("#scheda").html();

          var template = Handlebars.compile(sorgenteCodice);

          //richiamo le variabili definite
          var daInserire = {
            sfondo : back,
            riconoscimento : target,
            poster : urlImg,
            indice : index,
            type : tipo


           };

          var html = template(daInserire);

          $(".secondo .filmSingolo").append(html);
          //fine templating handlebars
        }//fine ciclo for oggetti

        daiVoto();

        $(".filmSingolo .movieSingolo").each(
          function(){
            var attr = $(this).attr('data-index');
            if (attr == 1) {
              $(this).addClass("margine")
            }
          }
        )

      })
    }

    //facciola la chiamata film singolo
    chiamataSingoloM();


    var genHomeMovie = "https://api.themoviedb.org/3/genre/movie/list?api_key=085f025c352f6e30faea971db0667d31";

    function generiMovieHome(){
        $.ajax({ url: genHomeMovie }).done(function (response) {

          console.log("cosa sei? movie",response);

          $(".genere").each(
            function(){
              var attributogenere = $(this).attr("data-genere");

              for (var i = 0; i < 19; i++) {
                if (attributogenere.includes(response.genres[i].id)) {
                  $(this).append("<span>" + response.genres[i].name + "</span>")
                }
              }

            }
          )
        })
      }

    generiMovieHome();



    // var genHomeSerie = "https://api.themoviedb.org/3/genre/tv/list?api_key=085f025c352f6e30faea971db0667d31";
    //
    // function generiSerieHome(){
    //     $.ajax({ url: genHomeSerie }).done(function (response) {
    //
    //       console.log("cosa sei? seie",response);
    //
    //       $(".genere").each(
    //         function(){
    //           var attributogenere = $(this).attr("data-genere");
    //
    //           for (var i = 0; i < 16; i++) {
    //             if (attributogenere.includes(response.genres[i].id)) {
    //               $(this).append("<span>" + response.genres[i].name + "</span>")
    //             }
    //           }
    //
    //         }
    //       )
    //     })
    //   }
    //
    // generiSerieHome();





  //qunado schiaccio su btn search
  $(".btn-search").click(
    function (){
      cerca();
    }
  )

  $('input').keydown(function(e){
    var tasto = e.which;
    if (tasto == 13) {
      cerca()
      }
    })

  //bottoni pagine
  $(".prev").hide();

  //bottoni per cambiare pagina
  $(".next").click(
      function(){
        inc = inc+1;
        console.log(inc);
        $(".container").empty();

        $(".prev").show();
        $(".filtro.attivo").removeClass("attivo");
        $(".all").addClass("attivo");

        searchFilm();


      }
    )



  $(".prev").click(
      function(){
        if (inc > 1) {
          inc = inc-1;
          $(".container").empty();
          searchFilm()
        }

      }
    )




//home-page slider prendo i film popolari
  //setting chiamta film popolari
  var intro = "https://api.themoviedb.org/3/tv/popular?api_key=085f025c352f6e30faea971db0667d31";

    var settings = { url: intro }

    function entrata(){
      $.ajax(settings).done(function (response) {

              console.log("popolari",response.results);


              for (var i = 0; i < response.results.length; i++) {
                // console.log("singolo film",response.results[i]);

                //creo variabili riferimento per handlebars
                var titoloSerie = response.results[i].name;
                var titoloMovie = response.results[i].title;

                var posterMovie = response.results[i].poster_path;


                var urlImg = "https://image.tmdb.org/t/p/w342"+posterMovie;

                if (posterMovie == null) {
                  var urlImg = "errore.jpg"
                }

                //template handelbars
                var sorgenteCodice = $("#iniziale").html();

                var template = Handlebars.compile(sorgenteCodice);

                //richiamo le variabili definite
                var daInserire = {
                  titoloFilm: titoloSerie,
                  poster : urlImg,

                 };

                var html = template(daInserire);

                $("#caro ul").append(html);
                //fine templating handlebars

              }//fine ciclo for oggetti

      }

    )}

    //creo slider serie popolari

    entrata();

    //riferimento per slider home

    //quando clicco sul logo
    $(".ricarica").click(
      function(){
        //ricarico semplicemtne la pagina -.-
        location.reload();
      }
    )

    //responsive slider
    //carosello serie popolari
    // var vaiInla = "";
    //
    // var finestra = 0;
    // var width = $(window).width();
    // if (width > 1500) {
    //   finestra = 5473;
    //   vaiInla = 684;
    // }
    // if (width < 1500) {
    //   finestra = 9001;
    //   vaiInla = 684;
    // }
    // if (width < 1100) {
    //   finestra = 9501;
    //   vaiInla = 342;
    // }
    // if (width < 600) {
    //   finestra = 6499;
    //   vaiInla = 342;
    // }
    //
    // //tasti slider next prev
    // var x = $(".pop #caro");
    // var margine = 0;
    //
    //
    // $(".pop .caroNext").click(
    //   function(){
    //   $(".pop .caroPrev").show();
    //
    //   margine = margine + vaiInla;
    //   if (margine < finestra) {
    //     x.animate({scrollLeft: margine}, 700);
    //     console.log(margine);
    //     }
    //     if (margine == finestra-1) {
    //       $(".pop .caroNext").hide();
    //     }
    //   }
    // )
    //
    // $(".pop .caroPrev").click(
    //   function(){
    //     $(".pop .caroNext").show();
    //     if (margine > 0) {
    //       margine = margine - vaiInla;
    //         x.animate({scrollLeft: margine}, 700);
    //       }
    //       if (margine < 100) {
    //           $(this).hide();
    //       }
    //     }
    // );
    //
    // if (margine == 0) {
    //   $(".pop .caroPrev").hide();
    // }
    //




    //input search nascosto
    $(".apri").click(
      function chiudiSearch(){
        if ($(this).hasClass("aperto")) {
          $(".out").hide();
          $(".lente").show();
          $(this).removeClass("aperto");
        }
        else {
          $(".out").show(200);
          $(".lente").hide("fast");
          $(this).addClass("aperto");
          $("input.cerca").focus();

        }
      }
    )


    $(".vediFiltri").click(
      function(){
        if ($(this).hasClass("open")) {
          $(".filtri-bar").removeClass("filtraggio");
          $(this).removeClass("open");
        }
        else{
          $(this).addClass("open");
          $(".filtri-bar").addClass("filtraggio");
        }

      }
    )


    // var siVede = true;


    var idSeria = "0";

    //apri scheda film singolo
      $( "body" ).on( "click", '.filmSingolo .movieSingolo ' , function(e) {
          //prevents from scrolling to top behavior
          e.preventDefault();

          $("div.attivato").removeClass("attivato");

          $(this).parents().addClass("attivato");

          var idFilm = $(this).attr("data-id");

          //vedo scheda film
          $(".relativo .schedaFilm").removeClass("flexa");
          $(".relativo.attivato .schedaFilm").addClass("flexa");

          $(".infoSingolo").hide();

          $("[data-id="+ idFilm + "]").show();

          var bk = $(this).find(".img-film").attr("data-background");
         //immagine di sfondo stessa del poster
         $(".schedaFilm").css("background-image","url('https://image.tmdb.org/t/p/w1280" + bk + "')")


         $(".relativo .movieSingolo").removeClass("opaco");
          //opacizzo tutti film
          $(".relativo .movieSingolo").not(this).addClass("trasparente");
          //problema rimane l ultimo con l opacita al 100
          $(this).addClass("opaco");


          $(".infoSingolo").children().css("animation-name","opacita");

          $(".half").show();

          $(".listaEpisodi,.stagioniTab").hide();


        }
      );





    //prendo id dela serie per recuperare i dati poi
    $( "body" ).on( "click", '.primo .filmSingolo > .movieSingolo' , function() {
    //prendo recupero informazioni id del film episodi e stagioni
    idSeria = $(this).attr("data-id");

    $(".trailer").hide();

    //ogni volta che cambio film i bottoni si resettano next cliccabile prev no
    stagSerie = 1;
    console.log(stagSerie);
    $(".numero").text(stagSerie);

    $(".nextSeason").removeClass("not-active");
    $(".prevSeason").addClass("not-active");

    console.log("valore sesria",idSeria);

    var urlNumeroStagioni = "https://api.themoviedb.org/3/tv/" + idSeria + "?api_key=085f025c352f6e30faea971db0667d31"

    var settings = { url: urlNumeroStagioni }

    function getNumeroStagioni(){
      $.ajax(settings).done(function (response) {

              console.log("stagioni",response);

              var stagioni = response.number_of_seasons;
              var episodi = response.number_of_episodes;

              for (var i = 0; i < response.seasons.length; i++) {
                var sint = response.seasons[i].overview;
                var seas = response.seasons[i].name;

                //template handelbars
                var sorgenteCodice = $("#listaStagioniTemplate").html();

                var template = Handlebars.compile(sorgenteCodice);

                //richiamo le variabili definite
                var daInserire = {
                  nomiSt: seas,
                  tramaSt : sint

                 };

                var html = template(daInserire);

                $(".introStagione").append(html);

              }

              console.log(stagioni,episodi);

              //scrivo il numero di stagioni ed episodi
              $(".primo .stagioniClass").text(stagioni);
              $(".primo .episodiClass").text(episodi);


              if (response.seasons.length > 1) {
                  $(".nextSeason").show()
              }
              else {
                  $(".nextSeason").addClass("not-active");
              }

            })
          }

    getNumeroStagioni();

    // info episodi stagione
    var episodeUrl = "https://api.themoviedb.org/3/tv/" + idSeria + "/season/" + stagSerie + "?api_key=085f025c352f6e30faea971db0667d31"

    console.log(episodeUrl);

    var settings = { url: episodeUrl }

    function getEpisode(){
      $.ajax(settings).done(function (response) {

          console.log("info episodi",response);


          for (var i = 0; i < response.episodes.length; i++) {

            var nomiEpisodi = response.episodes[i].name;
            var trameEpisodi = response.episodes[i].overview;
            var imgEpisodi = response.episodes[i].still_path;

            imgEpisodi = "https://image.tmdb.org/t/p/w342" + imgEpisodi

            trameEpisodi = trameEpisodi.slice(0, 170) + "...";

            //template handelbars
            var sorgenteCodice = $("#listaEpisodiTemplate").html();

            var template = Handlebars.compile(sorgenteCodice);

            //richiamo le variabili definite
            var daInserire = {
              nomiEp: nomiEpisodi,
              epTrama : trameEpisodi,
              epImg : imgEpisodi
             };

            var html = template(daInserire);

            $(".listaEpisodi .list").append(html);

          }//fine ciclo for

        }

      )}

    getEpisode();

  })//fine funzione click



  $(".prevSeason").addClass("not-active");

  $(".nextSeason").click(
    function(e){
      e.preventDefault();

      $(".listaEpisodi .list").empty();

      stagSerie = stagSerie + 1;
      console.log("numero stagione",stagSerie);
      $(".numero").text(stagSerie);


      var urlNumeroStagioni = "https://api.themoviedb.org/3/tv/" + idSeria + "?api_key=085f025c352f6e30faea971db0667d31"

      var settings = { url: urlNumeroStagioni }

      function getNumeroStagioni(){
        $.ajax(settings).done(function (response) {

                console.log("stagioni",response);

                var stagioni = response.number_of_seasons;
                var episodi = response.number_of_episodes;

                for (var i = 0; i < response.seasons.length; i++) {
                  // var sint = response.seasons[i].overview;
                  var seas = response.seasons[i].name;

                  //template handelbars
                  var sorgenteCodice = $("#listaStagioniTemplate").html();

                  var template = Handlebars.compile(sorgenteCodice);

                  //richiamo le variabili definite
                  var daInserire = {
                    nomiSt: seas,
                    // tramaSt : sint

                   };

                  var html = template(daInserire);
                  //dove lo inserisco
                  $(".introStagione").append(html);

                }

                //se il numero di stagione è uguale all numero incrementato con il btn next
                //nascondo il bottone
                if (stagioni == stagSerie) {
                    $(".nextSeason").addClass("not-active");
                }


              })
            }

      getNumeroStagioni();


      var episodeUrl = "https://api.themoviedb.org/3/tv/" + idSeria + "/season/"+ stagSerie +"?api_key=085f025c352f6e30faea971db0667d31"

      function getEpisode(){
        $.ajax({ url: episodeUrl }).done(function (response) {

            console.log("info episodi",response);


            for (var i = 0; i < response.episodes.length; i++) {

              var nomiEpisodi = response.episodes[i].name;
              var trameEpisodi = response.episodes[i].overview;
              var imgEpisodi = response.episodes[i].still_path;

              imgEpisodi = "https://image.tmdb.org/t/p/w342" + imgEpisodi

              trameEpisodi = trameEpisodi.slice(0, 170) + "...";

              //template handelbars
              var sorgenteCodice = $("#listaEpisodiTemplate").html();

              var template = Handlebars.compile(sorgenteCodice);

              //richiamo le variabili definite
              var daInserire = {
                nomiEp: nomiEpisodi,
                epTrama : trameEpisodi,
                epImg : imgEpisodi
               };

              var html = template(daInserire);

              $(".listaEpisodi .list").append(html);

            }//fine ciclo for

          }

        )}

      getEpisode();

      $(".prevSeason").removeClass("not-active");



    }
  )

  $(".prevSeason").click(
    function(e){
      e.preventDefault();
      $(".nextSeason").show();

      $(".listaEpisodi .list").empty();

      stagSerie = stagSerie - 1;
      $(".numero").text(stagSerie);


      if (stagSerie == 1) {
        $(this).addClass("not-active");
        $(".nextSeason").removeClass("not-active");
      }


      var urlNumeroStagioni = "https://api.themoviedb.org/3/tv/" + idSeria + "?api_key=085f025c352f6e30faea971db0667d31"

      function getNumeroStagioni(){
        $.ajax({ url: urlNumeroStagioni }).done(function (response) {

                var stagioni = response.number_of_seasons;
                var episodi = response.number_of_episodes;

                for (var i = 0; i < response.seasons.length; i++) {
                  // var sint = response.seasons[i].overview;
                  var seas = response.seasons[i].name;

                  //template handelbars
                  var sorgenteCodice = $("#listaStagioniTemplate").html();

                  var template = Handlebars.compile(sorgenteCodice);

                  //richiamo le variabili definite
                  var daInserire = {
                    nomiSt: seas,
                    // tramaSt : sint

                   };

                  var html = template(daInserire);
                  //dove lo inserisco
                  $(".introStagione").append(html);

                }

                //se il numero di stagione è uguale all numero incrementato con il btn next
                //nascondo il bottone
                if (stagioni == stagSerie) {
                    $(".nextSeason").addClass("not-active");
                }


              })
            }

      getNumeroStagioni();


      var episodeUrl = "https://api.themoviedb.org/3/tv/" + idSeria + "/season/"+ stagSerie +"?api_key=085f025c352f6e30faea971db0667d31"

      function getEpisode(){
        $.ajax({ url: episodeUrl }).done(function (response) {

            for (var i = 0; i < response.episodes.length; i++) {

              var nomiEpisodi = response.episodes[i].name;
              var trameEpisodi = response.episodes[i].overview;
              var imgEpisodi = response.episodes[i].still_path;

              imgEpisodi = "https://image.tmdb.org/t/p/w342" + imgEpisodi

              trameEpisodi = trameEpisodi.slice(0, 170) + "...";

              //template handelbars
              var sorgenteCodice = $("#listaEpisodiTemplate").html();

              var template = Handlebars.compile(sorgenteCodice);

              //richiamo le variabili definite
              var daInserire = {
                nomiEp: nomiEpisodi,
                epTrama : trameEpisodi,
                epImg : imgEpisodi
               };

              var html = template(daInserire);

              $(".listaEpisodi .list").append(html);

            }//fine ciclo for

          }

        )}

      getEpisode()



    }
  )


  //chiudi scheda film
  $( "body" ).on( "click", '.chiudiScheda' , function() {

      $(".relativo .schedaFilm").removeClass("flexa");

      $(".relativo .movieSingolo").removeClass("trasparente");

      $(".relativo").removeClass("attivato");

      stagSerie = 1;
      $(".numero").text("1");

      $(".trailer").hide();

      $(".relativo .movieSingolo").removeClass("opaco");


      }
    )

    // tab con info sugli episodi
    $( "body" ).on( "click", '.schedaFilm .btnInfoEpisodi ' , function(e) {
        //prevents from scrolling to top behavior
        e.preventDefault();

        $(".half,.stagioniTab").hide();
        $(".listaEpisodi").show();


      }
    );

    $( "body" ).on( "click", '.schedaFilm .btnInfoFilm ' , function(e) {
        //prevents from scrolling to top behavior
        e.preventDefault();

        $(".listaEpisodi").hide();
        $(".half").show();

      }
    );


  //video trailer film

    var id  = "629";
    var video = "http://api.themoviedb.org/3/movie/" + id + "/videos?api_key=085f025c352f6e30faea971db0667d31";

    var settings = { url: video }

    function vvid(){
        $.ajax(settings).done(function (response) {


          var youtube = "https://www.youtube.com/embed/";

          var trailerUrl = youtube + response.results[0].key + "?controls=0";

          $(".videoFilm iframe").attr("src",trailerUrl);

        }

      )}

    vvid();





    //prendo id dela serie per recuperare i dati poi
    $( "body" ).on( "click", '.secondo .filmSingolo > .movieSingolo' , function() {
    //prendo recupero informazioni id del film episodi e stagioni
    id = $(this).attr("data-id");

    var video = "http://api.themoviedb.org/3/movie/" + id + "/videos?api_key=085f025c352f6e30faea971db0667d31";

    var settings = { url: video }

    function vvid(){
        $.ajax(settings).done(function (response) {

          console.log("videos",response);

          var youtube = "https://www.youtube.com/embed/";

          var trailerUrl = youtube + response.results[0].key + "?controls=0";

          $(".trailer iframe").attr("src",trailerUrl);

        }

      )}

    vvid();


    }
    )

    $( "body" ).on( "click", '.secondo .movieSingolo' , function(e) {

        e.preventDefault();
          $(".secondo .half").show();
          $(".trailer").hide();

        }
    )


    $( "body" ).on( "click", '.secondo .btnTrailer' , function(e) {

      e.preventDefault();
        $(".secondo .half").hide();
        $(".trailer").show();
        $(".full").addClass("opaco2")


      }
    )

    $( "body" ).on( "click", '.secondo .btnInfoFilm' , function(e) {

      e.preventDefault();
        $(".secondo .half").show();
        $(".trailer").hide();
        $(".full").removeClass("opaco")

      }
    )


    //do le stelline stelle voto rate al film
    function daiVoto(){
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

                  $(this).append('<i class="fa fa-star-o" aria-hidden="true"></i>')

              }
            }
          )
        }


    //scrolla orizzontalmente quando sono nei coroselli slider negli episodi scheda film
    $(".list").mouseenter(
        function() {
          $(".list").mousewheel(function(event, delta) {
          this.scrollLeft -= (delta * 0.3);
          event.preventDefault();
          });
        }
      )






  }//fine jquery
)
