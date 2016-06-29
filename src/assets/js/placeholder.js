// Adiciona placeholder aos campos de texto caso o browser seja um internet explorer abaixo da versão 10
$(document).ready(function(){
	$('input[type="text"], input[type="password"], textarea').each(function() {
		$(this).val( $(this).attr('placeholder') );
	});
});
