$( document ).ready(function() {

  var inc = 1;

  var votoMovie = "";

  //id del film
  var id = 384018;

  var settings = {
    async: true,
    crossDomain: true,
    url: urlSingolo,
    method: "GET",
    headers: {},
    data: "{}"
  }



  //film singolo con scheda al click
  var urlSingolo = "http://api.themoviedb.org/3/movie/"+ id +"?api_key=085f025c352f6e30faea971db0667d31";

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
        console.log("oggetto singolo film",response);

        for (var i = 0; i < 1; i++) {
          // console.log("singolo film",response.results[i]);

          //creo variabili riferimento per handlebars
          var titoloMovie = response.title;
          var titoloMovie = response.original_title;
          var titoloOriginaleMovie = response.original_title;
          var linguaMovie = response.original_language;
          var posterMovie = response.poster_path;
          var genre = response.genre_ids;

          //prende il voto lo divide a metà lo arrotonda e me lo restituisce intero
          //per ogni film
          votoMovie = response.vote_average;
          //numero di stelle inserire
          var numStelle = Math.round(votoMovie / 2);
          // console.log("N stelle: ",numStelle);

          //fare funzione per non ripetersi
          //trama
          var tramaMovie = response.overview;


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
            titoloOriginale: titoloOriginaleMovie,
            lingua: linguaMovie,
            voto :  numStelle,
            poster : urlImg,
            trama : tramaMovie,
            popolarita : genre

           };

          var html = template(daInserire);

          $(".filmSingolo").append(html);
          //fine templating handlebars

        }//fine ciclo for oggetti
        console.log("singolo movie film ffff");

      })

    }

    //facciola la chiamata film singolo
    chiamataSingolo()

  //nuovi film new movie
  var scopri = "https://api.themoviedb.org/3/discover/movie?api_key=085f025c352f6e30faea971db0667d31&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

    var settings = {
      async: true,
      crossDomain: true,
      url: scopri,
      method: "GET",
      headers: {},
      data: "{}"
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


  //cast film
  // var urlCast = "http://api.themoviedb.org/3/movie/384018/casts?api_key=085f025c352f6e30faea971db0667d31"
  //
  // var settings = {
  //     async: true,
  //     crossDomain: true,
  //     url: urlCast,
  //     method: "GET",
  //     headers: {},
  //     data: "{}"
  //   }
  //
  // function getCast(){
  //     $.ajax(settings).done(function (response) {
  //       console.log("cast",response.cast);
  //
  //       for (var i = 0; i < response.cast.length; i++) {
  //         if (i<5) {
  //           console.log(response.cast[i].name);
  //         }
  //         else {
  //           break
  //         }
  //       }//fine ciclo
  //
  //     })
  //   }
  //
  // getCast();




  var urlTrend = "https://api.themoviedb.org/3/trending/tv/day?api_key=085f025c352f6e30faea971db0667d31";

  //setting chiamta trend
  var settings = {
    async: true,
    crossDomain: true,
    url: urlTrend,
    method: "GET",
    headers: {},
    data: "{}"
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
    $(".orizzonatale,.discoverContainer,.moda").hide();
    //faccio vedere i filtri
    // $(".filtri-bar").show();
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

    var settings = {
      async: true,
      crossDomain: true,
      url: intro,
      method: "GET",
      headers: {},
      data: "{}"
    }


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

    //creo slider homa page

    entrata();

    //riferimento per slider home

    //quando clicco sul logo
    $(".ricarica").click(
      function(){
        //nascondo i filtri
        // $(".filtri-bar").hide();
        //posiziono lo slider a 0
        margine = 0;
        //input search
        $(".out").hide();
        $(".lente").show();
        $(".filtri-bar").removeClass("filtraggio");
        $(".btnFiltri").hide();
        $("div.open").removeClass("open");
        //pulisco input
        $(".cerca").val("");
        $(".container").empty();
        //svuoto lo slider altrimenti mi mette due volte i film
        $("#caro ul").empty();
        //quando cerco li nascondo tutti quando ricarico la home li faccio vedere
        $(".orizzonatale,.discoverContainer,.moda").show();
        $(".btn-ris").addClass("hide");
        discover();
        entrata();


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
          $(".caroNext").hide();
        }
      }
    )


    $(".pop .caroPrev").click(
      function(){
        $(".caroNext").show();
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

    //tasti slider next prev carosello slider discover
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
        $(".caroNext").show();
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



    var siVede = true;

    //apri scheda del film singolo
    $( "body" ).on( "click", '.filmSingolo > .movieSingolo' , function(e) {
        //prevents from scrolling to top behavior
        e.preventDefault();
        $(this).find(".schedaFilm").toggleClass("vedi");
        if (siVede == true) {
          $(this).find(".overlay").hide();
          siVede = false;
        }
        else{
          $(this).find(".overlay").show();
          siVede = true;
        }

        // console.log(siVede);
      }
    );

































});
