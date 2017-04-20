package intel.repository;

import intel.model.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// extend the repository to take Person objects
@RepositoryRestResource
public interface PersonRepository extends CrudRepository<Person, Long> {

}
