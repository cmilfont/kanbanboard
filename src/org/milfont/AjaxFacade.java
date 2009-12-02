package org.milfont;

import java.util.List;

public class AjaxFacade {

	
	private Repository repository = null;
	
	public void setRepository(Repository repository) {
		this.repository = repository;
	}
	
	public DataTransferObject find (Object filter) {
		DataTransferObject dto = new DataTransferObject();
		dto.setTotal(repository.count(filter));
		dto.setResults(repository.find(filter));
		return dto;
	}
	
	public List autocompletar(Object filter) {
		return repository.find(filter);
	}
	
	public Object save(Object obj) {
		return repository.persist(obj);
	}
	
	public boolean update(Story filter, String status) {
		Story story = (Story) repository.findById(filter);
		story.setStatus(Status.valueOf(status.toUpperCase()));
		//repository.persist(novo)
		return true;
	}
	
}
