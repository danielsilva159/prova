Vue.component('todo-item', {
  template: '<h1>Isso é um item</h1>'
})
var inicio = new Vue({
	el:"#app",
    data: {
        listaSetor: [],
        nome: null,
        email: null,
        salario: null,
        idade: null,
        setor: null,
        mensagem: null,
        salvar: 'Enviar',
        id: null,
        titulo: 'Cadastrar um novo funcionario'
        
    },
    created: function(){
        let vm =  this;
        vm.buscaSetor();
    },
    methods:{
        buscaSetor: function(){
			this.atualizarCampos();
		},
		enviarFormulario: function(){
			let idSetor = this.setor;
			axios.get("/funcionarios/rs/setor/"+idSetor).then(setorSelecionado =>{
				console.log(setorSelecionado)
				this.setor = setorSelecionado.data;
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
				}).finally(()=> {
					const vm = this;
					axios.get("/funcionarios/rs/setor")
					.then(response => {vm.listaSetor = response.data;
					}).catch(function (error) {
				vm.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
					})
				})
				this.salvar = "Salvar";
			}
		},
		mostraAlertaErro(error){
			console.log('aqui');
			this.mensagem = error;
		}
    }
    
});