package anuncio.ifpb.api.controller;

import anuncio.ifpb.api.usuario.DadosUsuarioLogin;
import anuncio.ifpb.api.usuario.Usuario;
import anuncio.ifpb.api.usuario.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository repository;
    @PostMapping("/login")
    public DadosUsuarioLogin login(@Valid @RequestBody DadosUsuarioLogin dados) {
        Usuario usuario = repository.findByEmail(dados.email());

        if (usuario != null) {
            if (Objects.equals(usuario.getPassword(), dados.password())) {
                System.out.println(usuario.getEmail());
                return dados;
            }
        }
        return null;
    }
}
