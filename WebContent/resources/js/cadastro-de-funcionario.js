
var inicio = new Vue({
	el:"#app",
    data: {
        listaSetor: [],
        nome: null,
        email: null,
        salario: null,
        idade: null,
        setor:'',
        mensagem: null,
        salvar: 'Enviar',
        id: null,
        titulo: 'Cadastrar um novo funcionario',
        erros:[],
        
    },
    
    created: function(){
        let vm =  this;
        vm.buscaSetor();
    },
    methods:{
        buscaSetor: function(){
			this.atualizarCampos();
			
		},
		enviarFormulario: function(evento){
			console.log(this.soNumero(this.idade));
			this.verificarErros();
			if(!this.erros.length){
				let idSetor = this.setor;
				axios.get("/funcionarios/rs/setor/"+idSetor).then(setorSelecionado =>{
					this.setor = setorSelecionado.data;
					console.log(this.setor);
				}).then(() =>{
					let funcionario = {
							id: this.id,
							nome: this.nome,
							email: this.email,
							salario: this.salario,
							setor:  this.setor,
							idade: this.idade
						};
					if(!this.id){
						
					axios.post("/funcionarios/rs/funcionarios", funcionario).then(response =>{
						this.limparCampos();
						this.mensagem = "Funcionario salvo com sucesso";
					}).catch(function (error){
						this.mostraAlertaErro("Erro interno");
					});
					}else{
						axios.put("/funcionarios/rs/funcionarios/"+this.id, funcionario).then(response =>{
	//						this.limparCampos();
							this.setor = funcionario.setor.id;
							this.mensagem = "Funcionario atualizado com sucesso";
							this.titulo = "Alterar dados do funcionario";
						}).catch(function (error){
							this.mostraAlertaErro(error);
						});
					}
				})
			}
		},
		limparCampos(){
			this.nome = null,
			this.email = null,
			this.salario = null,
			this.setor = null,
			this.idade = null
		},
		
		 atualizarCampos(){
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			this.id = urlParams.get('id')
			console.log(this.id);
			document.title = this.id?'Alterar dados do funcionario': "Cadastrar um novo funcionario";
			if(this.id){
				let id = this.id;
				 axios.get("/funcionarios/rs/funcionarios/"+id
				 ).then(funcionario =>{
					console.log(funcionario);
					this.nome = funcionario.data.nome;
					this.email = funcionario.data.email;
					this.salario = funcionario.data.salario;
					this.idade = funcionario.data.idade;
					this.setor = funcionario.data.setor.id;
				})
				this.salvar = "Salvar";
			}
				const vm = this;
				axios.get("/funcionarios/rs/setor")
				.then(response => {vm.listaSetor = response.data;
				}).catch(function (error) {
			vm.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
				})
			
		},
		mostraAlertaErro(error){
			console.log('aqui');
			this.mensagem = error;
		},
		verificarErros(){
			console.log(this.idade);
			console.log(typeof(idade))
			if(this.nome == null || this.nome == ""){
				this.erros.push("O nome não pode ficar vazio");
			}
			if(this.idade == null || this.idade == ""){
				this.erros.push("O idade não pode ficar vazio");
			}
			if(!this.validEmail(this.email)){
				this.erros.push("O E-mail não e valido");
			}
			
			this.zerarErros();
			
		},
		validEmail: function (email) {
		      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		      return re.test(email);
		},
		zerarErros(){
			setTimeout(() => {
				this.erros = [];
				this.mensagem = null;
			}, 10000);
		},
		soNumero(numeros) {
			let n = /\D/g;
		    return n.test(numeros);  
		},
		fecharMensagem(){
			this.mensagem = null;
		}
    }
    
});