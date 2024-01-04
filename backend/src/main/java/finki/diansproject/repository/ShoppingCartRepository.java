package finki.diansproject.repository;

import finki.diansproject.models.ShoppingCart;
import finki.diansproject.models.User;
import finki.diansproject.models.Wine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepository extends MongoRepository<ShoppingCart, String> {
}
