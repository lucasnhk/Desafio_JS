/* BEM VINDO, MARINHEIRO 
   O desafio demorou mas saiu rápido
   Antes de tudo, leia todas as dicas e obersações no link do desafio
   ...
   *-* Todo conteudo dentro de $(document).ready( function() { ... } ); será execultado assim que carregar a página
*/
$(document).ready(function() {
    //Inserir um comando para deixar a div #alerta movel  (Dica: função da jqueryui)
    $('#alerta').draggable();
    //chamar a funcão chamada "contador"
    contador();
    //Fazer a alerta aparecer depois de 5 segundos, chamando ã função toggleAlert
    var time = setTimeout(alertaPage, 5000);
    
    function alertaPage() {
        toggleAlert(); 
        $('#alerta').removeAttr('hidden');
        $('#sombra').removeAttr('hidden');
        clearTimeout(time);    
    }



    //LIMPAR INPUT ANTES DE ATUALIZAR 
    $("input[name='email']").val("");
    //CLICANDO NO BOTÃO 'ENVIAR'
    $("#novidadesform [type='submit']").click(function(e) {
        e.preventDefault();

        //criar uma variavel e pegar o conteudo digitado na input
        var mail = $("#novidadesform [name='email']").val();

        //verificar se o campo não está vazio com if e else
        if(mail == '') { //se for vazio execultar o comando abaixo
            toastr.error('Preencha um email!', 'Error!'); //toastr.error('Preencha um email!', 'Error!');
        } else { 
            //se não for vazio enviar uma requisição com -requisição AJAX- do tipo POST para http://51.254.204.44/ti/enviar_email.php
            $.ajax({
                url: "http://51.254.204.44/ti/enviar_email.php",
                type: "POST",
                dataType: "JSON",
                data: { 'meuemail': mail } // -- passando o paramentro "meuemail" e o dataType JSON
                

            }).done(function(resposta) { //SE OCORRER TUDO CERTO COM A REQUISIÇAO:
                // 1° exibir um toastr.success com a mensagem  | 2° 
                toastr.success(mail + ' foi salvo na lista de novidades!');
                // 2° colocar um texto na div  de class resultado. "*emaildigitado* foi salvo em nossa lista de novidades =)"
                $('.resultado').html(mail + ' foi salvo na lista de novidades!');
                //limpar input
                $("novidadesform [name='email']").val("");
                //fechar a alerta depois de 2 segundos
                setTimeout(alertaPage, 2000);
                $('#sombra').attr('hidden', '');

            }).fail(function(jqXHR, textStatus) { //SE NÃO OCORRER TUDO CERTO COM A REQUISIÇAO: 
                // 1º a alerta ñ deve fechar.
                // 2º exibir um toastr.error com a mensagem do erro retornada pelo servidor
                toastr.error(textStatus);
                $("novidadesform [name='email']").css('box-shadow','inset 0 1px 1px red');


            }).always(function() {
    
            });
    


        }
        
    });

    //FUNDO ESCURO
    $("#sombra").click(function(e) {
        e.preventDefault();
        toggleAlert();
        $('#sombra').attr('hidden','');
    });

    //BOTAO X DO ALERTA
    $("#xis").click(function(e) {
        e.preventDefault();
        toggleAlert();
        $('#sombra').attr('hidden','');
    });



    //ESCONDER NAV
    var largura = $('html')["0"].clientWidth;
    largura = Number(largura);

    if(largura <= 767) {
        $('nav#menu').attr('hidden','');
    }
    
});

/* NÃO MEXER 
   Se tiver visível, após executar a função, a div será oculta e vice-versa
*/
function toggleAlert() {
    $('#alerta').slideToggle();
}

//Contador inicia em 5
var i = 5;

function contador() {

    $('#contador').html("Alerta aparecendo em: " + i);
    
    var inter = setInterval(function(){ 
        i--;

        //Ocultar a div #contador qnd o cronometro ser menor ou igual a ZERO
        if(i <= 0) { 
            $('#contador').hide();
            clearInterval(inter);
        }

        //Mudar a cor do texto da div #contador qnd o cronometro ser menor ou igual a TRES
        if(i <= 3) { 
            $('#contador').css('color', 'red');
        }

        //Sinalizar contador. Ex: Alerta aparecendo em: __  (usar a div #contador) 
        $('#contador').html("Alerta aparecendo em: " + i);              
        
    }, 1000);

    
}

// ---------------------------- PART II ----------------------------


//SCROLL SUAVE DE ÂNCORAS
$(function() {
    $('a.scrollSuave').bind('click',function(event){
        var $anchor = $(this);
        $('html, body').stop().animate({scrollTop: $($anchor.attr('href')).offset().top - 100}, 1500,'easeInOutExpo');
    });
// Outras Animações
/*
linear, swing, jswing, easeInQuad, easeInCubic, easeInQuart, easeInQuint, easeInSine, 
easeInExpo, easeInCirc, easeInElastic, easeInBack, easeInBounce, easeOutQuad, easeOutCubic, 
easeOutQuart, easeOutQuint, easeOutSine, easeOutExpo, easeOutCirc, easeOutElastic, easeOutBack, 
easeOutBounce, easeInOutQuad, easeInOutCubic, easeInOutQuart, easeInOutQuint, easeInOutSine, 
easeInOutExpo, easeInOutCirc, easeInOutElastic, easeInOutBack, easeInOutBounce
 */
                
});
/*
//ESCONDENDO MENU FIXO
$(function(){   
    var menu = $('#header-top');   
    
    $(window).scroll(function () { 
        if ($(this).scrollTop() > 650) { 
            menu.slideUp("fast"); 
        } else {
            menu.slideDown("fast");
        }
    });  
});
*/

var largura = $('html')["0"].clientWidth;
largura = Number(largura);


