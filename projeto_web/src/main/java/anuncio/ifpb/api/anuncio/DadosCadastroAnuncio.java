package anuncio.ifpb.api.anuncio;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@SuppressWarnings("preview")
public record DadosCadastroAnuncio(
		 
		@NotBlank
        String titulo,
       
        @NotBlank
        String descricao,
        
        
        @NotNull
        Float valor,
//        
        @NotNull
        String user_email,

        @NotNull
        Long car_id,
        
        @NotNull 
        @Valid 
        DadosEndereco endereco
        ) {

	;
}