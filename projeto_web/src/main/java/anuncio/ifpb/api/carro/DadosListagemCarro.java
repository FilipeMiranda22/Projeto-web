package anuncio.ifpb.api.carro;

public record DadosListagemCarro(
		Long id, 
		String nome, 
		String marca,
		String cor,
		String descricao,

		String image_url,
		Long idAnuncio
		) {

	public DadosListagemCarro(Carro carro) {
		this(carro.getId(), 
			carro.getNome(), 
			carro.getMarca(), 
			carro.getCor(),
			carro.getDescricao(),
			carro.getImageUrl(),
			(carro.getAnuncio() == null) ? null : carro.getAnuncio().getId()
			);

    }

}
