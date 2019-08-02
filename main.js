$( document ).ready(function() {

  var votoMovie = "";



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
          // console.log("oggetto response",response.results);

          for (var i = 0; i < response.results.length; i++) {
            // console.log("singolo film",response.results[i]);

            //creo variabili riferimento per handlebars
            var titoloMovie = response.results[i].title;
            var titoloMovie = response.results[i].original_title;
            var titoloOriginaleMovie = response.results[i].original_title;
            var linguaMovie = response.results[i].original_language;

            //prende il voto lo divide a metà lo arrotonda e me lo restituisce intero
            //per ogni film
            votoMovie = response.results[i].vote_average;
            //numero di stelle inserire
            var numStelle = Math.round(votoMovie / 2);

            // console.log("N stelle: ",numStelle);

            //ogni ciclo lui mi appende qualcosa ma io voglio appendarla per il numero pari al voto;
            //ma qui sono dentro al ciclo. una funzione(?) che appende per un per il numero di stelle
            //non sembra funzionare mi ripete la funzione ogni ciclo

            //template handelbars
            var sorgenteCodice = $("#dataBase").html();

            var template = Handlebars.compile(sorgenteCodice);

            //richiamo le variabili definite
            var daInserire = {
              titoloFilm: titoloMovie,
              titoloOriginale: titoloMovie,
              lingua: linguaMovie,
              voto :  numStelle

             };

            var html = template(daInserire);

            $(".container").append(html);
            //fine templating handlebars

          }//fine ciclo for oggetti


          $(".rate").each(
            function(){
              var num = $(this).attr("data-numero");
              for (var i = 0; i < num; i++) {
                $(this).append('<i class="fa fa-star-o" aria-hidden="true"></i>')
              }
            }
          )







        });
      }

      chiamata();







    }
  )








});
