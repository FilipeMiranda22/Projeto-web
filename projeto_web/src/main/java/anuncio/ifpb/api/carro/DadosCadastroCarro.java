package anuncio.ifpb.api.carro;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@SuppressWarnings("preview")
public record DadosCadastroCarro(
		 
		@NotBlank
        String nome,
       
        @NotBlank
        String marca,
        
        @NotBlank
        String cor,
        
        @NotNull
        String descricao,

        @NotNull
        String image_url,
//        
        @Nullable
        Long anuncio_id,

        @Nullable
        String user_email
        
		) {

	;
}