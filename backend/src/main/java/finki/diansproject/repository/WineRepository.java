package finki.diansproject.repository;

import finki.diansproject.models.Wine;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WineRepository extends MongoRepository<Wine, ObjectId> {
}
