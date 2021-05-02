
	Vue.component('modal-setor',{
		data:function(){
			return {
				listaSetores: [],
				nomeSetor: null
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
												<span @click="editarSetor(setor.nome)">&#9998;</span>
												<span @click="excluirSetor(setor.id)">&#10006;</span>
											</td>
										</tr>
									</tbody>
								</table>

									
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" @click="fecharModal($event)">Fechar</button>
								<button type="button" class="btn btn-primary" @click="excluir()">Confirmar</button>
							</div>
					</div>
				</div>
			</div>`,
			
			 created: function(){
				 this.buscaSetores();
			 },
			methods:{
				excluirSetor(id){
					axios.delete("/funcionarios/rs/setor/"+id)
					.then(response => {
						this.buscaSetores();
					}).catch(function (error) {
						vm.mostraAlertaErro("Erro interno", "Não foi listar natureza de serviços");
					}).finally(function() {
					});
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
							nome: this.nomeSetor
					}
					axios.post("/funcionarios/rs/setor", setor).then(response =>{
						this.limparCampos();
						this.buscaSetores();
						this.mensagem = "Funcionario salvo com sucesso";
					}).catch(function (error){
						this.mostraAlertaErro("Erro interno");
					});
				},
				limparCampos(){
					this.nomeSetor = null;
				},
				mostrarAlertErro(error){
					alert(error)
				},
				fecharModal(evento){
					this.$parent.fecharModal();
				}
				
			}
	});
