package anuncio.ifpb.api.anuncio;

public record DadosListagemAnuncio(
		Long id, 
		String titulo, 
		String descricao,
		Float valor,
		String rua,
		String bairro,
		String cidade,
		Long idAnunciante,
		String nomeAnunciante,
		String carroNome,
		String image_url,

		String telefone_anunciante,
		Long idCarro,
		String uf
		) {

	public DadosListagemAnuncio(Anuncio anuncio) {
		this(anuncio.getId(), 
			anuncio.getTitulo(), 
			anuncio.getDescricao(), 
			anuncio.getValor(),
			anuncio.getEndereco().getLogradouro(),
			anuncio.getEndereco().getBairro(),
			anuncio.getEndereco().getCidade(),
			anuncio.getAnunciante().getId(),
			anuncio.getAnunciante().getNome(),
			anuncio.getCarro().getNome(),
			anuncio.getCarro().getImageUrl(),
			anuncio.getAnunciante().getTelefone(),
			anuncio.getCarro().getId(),
			anuncio.getEndereco().getUf()
			);
	}

}
