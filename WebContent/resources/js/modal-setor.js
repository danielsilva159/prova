
	Vue.component('modal-setor',{
		data:function(){
			return {
				listaSetores: [],
				nomeSetor: null,
				id: null,
				mensagem: null
			}
		},
		template:`
			<div class="modal in modal-active">
				<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								Bem Vindo a tela de setores
								<button type="button" @click="fecharModal($event)" class="close"><span >&times;</span></button>
							</div>
							<div class="modal-body">
								<div v-if="mensagem" class="alert alert-primary alert-dismissible fade show" role="alert">
									<span>{{mensagem}}</span>
									<button type="button" @click="fecharMensagemSetor()" class="close">
										<span>&times;</span>
									</button>
								</div>
								<div class="col">
									<h3>Cadastrar um setor</h3>
									<div class="form-group input-setor">
										<input type="text"  id="nome" placeholder="Digite o nome do setor" v-model="nomeSetor">
										<button @click="salvarSetor()">Enviar</button>
									</div>
									</div>
								<h3>Todos os setores cadastrados</h3>
								<table class="table">
									<tr>
										<th>ID</th>
										<th>Nome</th>
										<th></th>
									</tr>
									<tbody id="event-table">
										<tr v-for="setor in listaSetores">
											<td>{{setor.id}}</td>
											<td>{{setor.nome}}</td>
											<td>
												<span @click="editarSetor(setor.id,setor.nome)">&#9998;</span>
												<span @click="excluirSetor(setor.id)">&#10006;</span>
											</td>
										</tr>
									</tbody>
								</table>

									
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" @click="fecharModal($event)">Fechar</button>
							</div>
					</div>
				</div>
			</div>`,
			
			 created: function(){
				 this.buscaSetores();
			 },
			methods:{
				excluirSetor(id){
					axios.get("/funcionarios/rs/funcionarios/setor/"+id).then(funcionarios =>{
						console.log(funcionarios);
						if(funcionarios.data.length){
							this.mensagem = "Esse setor não pode ser excluir, pois tem funcionario vinculado";
						}else{
							axios.delete("/funcionarios/rs/setor/"+id)
							.then(response => {
								this.buscaSetores();
								this.mensagem = "Setor excluido com sucesso";
							}).catch(function (error) {
								this.mostraAlertaErro("Erro interno", "Não foi deletar o setor");
							}).finally(function() {
							});
							
						}
					})
				},
				buscaSetores(){
					axios.get("/funcionarios/rs/setor")
					.then(response => {this.listaSetores = response.data;
					}).catch(function (error) {
						this.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
					}).finally(function() {
					});
				},
				salvarSetor(){
					let setor = {
							id:this.id,
							nome: this.nomeSetor
					}
					if(this.id != null){
						axios.put("/funcionarios/rs/setor/"+this.id, setor).then(response =>{
//							this.limparCampos();
							this.id = null;
							this.nomeSetor = null;
							this.mensagem = "setor atualizado com sucesso";
							this.buscaSetores();
						}).catch(function (error){
							this.mostraAlertaErro(error);
						});
					
					}else{
						if(!this.nomeSetor){
							this.mensagem = "O nome do setor não pode ficar vazio";
						}else{
							axios.post("/funcionarios/rs/setor", setor).then(response =>{
								this.limparCampos();
								this.buscaSetores();
								this.mensagem = "Setor salvo com sucesso";
							}).catch(function (error){
								this.mostraAlertaErro("Erro interno");
							});
						}
					}
				},
				limparCampos(){
					this.nomeSetor = null;
				},
				mostrarAlertErro(error){
					alert(error)
				},
				fecharModal(evento){
					this.$parent.fecharModal();
				},
				editarSetor(id,nome){
					console.log(nome);
					this.id = id;
					this.nomeSetor = nome; 
				},
				
				fecharMensagemSetor(){
					this.mensagem = null;
				}
				
				
				
			}
	});
