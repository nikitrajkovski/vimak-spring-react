package finki.diansproject.service;

import finki.diansproject.repository.WineryRepository;
import finki.diansproject.models.Winery;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WineryService {
    @Autowired
    public WineryRepository wineryRepository;

    public List<Winery> allWineries() {
        return wineryRepository.findAll();
    }

    public Optional<Winery> oneWinery(ObjectId id) {
        return wineryRepository.findById(id);
    }
}
