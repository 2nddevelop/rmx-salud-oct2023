// apiService.js

export const useServiceAvisos = () => {

  const dataAvisos = [
    {
        "avi_id": 1,
        "avi_titulo": "Aviso 1",
        "avi_contenido": "Aviso 1 aviso 1 aviso 1 aviso 1 aviso 1 aviso 1 aviso 1 aviso 1 aviso 1 aviso 1 aviso 1 ",
        "avi_registrado": "2023-06-21 16:11",
        "avi_usr_id": 11,
        "avi_estado": 'A'
    },
    {
        "avi_id": 2,
        "avi_titulo": "Aviso 2",
        "avi_contenido": "Aviso 2 aviso 2 aviso 2 aviso 2 aviso 2 aviso 2 ",
        "avi_registrado": "2023-06-22 18:21",
        "avi_usr_id": 11,
        "avi_estado": 'A'
    },
    {
        "avi_id": 3,
        "avi_titulo": "Aviso 3",
        "avi_contenido": "Aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 aviso 3 ",
        "avi_registrado": "2023-06-23 11:09",
        "avi_usr_id": 11,
        "avi_estado": 'A'
    }
  ];

  const fetchData = async () => {
    try {
      const data = dataAvisos;
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
