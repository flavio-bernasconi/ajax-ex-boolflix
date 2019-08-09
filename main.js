$( document ).ready(function() {


  var inc = 1;

  var votoMovie = "";

  $(".filtri-bar").hide();

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


  function tutto(){
    var valore = $(".cerca").val();

    var word = "&query=" + valore;

    var pagNum = "&page=" + inc;
    console.log("numero pagina",pagNum);
    $(".page").text(inc);



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
            var urlImg = "error.jpg"
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

        //stelle icone
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


          filtra();


          console.log(" fine CHIAMATA SERIE");


      });
    }


    chiamataSerie();


    $("a.hide").removeClass("hide")


    // pulisco il campo dell input
    // $(".cerca").val("");
    //pulisco il contenitore quando rifaccio la chiamata non si accavallano il risultato vecchio con quello nuovo
    $(".container").empty();

  }


  $(".btn-search").click(
    function(){
      inc = 1;
      $(".orizzonatale").hide();
      $(".filtri-bar").show();
      $("a.attivo").removeClass("attivo");
      $("a.all").addClass("attivo");

      tutto()
    }
  )


  $('input').keydown(function(e){

    var tasto = e.which;
    if (tasto == 13) {
      inc = 1;
      $(".orizzonatale").hide();
      $(".filtri-bar").show();
      $("a.attivo").removeClass("attivo");
      $("a.all").addClass("attivo");

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





 var intro = "https://api.themoviedb.org/3/movie/popular?api_key=085f025c352f6e30faea971db0667d31";

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


                //fare funzione per non ripetersi
                var urlImg = "https://image.tmdb.org/t/p/w342"+posterMovie;

                //fare funzione per non ripetersi
                if (posterMovie == null) {
                  var urlImg = "error.jpg"
                }

                //template handelbars
                var sorgenteCodice = $("#iniziale").html();

                var template = Handlebars.compile(sorgenteCodice);

                //richiamo le variabili definite
                var daInserire = {
                  titoloFilm: titoloMovie,
                  poster : urlImg,

                 };

                var html = template(daInserire);

                $("#caro ul").append(html);
                //fine templating handlebars


              }//fine ciclo for oggetti

      }

    )}


    entrata();


    var margine = 0;

    $(".ricarica").click(
      function(){
        $(".filtri-bar").hide();
        margine = 0;
        //input search
        $(".out").hide();
        $(".lente").show();
        //pulisco input
        $(".cerca").val("");
        $(".container").empty();
        //svuoto lo slider altrimenti mi mette due volte i film
        $(".carousel ul").empty();
        $(".orizzonatale").show();
        $(".btn-ris").addClass("hide");
        entrata()
      }
    )


    var x = $(".pop .carousel");

    var finestra = 0;
    var width = $(window).width();
    if (width > 1400) {
      finestra = 5473;
    }
    if (width < 1400) {
      finestra = 5815;
    }
    if (width < 1100) {
      finestra = 6157;
    }

    //funzionano
    $(".pop .caroNext").click(
      function(){
      $(".caroPrev").show();

      margine = margine + 342;
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
          margine = margine - 342;
            x.animate({scrollLeft: margine}, 700);
          }
          if (margine < 342) {
              $(this).hide();
          }
        }

    );


    if (margine == 0) {
      $(".pop .caroPrev").hide();
    }




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
    }
  }
)




});
