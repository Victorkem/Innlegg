hentInnlegg();


function hentInnlegg() {
    $.get("/hentAlleInnlegg", function (innleggListe) {
        console.log(innleggListe);
        let ut = "";


        for (let i = innleggListe.length - 1; i >= 0; i--) {
            let utKommentarer = "";
            let disabled = "";

            if (innleggListe[i].kommentarer.length == 0){
                disabled = " disabled ";
            }
            for (let k = innleggListe[i].kommentarer.length - 1; k >= 0; k--) {
                utKommentarer +=
                    `<div class="card card-body m-1">`+
                        `<p class="text-muted">`+"Lagt ut "+formaterDato(innleggListe[i].kommentarer[k].dato)+" | av "+innleggListe[i].kommentarer[k].navn+`</p>`+
                        `<h3 class="">`+innleggListe[i].kommentarer[k].innhold+`</h3>`+
                    `</div>`;
            }


            ut +=
                `<div class="card w-50 mx-auto mt-3 p-2 bg-light" id="` + `innlegg` + innleggListe[i].innleggId + `">` +
                `<p class="text-muted">` + "Lagt ut "+formaterDato(innleggListe[i].dato) + " | av " + innleggListe[i].navn +`</p>` +
                "<h2>" + innleggListe[i].innhold + "</h2>" +

                `   
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nyttInnlegModal`+innleggListe[i].innleggId+`">
                    Ny kommentar
                    </button>
                    <button class="btn btn-secondary mt-3`+disabled+`" type="button" data-bs-toggle="collapse" data-bs-target="#kommentarContainer`+innleggListe[i].innleggId+`" aria-expanded="false" aria-controls="kommentarContainer`+innleggListe[i].innleggId+`">
                    Kommentarer
                    </button>
                <div class="collapse" id="` + `kommentarContainer` + innleggListe[i].innleggId + `">`+utKommentarer+`</div>` +
                "</div>"+
                        `<div class="modal fade" id="nyttInnlegModal`+innleggListe[i].innleggId+`" tabindex="-1" aria-labelledby="nyttInnlegModal`+innleggListe[i].innleggId+`" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="nyttInnlegModal`+innleggListe[i].innleggId+`">Nytt Innlegg</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="form" action="" autocomplete="off" onsubmit="return false">
                            <h1 class="h1">Navn</h1>
                            <input class="form-control" id="navnInput` + innleggListe[i].innleggId + `" type="text">
                            <h1 class="h1">Innhold</h1>
                            <input class="form-control" id="innholdInput` + innleggListe[i].innleggId + `" type="text">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Avbryt</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="leggTilKommentar(` + innleggListe[i].innleggId + `)">Legg ut</button>
                    </div>
                </div>
            </div>
        </div>`
        }

            $("#innleggContainer").html(ut);


    })}







function formaterDato(inndato){

    let dato = new Date(inndato);
    utDato = "";

    const maneder = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
    const dager = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
    let maned = maneder[dato.getMonth()];
    let ukedag = dager[dato.getDay()];
    let dag = dato.getDate();
    let ar = dato.getFullYear();
    let time = ""+dato.getHours();
    if (time.length < 2){
        time = "0" + dato.getHours();
    }
    let minutter = ""+dato.getMinutes();
    if (minutter.length < 2){
        minutter = "0" + dato.getMinutes();
    }
    utDato = ukedag + " " + dag + " " + maned + " " + ar + " " + time + ":" + minutter;
    return utDato;
}
function leggTil(){
    const nyttInnlegg = {
        parentId : " ",
        innleggId : lagNyId(),
        navn : $("#navnInput").val(),
        innhold : $("#innholdInput").val(),
        dato : new Date()
    }

    $.post("/leggTil", nyttInnlegg, function (){
        console.log("lagt til innlegg")
        hentInnlegg();
    });
}









    function lagNyId(){
        let nyDato = new Date();
        let tall = Math.floor(Math.random() * 100000);
        let utId = nyDato.getFullYear()+ nyDato.getMonth()+ nyDato.getDay()+ nyDato.getHours()+ nyDato.getMinutes()+ nyDato.getSeconds() + tall.toString();
        console.log(utId);
        return utId;
    }







function leggTilKommentar(id){
    const nyKommentar = {
        parentId: id,
        innleggId : lagNyId(),
        navn : $(`#navnInput`+id).val(),
        innhold : $(`#innholdInput`+id).val(),
        dato : new Date()
    }
    console.log("kommentar: "+nyKommentar.innhold)
    $.post("/leggTilKommentar", nyKommentar, function (){
        console.log("lagt til kommentar")
        hentInnlegg();
    })




}