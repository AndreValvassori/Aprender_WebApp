var Logado = 0;

var baseUrl = "http://192.168.0.100/aprender/Consulta.php";

function login() {
    
    var ulogin = document.getElementById("input_ulogin").value;
    var usenha = document.getElementById("input_usenha").value;
    
    var url = baseUrl + "?Tela=Login&Procedure=fncLogin&Login=" + ulogin + "&Senha=" + usenha;
    $.ajax({
        type: "GET",
        url: url,
        timeout: 3000,
        datatype: 'JSON',
        contentType: "application/json; charset=utf-8",
        cache: false,
        beforeSend: function () {
            //
        },
        error: function () {
            alert("Não foi possivel autenticar esse usuário! Verifique o Login e Senha!");
        },
        success: function (retorno) {
            var registros = retorno;
            $.each(registros, function (i, registro) {               
                
				// Testando validação com Banco de dados
                alert("Logou: "+registro.Nome);
                
                console.log(registro);
                
                document.getElementById("telaLicoes").classList.remove('hidden');

            });
        }
    });
}

function Cadastro(){

	var Nome 	= document.getElementById("input_CadastroNome").value;
	var Email 	= document.getElementById("input_CadastroEmail").value;
	var Login 	= document.getElementById("input_CadastroLogin").value;
	var Senha 	= document.getElementById("input_CadastroSenha").value;
	
	var url = baseUrl + "?Tela=Cadastro&Procedure=fncCadastro&Nome" + Nome + "&Email=" + Email + "&Login=" + Login + "&Senha=" + Senha;
	$.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'salvar.php',
                async: true,
                data: dados,
                error: function () {
                    alert("Não foi possivel cadastrar!");
                },
                success: function(response) {
					alert("Cadastro realizado!");
                    location.reload();
                }
            });
}	

function cadastroDependente()
{		

    var Nome = document.getElementById("frmCadastroDep_Nome").value;
    var Idade = document.getElementById("frmCadastroDep_Idade").value;
    var Sexo = document.getElementById("frmCadastroDep_Sexo").value;
	var Nivel;
	
	var radios = document.getElementsByName('Nivel_AlfabetizacaoDep');

	for (var i = 0, length = radios.length; i < length; i++)
	{
	 if (radios[i].checked)
	 {
		Nivel = radios[i].value;
		break;
	 }
	}
	
	var url = baseUrl + "?Tela=CadastroDependente&Procedure=fncCadastroDep&Login=" + Login + "&Nome=" + Nome + "&Idade=" + Idade + "&Sexo=" + Sexo + "&Nivel=" + Nivel;
	$.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'salvar.php',
                async: true,
                data: dados,
                success: function(response) {
                    location.reload();
                }
            });
	
}
