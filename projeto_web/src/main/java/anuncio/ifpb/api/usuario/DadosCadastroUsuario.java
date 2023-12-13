package anuncio.ifpb.api.usuario;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@SuppressWarnings("preview")
public record DadosCadastroUsuario(
		 
        @NotBlank
        String nome,
       
        @NotBlank
        @Email
        String email,
        
        @NotBlank
        String telefone,

        @NotBlank
        @NotNull
        String password,
        
        @NotNull 
        @Valid 
        DadosEndereco endereco) {

	;
}