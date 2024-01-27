package finki.diansproject.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import finki.diansproject.models.*;
import finki.diansproject.payload.response.JwtResponse;
import finki.diansproject.repository.ShoppingCartRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import finki.diansproject.payload.request.LoginRequest;
import finki.diansproject.payload.request.SignupRequest;
import finki.diansproject.payload.response.UserInfoResponse;
import finki.diansproject.payload.response.MessageResponse;
import finki.diansproject.repository.RoleRepository;
import finki.diansproject.repository.UserRepository;
import finki.diansproject.security.jwt.JwtUtils;
import finki.diansproject.security.services.UserDetailsImpl;

//for Angular Client (withCredentials)
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials="true")
//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    ShoppingCartRepository shoppingCartRepository;



    @PostMapping("/signin")
//    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        String jwt = jwtUtils.generateJwtToken(authentication);


        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        String cartid = userDetails.getShoppingCart().getId();

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                cartid,roles
                ));
    }

    @PostMapping("/signup")
//    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        ShoppingCart shoppingCart = new ShoppingCart();
        int i=0;
        shoppingCart.setName("Cart" + i++);
        List<Wine> wines = new ArrayList<>();
        shoppingCart.setWines(wines);
        shoppingCart.setStatus(true);

        shoppingCartRepository.save(shoppingCart);
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                shoppingCart);

        user.setShoppingCart(shoppingCart);

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signout")
//    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<?> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        // Clear authentication
        SecurityContextHolder.clearContext();

        // Remove JWT cookie
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true) // Set to true if using HTTPS
                .maxAge(0)
                .path("/")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

        return ResponseEntity.ok(new MessageResponse("User logged out successfully!"));
    }
}