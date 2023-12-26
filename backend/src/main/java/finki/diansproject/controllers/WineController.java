package finki.diansproject.controllers;

import finki.diansproject.service.WineService;
import finki.diansproject.models.Wine;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/wines")
public class WineController {

    @Autowired
    private WineService wineService;

    @GetMapping
    public ResponseEntity<List<Wine>> getAllWines() {
        return new ResponseEntity<List<Wine>>(wineService.allWines(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Wine>> getOneWine(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Wine>>(wineService.oneWine(id), HttpStatus.OK);
    }
}
