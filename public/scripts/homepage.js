$(document).ready(() => {
    let yerler = $.getJSON("/api/yerler");

    yerler
        .then(YerleriEkle);

    $("#myInput").keypress((e) => {
        if (e.which == 13) {
            YeniSehirEkle();
        }
    });

    $(".yerler").on("click", ".fa", function() {
        let tiklanan = $(this).parent().parent();
        let silinenURL = "/api/yerler/" + tiklanan.data("id");
        console.log(tiklanan);
        
        $.ajax({
            method: "DELETE",
            url: silinenURL
        }).then((silinenData) => {
            console.log(silinenData);
            tiklanan.remove();
        });
    });

    $(".yerler").on("click", "li", function() {
        ZiyaretDurumuGuncelle($(this));
    });
});

function YerleriEkle(yerler) {
    yerler.forEach(yer => {
        YerEkle(yer);
    });
}

function YerEkle(yer) {
    let yeniYer = $("<li class='yerlerimiz'>" + yer.isim + "<span> <i class='fa fa-trash-o' aria-hidden='true'> </i> </span> </li>");

    //silinmesi için gereken gizli bir id
    yeniYer.data("id", yer._id);

    //ziyaret edilme durumunu kontrol edebilmek için oluşturduğumuz data
    yeniYer.data("ziyaretDurumu", yer.ziyaret);

    if (yer.ziyaret == true) {
        $(yeniYer).addClass("ziyaretEdilmis");
    }
    
    $(".yerler").append(yeniYer);
}

function YeniSehirEkle() {
    let yeniSehir = $("#myInput").val();

    $.post("/api/yerler", { isim: yeniSehir })
        .then((yeniEklenenSehir) => {
            YerEkle(yeniEklenenSehir);
            $("#myInput").val("");
        });
}

function ZiyaretDurumuGuncelle(yer) {
    let guncellemeURL = "/api/yerler/" + yer.data("id");
    let ziyaretDurumu = yer.data("ziyaretDurumu");
    let guncelle = {
        ziyaret: !ziyaretDurumu
    };
    console.log(guncelle);
    
    $.ajax({
        method: "PUT",
        url: guncellemeURL,
        data: guncelle
    }).then((guncellenmisYer) => {
        console.log(guncellenmisYer);
        yer.toggleClass("ziyaretEdilmis");
        yer.data("ziyaretDurumu", !ziyaretDurumu);
    });
}