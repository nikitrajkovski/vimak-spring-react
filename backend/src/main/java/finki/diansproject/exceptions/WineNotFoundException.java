package finki.diansproject.exceptions;

public class WineNotFoundException extends RuntimeException {
    public WineNotFoundException(String message) {
        super(message);
    }
}
