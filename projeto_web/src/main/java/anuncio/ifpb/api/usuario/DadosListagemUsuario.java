package anuncio.ifpb.api.usuario;

public record DadosListagemUsuario(
		Long id, 
		String nome, 
		String email,
		Boolean isAdmin,
		String password
) {

	public DadosListagemUsuario(Usuario usuario) {
		this(usuario.getId(), 
			usuario.getNome(), 
			usuario.getEmail(), 
			usuario.getIsAdmin(),
				usuario.getPassword()
			);
	}

}
