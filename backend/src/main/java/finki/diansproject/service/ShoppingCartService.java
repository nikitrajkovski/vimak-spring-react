package finki.diansproject.service;

import finki.diansproject.exceptions.ShoppingCartNotFoundException;
import finki.diansproject.exceptions.WineNotFoundException;
import finki.diansproject.models.ShoppingCart;
import finki.diansproject.models.Wine;
import finki.diansproject.repository.ShoppingCartRepository;
import finki.diansproject.repository.WineRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final WineRepository wineRepository;

    public ShoppingCartService(ShoppingCartRepository shoppingCartRepository, WineRepository wineRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.wineRepository = wineRepository;
    }

    public ShoppingCart getShoppingCartProducts(String shoppingCartId){
        return  shoppingCartRepository.findById(shoppingCartId)
                .orElseThrow(() -> new RuntimeException("ShoppingCart not found"));
    }
    public ShoppingCart addProductToShoppingCart(String shoppingCartId, ObjectId wineId) {
        ShoppingCart shoppingCart = shoppingCartRepository.findById(shoppingCartId)
                .orElseThrow(() -> new ShoppingCartNotFoundException("ShoppingCart not found"));

        Wine wineToAdd = wineRepository.findById(wineId)
                .orElseThrow(() -> new WineNotFoundException("Wine not found"));

        shoppingCart.getWines().add(wineToAdd);
        shoppingCartRepository.save(shoppingCart);
        return this.getShoppingCartProducts(shoppingCartId);
    }
    public ShoppingCart deleteItemFromShoppingCart(String shoppingCartId, ObjectId wineId) {
        ShoppingCart shoppingCart = shoppingCartRepository.findById(shoppingCartId)
                .orElseThrow(() -> new ShoppingCartNotFoundException("ShoppingCart not found"));

        shoppingCart.getWines().removeIf(wine -> wine.getId().equals(wineId));
        shoppingCartRepository.save(shoppingCart);
        return this.getShoppingCartProducts(shoppingCartId);
    }
}
