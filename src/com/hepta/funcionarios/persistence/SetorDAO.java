package com.hepta.funcionarios.persistence;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.hepta.funcionarios.entity.Setor;

public class SetorDAO {

	public void save(Setor setor) throws Exception {
		EntityManager em = HibernateUtil.getEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(setor);
			em.getTransaction().commit();
		} catch (Exception e) {
			em.getTransaction().rollback();
			throw new Exception(e);
		} finally {
			em.close();
		}
	}

	public Setor update(Setor Setor) throws Exception {
		EntityManager em = HibernateUtil.getEntityManager();
		Setor SetorAtualizado = null;
		try {
			em.getTransaction().begin();
			SetorAtualizado = em.merge(Setor);
			em.getTransaction().commit();
		} catch (Exception e) {
			em.getTransaction().rollback();
			throw new Exception(e);
		} finally {
			em.close();
		}
		return SetorAtualizado;
	}

	public void delete(Integer id) throws Exception {
		EntityManager em = HibernateUtil.getEntityManager();
		try {
			em.getTransaction().begin();
			Setor setor = em.find(Setor.class, id);
			em.remove(setor);
			em.getTransaction().commit();
		} catch (Exception e) {
			em.getTransaction().rollback();
			throw new Exception(e);
		} finally {
			em.close();
		}

	}

	public Setor find(Integer id) throws Exception {
		EntityManager em = HibernateUtil.getEntityManager();
		Setor setor = null;
		try {
			setor = em.find(Setor.class, id);
		} catch (Exception e) {
			em.getTransaction().rollback();
			throw new Exception(e);
		} finally {
			em.close();
		}
		return setor;
	}

	@SuppressWarnings("unchecked")
	public List<Setor> getAll() throws Exception {
		EntityManager em = HibernateUtil.getEntityManager();
		List<Setor> setor = new ArrayList<>();
		try {
			Query query = em.createQuery("FROM Setor");
			setor = query.getResultList();
		} catch (Exception e) {
			em.getTransaction().rollback();
			throw new Exception(e);
		} finally {
			em.close();
		}
		return setor;
	}

}
