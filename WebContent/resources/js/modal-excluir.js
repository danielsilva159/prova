
	Vue.component('excluir-funcionario',{
		props:['funcionario', 'texto', 'valor'],
		template:`
			<div class="modal in modal-active">
				<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								{{texto}}
								<button type="button" @click="$emit('close')" class="close"><span >&times;</span></button>
							</div>
							<div class="modal-body">
								
									{{valor}}
									
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" @click="$emit('close')">Fechar</button>
								<button type="button" class="btn btn-primary" @click="excluir(funcionario)">Confirmar</button>
							</div>
					</div>
				</div>
			</div>`,
			methods:{
				excluir(id){
				this.$parent.excluir(id);
				}
				
			}
	});
