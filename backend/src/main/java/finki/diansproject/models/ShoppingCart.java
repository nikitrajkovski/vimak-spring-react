package finki.diansproject.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document(collection = "shoppingCart")
public class ShoppingCart {
    @Id
    private String id;
    private String name;
    @Field("wines")
    @DBRef
    private List<Wine> wines;
    private boolean status;

    public ShoppingCart(String id, String name, List<Wine> wines, boolean status) {
        this.id = id;
        this.name = name;
        this.wines = wines;
        this.status = status;
    }
}
