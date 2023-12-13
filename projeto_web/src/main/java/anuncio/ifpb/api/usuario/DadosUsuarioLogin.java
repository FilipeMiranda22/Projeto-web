package anuncio.ifpb.api.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosUsuarioLogin(
        @NotBlank
        @Email
        String email,

        @NotBlank
        @NotNull
        String password
) {
}
