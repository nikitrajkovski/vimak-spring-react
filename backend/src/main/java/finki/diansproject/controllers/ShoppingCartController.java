package finki.diansproject.controllers;

import finki.diansproject.models.ShoppingCart;
import finki.diansproject.models.Wine;
import finki.diansproject.service.ShoppingCartService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/shopping-cart")
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;

    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<ShoppingCart> getShoppingCart(@PathVariable String id) {

        return new ResponseEntity<ShoppingCart>(shoppingCartService.getShoppingCartProducts(id), HttpStatus.OK);
    }
    @PostMapping("/add-product/{shoppingCartId}/{wineId}")
    public ResponseEntity<ShoppingCart> addProductInShoppingCart(@PathVariable String shoppingCartId,@PathVariable ObjectId wineId) {

        return new ResponseEntity<ShoppingCart>(shoppingCartService.addProductToShoppingCart(shoppingCartId,wineId), HttpStatus.OK);
    }
    @PostMapping("/delete-product/{shoppingCartId}/{wineId}")
    public ResponseEntity<ShoppingCart> deleteProductInShoppingCart(@PathVariable String shoppingCartId,@PathVariable String wineId) {

        return new ResponseEntity<ShoppingCart>(shoppingCartService.deleteItemFromShoppingCart(shoppingCartId,wineId), HttpStatus.OK);
    }
}
