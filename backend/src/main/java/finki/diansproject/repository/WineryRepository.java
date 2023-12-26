package finki.diansproject.repository;

import finki.diansproject.models.Winery;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WineryRepository extends MongoRepository<Winery, ObjectId> {
}
