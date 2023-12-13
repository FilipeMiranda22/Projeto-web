package anuncio.ifpb.api.usuario;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoUsuario(
		@NotNull
        Long id,
        String nome,
        String telefone,
        DadosEndereco endereco,

		String password
	) {

	

}
