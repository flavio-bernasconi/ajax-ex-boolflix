$( document ).ready(function() {


  $(".btn-search").click(
    function(){
      var valore = $(".cerca").val();

      var word = "&query=" + valore;

      var urlCompleta = "https://api.themoviedb.org/3/search/movie?api_key=085f025c352f6e30faea971db0667d31"+word ;

      var settings = {
        async: true,
        crossDomain: true,
        url: urlCompleta,
        method: "GET",
        headers: {},
        data: "{}"
      }


      function chiamata(){
        $.ajax(settings).done(function (response) {
          console.log("oggetto response",response.results);

          for (var i = 0; i < response.results.length; i++) {
            console.log("singoli oggetti",response.results[i]);

            var titoloMovie = response.results[i].title;
            var titoloMovie = response.results[i].original_title;
            var titoloOriginaleMovie = response.results[i].original_title;
            var linguaMovie = response.results[i].original_language;
            var votoMovie = response.results[i].vote_average;

            var numStelle = Math.round(votoMovie / 2);
            //es. 4
            




            //template handelbars
            var sorgenteCodice = $("#dataBase").html();
            console.log(sorgenteCodice);

            var template = Handlebars.compile(sorgenteCodice);

            var daInserire = { titoloFilm: titoloMovie, titoloOriginale: titoloMovie, lingua: linguaMovie, voto : ""  };

            var html = template(daInserire);

            $(".container").append(html);



          }

        });
      }

      chiamata();

    }
  )










});
