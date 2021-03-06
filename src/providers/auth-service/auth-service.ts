import { Injectable } from '@angular/core';
import { App, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Dados do usuário
export class User {
	public dados: any;
	public cadastro: any;
	public licencas: any;
	public averbacoes: any;
	public decretos: any;
	public diarias: any;
	public portarias: any;
	public lotacao: any;

	public dadosPessoais: any;
	public dadosProfissionais: any;
	public documentos: any;

	public login: string;	
	public token: string;
	public id_autorizacao: number;
	public url_autorizacao: string;
	public liberado: boolean;

	constructor(login: string, liberado: boolean, id_autorizacao: number, url_autorizacao: string) {
		this.login = login;
		this.liberado = liberado;
		this.id_autorizacao = id_autorizacao;
		this.url_autorizacao = url_autorizacao;
	}
	
}

@Injectable()
export class AuthServiceProvider {
  public currentUser: User;

  public efetuarLogin(login, loadingToDismiss) {
  	if(login === null) {
  		return Observable.throw("Por favor, informe seu login.");
  	} else {
	    // Solicite o token
	    var headers = new Headers();
	    headers.append("Content-Type", "application/json");
	    let requestOptions = new RequestOptions({headers: headers});

  		// Requisição para solicitação de acesso
  		return Observable.create(observer => {
		 	// Host
		    var host = "http://hackathonapi.sefaz.al.gov.br/sfz-habilitacao-aplicativo-api/api/public/autorizacao-aplicativo/solicitar";
		  	var parametros = {
		  		login: login, // desmistificando: parâmetro que vai pro post = parâmetro que vem do método.
		  		nomeDispositivo: "PLUS-GPMOB",
		  		tokenApp: "64cfdcee98ea53c99741bb4d285ece934209f237"
		  	};

			this.http.post(host, parametros, requestOptions)
			    .map(res => res.json())
			    .subscribe(
			      data => {
			      	// 200 OK - {idAutorizacao: number, urlAutorizacao: string}
			      	this.currentUser = new User(login, false, data.idAutorizacao, data.urlAutorizacao);
		  			observer.next(true);
			      },
			      err => {
			      	var retorno = JSON.parse(err._body);
			        this.erro(retorno.mensagem);
			      }
			 );

			 loadingToDismiss.dismiss();
  		});
  	}
  }

  public getAuthorization() {
  		// Requisição para token de autorização
  		// Neste ponto o usuário já foi localizado no sistema pelo seu login =)
  		return Observable.create(observer => {
		 	// Host
		    var headers = new Headers();
		    headers.append("Content-Type", "application/json");
		    let requestOptions = new RequestOptions({headers: headers});
		    // let http: Http;

		    var host = "http://hackathonapi.sefaz.al.gov.br/api/public/autenticar";
		  	var parametros = {
		  		login: this.currentUser.login,
		  		idAutorizacao: this.currentUser.id_autorizacao,
		  		tokenApp: "64cfdcee98ea53c99741bb4d285ece934209f237"
		  	};

		  	var avancar = false;
			this.http.post(host, parametros, requestOptions)
			    .map(res => res.json())
			    .subscribe(
			      data => {
			      	// 200 OK
			      		this.currentUser.liberado = true;
			      		this.currentUser.token = data.id_token;
			      		avancar = true;

			      		// Já pode pegar as informações do funcionário logado
			      		this.getUserApiRequest("http://hackathonapi.sefaz.al.gov.br/sfz_ficha_funcional_api/api/public/fichaFuncional")
						.subscribe(dadosUsuario => {
							this.currentUser.dados = dadosUsuario;
							this.organizarRelacoes();
						});

						// Armazenamento em local storage para persistência
			      		window.localStorage.setItem("user", JSON.stringify(this.currentUser));
			      },
			      err => {
			      	// Deu algum problema
			      	avancar = false;
			      }
			 );
		  	observer.next(avancar);
		  	observer.complete();

  		});
  }

  public getUserInfo(): User {
  	if (this.currentUser && this.currentUser.liberado) {
	  	this.organizarRelacoes();
  	}
  	return this.currentUser;
  }

  public getLocalUser() {
  	var localUser = window.localStorage.getItem("user");
  	if (localUser) {
  		this.currentUser = JSON.parse(localUser);
  		return true;
  	}
  	return false;
  }

  // Padrão para fazer requisições para as API's
  public getUserApiRequest(host, method = "get", parametros = {}) {
	var headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Authorization", "Bearer " + this.currentUser.token);
	let requestOptions = new RequestOptions({headers: headers});

  		// Requisição para solicitação de acesso
  	var req: any;
  	return Observable.create(observer => {
  		if (method == "get") {
  			req = this.http.get(host, requestOptions);
  		} else {
  			req = this.http.post(host, parametros, requestOptions);
  		}

		// Requisição padrão
		req.map(res => res.json())
		.subscribe(
			data => {
				// 20x
			    observer.next(data);
			    observer.complete();
			},
			err => {
			    this.erro("Houve um problema ao tentar completar sua solicitação.");
			}
		);
	});
  }

  // Constructor do AuthServiceProvider
  constructor(public http: Http, public alertCtrl: AlertController, public app: App) {

  }

  erro(mensagem) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  navegar(destino, parametros = {}) {
	this.app.getRootNav().setRoot(destino, parametros);
  }

  public logout() {
    return Observable.create(observer => {
	  window.localStorage.clear();
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
   }

  public organizarRelacoes() {
  	this.currentUser.averbacoes = Array();
  	this.currentUser.portarias = Array();
  	this.currentUser.licencas = Array();
  	this.currentUser.diarias = Array();
  	this.currentUser.lotacao = Array();
  	this.currentUser.cadastro = Array();
  	this.currentUser.decretos = Array();

  	// Separar os grupos: 
  	var dados = this.currentUser.dados;
  	var grupos = dados.grupos;

  	// Subgrupos de cadastro
  	var tiposDadosPessoais = ["Nome", "Nome da Mãe", "Nome do Pai", "Estado Civil", "Data de Nascimento"];
  	var tiposDadosProfissionais = ["Nomeação", "Número de Ordem", "Cargo Efetivo", "Lotação", "Data de Posse", "Vínculo", "Grau de Instrução"];
  	var tiposDocumentos = ["Identidade", "CPF", "PIS/PASEP", "Título de Eleitor"];

  	// Inicia o processamento dos grupos
  	for(var i in grupos) {
  		var grupoAtual = grupos[i];
  		var dadosGrupo = grupoAtual.dados;
  		for(var dadoIndex in dadosGrupo) {
  			var dadoAtual = dadosGrupo[dadoIndex];
  			// Quem é quem
  			if (grupoAtual.descricao == "Averbações") {
  				this.currentUser.averbacoes.push(dadoAtual);
  			} else if (grupoAtual.descricao == "Decretos") {
  				this.currentUser.decretos.push(dadoAtual);  				
  			} else if (grupoAtual.descricao == "Cadastro") {
  				// Salva todos os dados do cadastor
  				this.currentUser.cadastro.push(dadoAtual);  				
  			} else if (grupoAtual.descricao == "Portarias") {
  				// Tratar o tipo portarias
  				var nomeTipo = dadoAtual.tipoDadoFichaFuncional.nomeTipo;
  				if (this.currentUser.portarias[nomeTipo] == undefined) {
  					this.currentUser.portarias[nomeTipo] = Array();
  				}
  				this.currentUser.portarias[nomeTipo].push(dadoAtual);
  			}
  		}	
  	}


  	// Agora, faz a segmentação do cadastro
	this.currentUser.dadosPessoais = Array();
	this.currentUser.dadosProfissionais = Array();
	this.currentUser.documentos = Array();
  	for(var cadastroIndex in this.currentUser.cadastro) {
  		var cadastroAtual = this.currentUser.cadastro[cadastroIndex];
  		var nomeTipo = cadastroAtual.tipoDadoFichaFuncional.nomeTipo;

  		if (tiposDadosProfissionais.indexOf(nomeTipo) > -1) {
  			this.currentUser.dadosProfissionais[nomeTipo] = cadastroAtual.descricao;
  		} 

  		if (tiposDadosPessoais.indexOf(nomeTipo) > -1) {
  			this.currentUser.dadosPessoais[nomeTipo] = cadastroAtual.descricao;
  		}

  		if (tiposDocumentos.indexOf(nomeTipo) > -1) {
  			this.currentUser.documentos[nomeTipo] = cadastroAtual.descricao;
  		}  		  		
  	}  	
  }   	

}
