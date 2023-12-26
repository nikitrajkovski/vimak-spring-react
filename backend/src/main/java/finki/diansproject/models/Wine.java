package finki.diansproject.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vina")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Wine {
    @Id
    private ObjectId id;
    private String wine_name;
    private String wine_type;
    private String grape_used;
    private int wine_year;
    private int wine_price;
    private int wine_rating;
//    @DocumentReference
    private String winery;
    private String wine_url;
}
