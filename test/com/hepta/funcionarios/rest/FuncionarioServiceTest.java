package com.hepta.funcionarios.rest;



import org.junit.Test;

import com.hepta.funcionarios.entity.Funcionario;
import com.hepta.funcionarios.entity.Setor;
import com.hepta.funcionarios.persistence.FuncionarioDAO;
import com.hepta.funcionarios.persistence.SetorDAO;



class FuncionarioServiceTest {
	
	private SetorDAO setorDao = new SetorDAO();
	
	private Setor setor = new Setor();
	
//	@BeforeAll
//	static void setUpBeforeClass() throws Exception {
//	}
	
//	@IgnoreForBinding
//	void testFuncionarioRead() {
//		fail("Not yet implemented");
//	}

	@Test
	void testFuncionarioCreate() {
		
		
		Funcionario f1 = new Funcionario();
		FuncionarioDAO funcionarioDao = new FuncionarioDAO();
		try {
			setor = setorDao.find(1);
			f1.setNome("Gabriel");
			f1.setIdade(30);
			f1.setEmail("gabriel@emai.com");
			f1.setSalario(3000.0);
			f1.setSetor(setor);
			funcionarioDao.save(f1);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	
//	void testFuncionarioUpdate() {
//		fail("Not yet implemented");
//	}
//
//	
//	void testFuncionarioDelete() {
//		fail("Not yet implemented");
//	}

}
