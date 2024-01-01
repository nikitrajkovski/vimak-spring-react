package finki.diansproject.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vinarii")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Winery {
    @Id
    private ObjectId id;
    private String winery_name;
    private String winery_location;
    private int year_created;
    private double winery_rating;
    private String most_popular_wine;
    private String most_bought_wine;
    private String url;
}
