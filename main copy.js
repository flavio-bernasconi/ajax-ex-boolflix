$( document ).ready(function() {


  //promemoria array
  var promemoria = [];
  var noti = 0;

  var source = "https://flynn.boolean.careers/exercises/api/holidays?"
  console.log(source);
  var mese = 01;
  var azzera = 0;

  var arraySide = [];



  function skipMese(){
    //parte calendario
    mese = mese;
    //trovo il numero di giorni nel mese
    var numeroGiorni = parseInt(moment("2018-" + mese + "", "YYYY-MM").daysInMonth());
    // var numeroGiorni = parseInt(moment("2018-03", "YYYY-MM").daysInMonth());
    // console.log("numero di giorni mese",numeroGiorni);

    //ciclo in base al numero di giorni del mese
    for (var i = 1; i <= numeroGiorni; i++) {
      var giorno = i;

      var data = moment("" + mese + "/" + giorno + "/2018", "MM-DD-YYYY");

      //stampo giorno della settimana e mese in parola
      var cifra = data.format("YYYY-MM-DD");
      var parole = data.format("D dddd");
      // console.log(i,cifra);
      $(".calendario").append("<div class='box'><p data-date='" + cifra + "'>" + parole + "</p></div>")
      }

      $(".mese h1").text(data.format("MMMM YYYY"));


      //AGGIUNGI MEMO
      $(".box").one("click",
        function(){
          //testo inserito
            var inserisci = prompt("");
            $(this).append("<span>" + inserisci + "</span>");

            //data del box
            var attributo = $(this).find("p").attr("data-date");

            promemoria.push({testo : inserisci, data : attributo});

            var noti = $(".notifiche").text(promemoria.length - azzera);


        }
      )

      if (promemoria.length> 0) {
        for (var i = 0; i < promemoria.length; i++) {
          var memoData = promemoria[i].data;
          // console.log("memodata",memoData);
          var memoTesto = promemoria[i].testo;
          // console.log(memoTesto);

          var esiste = $("p[data-date='" + memoData + "']");
          if (esiste) {
            esiste.append("<span>" + memoTesto + "</span>");
          }
        }





      }

  }

  skipMese();

  function chiamata(){
      $.ajax(
          {
             url : source,
             data : {
               year : 2018,
               month : mese-1
             },
             method: "GET",
             success: function(data){
               if (data.success) {
                 var oggetti = data.response;
                 // console.log(oggetti);

                 for (var i = 0; i < oggetti.length; i++) {
                   var oggeDate = oggetti[i].date;
                   // console.log("oggeDate",oggeDate);
                   var nomeEvento = oggetti[i].name;
                   // console.log(nomeEvento);

                    var festate = $("p[data-date='" + oggeDate + "']")
                    if (festate) {
                      festate.append(" " + nomeEvento);
                      festate.parent().addClass("event");
                    }

                 }

                 $(".add").click(
                   function(){
                     $(".numeroNotifiche").empty();
                     var noti = $(".notifiche").text("0");
                     azzera = promemoria.length;
                       for (var i = 0; i < promemoria.length; i++) {
                         var memoData = promemoria[i].data;
                         var memotesto = promemoria[i].testo;
                         console.log("oggetto",promemoria[i].testo);

                         $(".numeroNotifiche").append("<p> Data: " + memoData + "<br>" + "Evento: " + promemoria[i].testo + "</p>" + "<hr>");

                       }
                   })

               }
             },
             error: function(richiesta,stato,errore){
                console.log("c'è un problema con il server",richiesta,stato,errore);
             }
          }
        )

    }

  chiamata();

  sunday();
  console.log(mese);



  //bottoni
  //domenica diversa
  function sunday(){
      $(".calendario p").each(function(){
        var testoDay = $(this).text();
        if (testoDay.includes("domenica")) {
          $(this).parent().addClass("dom");
        }

      })
    }

    $(".next").click(
      function(){
        if (mese < 12) {
          $(".calendario .box").remove();
            mese = mese+1;
            chiamata();
            skipMese();
            sunday();
        }
        else {
          null
        }
        console.log(mese);
      }
    )

    $(".prev").click(
      function(){
        if (mese > 1) {
          $(".calendario .box").remove();
            mese = mese-1;
            chiamata();
            skipMese();
            sunday();
        }
        else {
          null
        }
          console.log(mese);
      }
    );




    $(".espandi").click(
      function(){
        $(".side-bar").toggleClass("entra");
      }
    )



    $(".add").click(
      function(){
        if ($(this).hasClass("gira")) {
          $(this).removeClass("gira");
          $(".side-bar").removeClass("entra");
        }
        else{
          $(this).addClass("gira");
          $(".side-bar").addClass("entra");
        }
      }
    )

    $(document).click(function(){
      $("div").removeClass("entra");
      $("a").removeClass("gira");
    });

    $(".add").click(function(e){
      e.stopPropagation();
    });




});
