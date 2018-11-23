var Logado = 0;

var baseUrl = "http://192.168.0.100/aprender/Consulta.php";
//var baseUrl = "http://192.168.0.100/ws_aprender/";
//var baseUrl = "https://aprenderwebapps.azurewebsites.net/Consulta.php";

var dependentes = make2DArray(5,6);
document.getElementById('BotaoVoltar').onclick = function(){alert('Clicou em voltar!');};

function make2DArray(cols,rows){
    var arr = new Array(cols);
    for(var i=0; i<arr.length;i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

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
                //alert("Logou: "+registro.Nome);                
                
                localStorage.setItem("User_Logado", 1);
                localStorage.setItem("User_ID", registro.ID);
                localStorage.setItem("User_Nome", registro.Nome);
                localStorage.setItem("User_Login", registro.Login);
                localStorage.setItem("User_Email", registro.Email);
                localStorage.setItem("User_ts_Creat", registro._ts_Creat);
                
                console.log(registro);
                console.log(localStorage.Nome);
                
                //document.getElementById("telaLicoes").classList.remove('hidden');
                MostraTela("telaDependentes");
                CarregarDependentes(localStorage.getItem("User_ID"));
                
            });
        }
    });
}

function ShowCadastro(){    
    document.getElementById("telaLogin").classList.add('hidden');
    document.getElementById("telaCadastro").classList.remove('hidden');
    
}

function CarregarDependentes(id)
{    	
    console.log("Entrou Carregar Dependentes!");
    console.log(id);
	var url = baseUrl + "?Procedure=fncListarDependentes&id="+id;
    
    $.ajax({
        type: "GET",
        url: url,
        timeout: 3000,
        datatype: 'JSON',
        contentType: "application/json; charset=utf-8",
        cache: false,
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                    //alert("Não foi possivel cadastrar!");
                },
                success: function(retorno) {
                    console.log(retorno);
                    var contador = 0;
                    var listaDependente = retorno
                    $.each(listaDependente, function (i, dependente) {
                        dependentes[contador][0] = dependente.ID;
                        dependentes[contador][1] = dependente.Responsavel;
                        dependentes[contador][2] = dependente.Nome;
                        dependentes[contador][3] = dependente.Idade;
                        dependentes[contador][4] = dependente.Sexo;
                        dependentes[contador][5] = dependente.Nivel;
                        dependentes[contador][6] = dependente.Licao;
                        
                        //var item = '<span class="title">' + dependente.Nome + '</span>';
                        var item = '<span class="title">' + dependente.Nome + '</span>';
                        item += '<p>' + dependente.Idade + ' Anos' + '<br>';
                        item += '<span>' + 'Sexo: ' + dependente.Sexo + '<br><span>';
                        item += '<span>' + 'Nível: ' + dependente.Nivel + '</span>' + '</p>';
                        var li = '<li class="collection-item" onclick="CarregaTelaLicoes(this.id)" id='+contador+'>' + item + '</li>';
                        console.log(li);                        
                        //$('Lista_Dependentes').append(li);  
                        $("#Lista_Dependentes ul").append(li);
                        contador++;
                        console.log(dependente[contador]);
                    });
                }
            });
}

function CarregaTelaLicoes(id){
    console.log(id);
}

function MostraTela(nometela){
    document.getElementById("telaCadastro").classList.add('hidden');
    document.getElementById("telaLogin").classList.add('hidden');
    document.getElementById("telaCadastroDependente").classList.add('hidden');
    document.getElementById("telaLicoes").classList.add('hidden');
    document.getElementById("telaDependentes").classList.add('hidden');
    document.getElementById("telaLicao").classList.add('hidden');
    document.getElementById("telaPontuacao").classList.add('hidden');
    
    console.log(nometela);
    document.getElementById(nometela).classList.remove('hidden');    
}

function Cadastro(){

	var Nome 	= document.getElementById("input_CadastroNome").value;
	var Email 	= document.getElementById("input_CadastroEmail").value;
	var Login 	= document.getElementById("input_CadastroLogin").value;
	var Senha 	= document.getElementById("input_CadastroSenha").value;
	
	var url = baseUrl + "?Procedure=fncCadastrar&Nome=" + Nome + "&Email=" + Email + "&Login=" + Login + "&Senha=" + Senha;
    
    //dados = "{'Nome':'" + $Nome+ "', 'Email':'" + $Email+ "', 'Email':'" + $Email+ "', 'data3':'" + value3+ "'}",
    
    var dados = [
        {"Procedure": "fncCadastrar", "Nome":Nome, "Email":Email, "Login":Login, "Senha":Senha}        
    ]
        
    console.log(dados);
    
	$.ajax({
        type: "GET",
        url: url,
        timeout: 3000,
        datatype: 'JSON',
        contentType: "application/json; charset=utf-8",
        cache: false,
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                    //alert("Não foi possivel cadastrar!");
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
