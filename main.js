$( document ).ready(function() {

  var inc = 1;

  var votoMovie = "";

  //film singolo con scheda al click
  var urlSingolo = "https://api.themoviedb.org/3/trending/tv/week?api_key=085f025c352f6e30faea971db0667d31";

    var settings = {
      async: true,
      crossDomain: true,
      url: urlSingolo,
      method: "GET",
      headers: {},
      data: "{}"
    }

    function chiamataSingolo(){
      $.ajax(settings).done(function (response) {
        // console.log("oggetto response",response.results);
        console.log("oggetto singolo serie",response);

        for (var i = 0; i < 10; i++) {
          // console.log("singolo film",response.results[i]);

          //creo variabili riferimento per handlebars
          var titoloMovie = response.results[i].name;
          var linguaMovie = response.results[i].original_language;
          var posterMovie = response.results[i].poster_path;
          var genre = response.results[i].genre_ids;
          var back = response.results[i].backdrop_path;
          var target = response.results[i].id;

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
          var sorgenteCodice = $("#scheda").html();

          var template = Handlebars.compile(sorgenteCodice);

          //richiamo le variabili definite
          var daInserire = {
            titoloFilm: titoloMovie,
            lingua: linguaMovie,
            voto :  numStelle,
            poster : urlImg,
            trama : tramaMovie,
            sfondo : back,
            riconoscimento : target,
            gen : genre

           };

          var html = template(daInserire);

          $(".primo .filmSingolo").append(html);
          //fine templating handlebars
        }//fine ciclo for oggetti
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

        for (var i = 0; i < 10; i++) {
          // console.log("singolo film",response.results[i]);

          //creo variabili riferimento per handlebars
          var titoloMovie = response.results[i].title;
          var linguaMovie = response.results[i].original_language;
          var posterMovie = response.results[i].poster_path;
          var genre = response.results[i].genre_ids;
          var back = response.results[i].backdrop_path;


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
          var sorgenteCodice = $("#scheda").html();

          var template = Handlebars.compile(sorgenteCodice);

          //richiamo le variabili definite
          var daInserire = {
            titoloFilm: titoloMovie,
            lingua: linguaMovie,
            voto :  numStelle,
            poster : urlImg,
            trama : tramaMovie,
            sfondo : back,
            gen : genre

           };

          var html = template(daInserire);

          $(".secondo .filmSingolo").append(html);
          //fine templating handlebars
        }//fine ciclo for oggetti

        daiVoto();

      })
    }

    //facciola la chiamata film singolo
    chiamataSingoloM()



  //nuovi film new movie
  var scopri = "https://api.themoviedb.org/3/discover/movie?api_key=085f025c352f6e30faea971db0667d31&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

    settings = {
      url: scopri
    }

    function discover(){
      $.ajax(settings).done(function (response) {

              console.log("scopri",response.results);

              for (var i = 0; i < response.results.length; i++) {
                // console.log("singolo film",response.results[i]);

                //creo variabili riferimento per handlebars
                var titoloMovie = response.results[i].title;

                var posterMovie = response.results[i].poster_path;

                var urlImg = "https://image.tmdb.org/t/p/w342"+posterMovie;

                if (posterMovie == null) {
                  var urlImg = "errore.jpg"
                }

                //template handelbars
                var sorgenteCodice = $("#discovery").html();

                var template = Handlebars.compile(sorgenteCodice);

                //richiamo le variabili definite
                var daInserire = {
                  titoloFilm: titoloMovie,
                  poster : urlImg,

                 };

                var html = template(daInserire);

                $("#discoverSlider ul").append(html);
                //fine templating handlebars

              }//fine ciclo for oggetti
      }

    )}

    discover()





  var urlTrend = "https://api.themoviedb.org/3/trending/tv/day?api_key=085f025c352f6e30faea971db0667d31";

  //setting chiamta trend
  settings = {
    url: urlTrend
  }

  //aggiungo le serie tv trend della settimana
  //devo mettere la funzione qui se la metto dopo ricarica
  //nel carosello vedo le serie tv
  function trend(){
    $.ajax(settings).done(function (response) {
      console.log("trend",response.results);


      for (var i = 0; i < 7; i++) {
        // console.log("singolo film",response.results[i]);

        //creo variabili riferimento per handlebars
        var titoloSerie = response.results[i].name;

        var posterMovie = response.results[i].backdrop_path;

        var urlImg = "https://image.tmdb.org/t/p/w500"+posterMovie;

        if (posterMovie == null) {
          var urlImg = "errore.jpg"
        }

        //template handelbars
        var sorgenteCodice = $("#trending").html();

        var template = Handlebars.compile(sorgenteCodice);

        //richiamo le variabili definite
        var daInserire = {
          titoloSerie: titoloSerie,
          poster : urlImg,

         };

        var html = template(daInserire);

        $(".tren").append(html);
        //fine templating handlebars


      }//fine ciclo for oggetti


    })
  }

  trend()

  // $(".filtri-bar").hide();

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

  //funzione che richiama film e serie tv
  function tutto(){
    var valore = $(".cerca").val();

    var word = "&query=" + valore;

    var pagNum = "&page=" + inc;
    console.log("numero pagina",pagNum);
    $(".page").text(inc);


    //setting chiamta film
    var urlMovie = "https://api.themoviedb.org/3/search/movie?api_key=085f025c352f6e30faea971db0667d31"+word+pagNum ;

    settings = { url: urlMovie }

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
          var genre = response.results[i].genre_ids;

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
            lingua: linguaMovie,
            voto :  numStelle,
            poster : urlImg,
            trama : tramaMovie,
            popolarita : genre

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
    //setting chiamta serie
    var urlSerie = "https://api.themoviedb.org/3/search/tv?api_key=085f025c352f6e30faea971db0667d31"+word+pagNum ;

    var settings = {
      async: true,
      crossDomain: true,
      url: urlSerie,
      method: "GET",
      headers: {},
      data: "{}"
    }


    function chiamataSerie(){
      $.ajax(settings).done(function (response) {
        console.log("oggetto response serie",response);

        for (var i = 0; i < response.results.length; i++) {
          // console.log("singolo film",response.results[i]);

          //creo variabili riferimento per handlebars
          var titoloSerie = response.results[i].name;
          var titoloMovie = response.results[i].original_name;
          var titoloOriginaleMovie = response.results[i].original_title;
          var linguaMovie = response.results[i].original_language;
          var posterMovie = response.results[i].poster_path;
          var genre = response.results[i].genre_ids;


          //prende il voto lo divide a metà lo arrotonda e me lo restituisce intero
          //per ogni film
          votoMovie = response.results[i].vote_average;
          //numero di stelle inserire
          var numStelle = Math.round(votoMovie / 2);

          //fare funzione per non ripetersi
          //trama
          var tramaMovie = response.results[i].overview;
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
            lingua: linguaMovie,
            voto :  numStelle,
            poster : urlImg,
            trama : tramaMovie,
            popolarita : genre

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

        //lingua film con bandiera relativa
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


          filtra();


          console.log(" fine CHIAMATA SERIE");


      });
    }

    chiamataSerie();

    //nascondo i bottoni next e prev pagine
    $("a.hide").removeClass("hide");


    // pulisco il campo dell input
    // $(".cerca").val("");
    //pulisco il contenitore quando rifaccio la chiamata non si accavallano il risultato vecchio con quello nuovo
    $(".container").empty();

  }


  function cerca(){
    //punto di partenza delle pagine (pag1)
    inc = 1;
    //nascondo lo slider
    //quando cerco li nascondo tutti quando ricarico la home li faccio vedere
    $(".contenitoreHome").hide();
    //tolgo a tutti i btn filtri la classe attivo
    $("a.attivo").removeClass("attivo");
    //e la metto a il bottone tutti
    $("a.all").addClass("attivo");

    $(".btnFiltri").show();

    //poi faccio la chiamta
    tutto()
  }

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

  //bottoni per cambiare pagina
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



              //prendo l attributo genere ad ogni p


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

    var finestra = 0;
    var width = $(window).width();
    if (width > 1500) {
      finestra = 5473;
    }
    if (width < 1500) {
      finestra = 9001;
    }
    if (width < 1100) {
      finestra = 9501;
    }

    //tasti slider next prev
    var x = $(".pop #caro");
    var margine = 0;


    $(".pop .caroNext").click(
      function(){
      $(".pop .caroPrev").show();

      margine = margine + 684;
      if (margine < finestra) {
        x.animate({scrollLeft: margine}, 700);
        console.log(margine);
        }
        if (margine == finestra-1) {
          $(".pop .caroNext").hide();
        }
      }
    )

    $(".pop .caroPrev").click(
      function(){
        $(".pop .caroNext").show();
        if (margine > 0) {
          margine = margine - 684;
            x.animate({scrollLeft: margine}, 700);
          }
          if (margine < 500) {
              $(this).hide();
          }
        }
    );

    if (margine == 0) {
      $(".pop .caroPrev").hide();
    }

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

    //responsive slider
    var vaiInla = "";

    var finestra2 = 0;
    var width = $(window).width();
    if (width > 1500) {
      finestra2 = 9001;
      vaiInla = 684;
    }
    if (width < 1500) {
      finestra2 = 14821;
      vaiInla = 684;
    }
    if (width < 1100) {
      finestra2 = 15601;
      vaiInla = 342;
    }

    //tasti slider next prev carosello slider movie
    var y = $(".discoverContainer #discoverSlider");
    var margine2 = 0;

    $(".discoverContainer .caroNext").click(
      function(){
      $(".discoverContainer .caroPrev").show();

      margine2 = margine2 + vaiInla;
      if (margine2 < finestra2) {
        y.animate({scrollLeft: margine2}, 700);
        console.log(margine2);
        }
        if (margine2 == finestra2-1) {
          $(".caroNext").hide();
        }
      }
    )


    $(".discoverContainer .caroPrev").click(
      function(){
        $(".discoverContainer  .caroNext").show();
        if (margine2 > 0) {
          margine2 = margine2 - vaiInla;
            y.animate({scrollLeft: margine2}, 700);
          }
          if (margine2 < vaiInla) {
              $(this).hide();
          }
        }
    );

    if (margine2 == 0) {
      $(".discoverContainer .caroPrev").hide();
    }


    // var siVede = true;

    numClick = 0;

    //apri scheda film singolo
    $( "body" ).on( "click", '.filmSingolo > .movieSingolo' , function(e) {
        //prevents from scrolling to top behavior
        e.preventDefault();
        $(".relativo").addClass("attivato");

        $(".vedi").hide();
        //flex per poter aggiungere l immagine difiancoo non come sfondo
        $(this).find(".vedi").css("display" ,"flex");

        var bk = $(this).find(".img-film").attr("data-background");
        //immagine di sfondo stessa del poster
        $(this).children(".schedaFilm").css("background-image","url('https://image.tmdb.org/t/p/w1280" + bk + "')")
        //rimuovi a tutti la classe active
        $(".relativo .movieSingolo").not(this).find(".schedaFilm").removeClass("active");
        //aggiungi la classe attiva solo al figlio di questo drop
        $(this).children(".schedaFilm").toggleClass("active");

        $(".relativo .schedaFilm").children().css("animation-name", "");
        $(this).find(".half").children().css("animation-name", "opacita");


        if ($(".schedaFilm").hasClass("active")) {
          $(".relativo .movieSingolo").not(this).animate({opacity: 0.4}, 200);
          $(this).animate({opacity: 1}, 0);
        }
        else {
          $(".relativo .movieSingolo").animate({opacity: 1}, 200);
          //effetto di uscita quando riclicco sul film o su un altro
          $(".vedi").hide();
        }
        //non puoi piu cliccare
        // if ($(this).find(".vedi").hasClass("active")) {
        //   $(this).css("pointer-events","none");
        //   // $(this).find(".play").css("pointer-events","auto");
        // }
        // $(".movieSingolo").not(this).css("pointer-events","auto");

        // console.log(siVede);
      }
    );



    //video trailer film

    var id  = "4935";
    var video = "http://api.themoviedb.org/3/movie/" + id + "/videos?api_key=085f025c352f6e30faea971db0667d31";

      var settings = { url: video }

      function vvid(){
        $.ajax(settings).done(function (response) {

          console.log("videos",response);

          var youtube = "https://www.youtube.com/embed/";

          var trailerUrl = youtube + response.results[0].key + "?autoplay=1&rel=0&controls=0&modestbranding=1&showinfo=0";

          console.log(trailerUrl);

          $(".videoFilm iframe").attr("src",trailerUrl);

        }

      )}

      vvid();



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
              $(this).text("0")
            }
          }
        )
      }

    //non riesco a mettere i generi in parole
    // var urlGeneri = "http://api.themoviedb.org/3/genre/movie/list?api_key=085f025c352f6e30faea971db0667d31"
    // var settings = { url : urlGeneri}
    // var arrayGeneri = [];
    // function getGeneri(){
    //     $.ajax(settings).done(function (response) {
    //       console.log("generi",response);
    //       for (var i = 0; i < 19; i++) {
    //         var numGen = response.genres[i].id;
    //         var nomiGen = response.genres[i].name;
    //
    //         var str = numGen.toString();
    //
    //         arrayGeneri.push(str);
    //         //questi sono numeri
    //         // console.log( str);
    //       }//fine ciclo
    //
    //
    //       console.log(arrayGeneri);
    //
    //       $("p.genere").each(
    //         function(){
    //           //numero attributo genere
    //           var getGen = $(this).attr("data-genere");
    //           var spez = getGen.split(",");
    //           for (var i = 0; i < spez.length; i++) {
    //             //questi sono stringhe
    //             console.log("array del film",spez);
    //             if (spez.includes("80")) {
    //               console.log("oooook");
    //               $(this).text("avventura")
    //             }
    //           }
    //         }
    //       )
    //
    //     })
    //   }
    // getGeneri();
});
