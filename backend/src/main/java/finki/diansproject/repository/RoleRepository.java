package finki.diansproject.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import finki.diansproject.models.ERole;
import finki.diansproject.models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}