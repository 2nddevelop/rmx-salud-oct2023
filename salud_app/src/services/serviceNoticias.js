// apiService.js

export const useServiceNoticias = () => {

  const dataNoticias = [
    {
        nt_id: 1,
        nt_titulo: 'Noticia 1',
        nt_contenido: 'Noticia 1 Noticia 1 Noticia 1 Noticia 1 Noticia 1 Noticia 1 Noticia 1 ',
        nt_registrado: '2023-01-30 10:30',
        nt_usr_id: 11,
        nt_estado: 'A'
    },
    {
        nt_id: 2,
        nt_titulo: 'Noticia 2',
        nt_contenido: 'Noticia 2 Noticia 2 Noticia 2 Noticia 2 Noticia 2 Noticia 2 ',
        nt_registrado: '2023-01-30 10:30',
        nt_usr_id: 11,
        nt_estado: 'A'
    },
    {
        nt_id: 3,
        nt_titulo: 'Noticia 3',
        nt_contenido: 'Noticia 3 Noticia 3 Noticia 3 Noticia 3 Noticia 3 Noticia 3 Noticia 3 Noticia 3 Noticia 3 Noticia 3 ',
        nt_registrado: '2023-01-30 10:30',
        nt_usr_id: 11,
        nt_estado: 'A'
    },
    {
        nt_id: 4,
        nt_titulo: 'Noticia 4',
        nt_contenido: 'Noticia 4 Noticia 4 Noticia 4 Noticia 4 ',
        nt_registrado: '2023-01-30 10:30',
        nt_usr_id: 11,
        nt_estado: 'A'
    }
  ];

  const fetchData = async () => {
    try {
      const data = dataNoticias;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return {
    fetchData,
  };
};
