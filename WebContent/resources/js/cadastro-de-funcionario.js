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
			const vm = this;
			axios.get("/funcionarios/rs/setor")
			.then(response => {vm.listaSetor = response.data;
			document.title = this.id?'Alterar dados do funcionario': "Cadastrar um novo funcionario";
			this.atualizarCampos();
			}).catch(function (error) {
				vm.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
			}).finally(function() {
			});
		},
		enviarFormulario: function(){
			axios.get("/funcionarios/rs/setor", {
				id: this.setor
			}).then(setorSelecionado =>{
				this.setor = setorSelecionado.data[0];
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
			if(this.id){
				axios.get("/funcionarios/rs/funcionarios", {
					id: this.id
				}).then(funcionario =>{
					this.nome = funcionario.data[0].nome;
					this.email = funcionario.data[0].email;
					this.salario = funcionario.data[0].salario;
					this.idade = funcionario.data[0].idade;
					this.setor = funcionario.data[0].setor.id;
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