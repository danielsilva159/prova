package com.hepta.rest;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.hepta.funcionarios.entity.Funcionario;
import com.hepta.funcionarios.entity.Setor;
import com.hepta.funcionarios.persistence.SetorDAO;

@Path("/setor")
public class SetorService {

	@Context
	private HttpServletRequest request;

	@Context
	private HttpServletResponse response;

	private SetorDAO dao;

	public SetorService() {
		dao = new SetorDAO();
	}

	protected void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	/**
	 * Adiciona novo Setor
	 * 
	 * @param Setor: Novo Setor
	 * @return response 200 (OK) - Conseguiu adicionar
	 */
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@POST
	public Response SetorCreate(Setor setor) {
		
		try {
			dao.save(setor);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao salvar Funcionarios").build();
		}
		return Response.status(Status.OK).build();
	}

	/**
	 * Lista todos os Funcionarios
	 * 
	 * @return response 200 (OK) - Conseguiu listar
	 */
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@GET
	public Response SetorRead() {
		List<Setor> Setores = new ArrayList<>();
		try {
			Setores = dao.getAll();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao buscar setor").build();
		}

		GenericEntity<List<Setor>> entity = new GenericEntity<List<Setor>>(Setores) {
		};
		return Response.status(Status.OK).entity(entity).build();
	}
	
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@GET
	public Response SetorReadFindId(int id) {
		Setor s1 = new Setor();
		try {
			s1 = dao.find(id);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao buscar o setor").build();
		}

		GenericEntity<Setor> entity = new GenericEntity<Setor>(s1) {
		};
		return Response.status(Status.OK).entity(entity).build();
	}

	
	

	/**
	 * Atualiza um setor
	 * 
	 * @param id:          id do setor
	 * @param Setor: Setor atualizado
	 * @return response 200 (OK) - Conseguiu atualizar
	 */
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@PUT
	public Response FuncionarioUpdate(@PathParam("id") Integer id, Setor setor) {
		try {
			dao.update(setor);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao atualizar o setor").build();		
			}
		return Response.status(Status.OK).build();
	}

	/**
	 * Remove um Setor
	 * 
	 * @param id: id do Setor
	 * @return response 200 (OK) - Conseguiu remover
	 */
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@DELETE
	public Response FuncionarioDelete(@PathParam("id") Integer id) {
		try {
			dao.delete(id);;
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Erro ao deletar o setor").build();		
			}
		return Response.status(Status.OK).build();
	}

}
