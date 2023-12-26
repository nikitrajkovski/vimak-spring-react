package finki.diansproject.controllers;

import finki.diansproject.service.WineryService;
import finki.diansproject.models.Winery;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/winery")
public class WineryController {
    @Autowired
    private WineryService wineryService;

    @GetMapping
    public ResponseEntity<List<Winery>> getAllWineries() {
        return new ResponseEntity<List<Winery>>(wineryService.allWineries(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Winery>> getOneWinery(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Winery>>(wineryService.oneWinery(id), HttpStatus.OK);
    }
}
