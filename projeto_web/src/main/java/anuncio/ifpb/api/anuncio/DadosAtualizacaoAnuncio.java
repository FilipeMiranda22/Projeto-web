package anuncio.ifpb.api.anuncio;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoAnuncio(
		@NotNull
        Long id,
        String titulo,
        String descricao,
        Float valor,
        DadosEndereco endereco
	) {

	

}
