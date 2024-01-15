<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
      <h1 class="text-xl font-bold tracking-tight text-gray-900">{{ title }}</h1>
    </div>
  </header>

  <div class="">
    <div>
      <div class="grid grid-cols-4 p-1 m-1">
        <div>
        </div>
        <div></div>
        <div></div>
        <div class="flex justify-end">
          <button
            @click="newRegistro()"
            class="form-control bg-green-500 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
            title="Nuevo"
          >
            + Nuevo
          </button>
        </div>
      </div>
    </div>
    <div style="overflow-x: auto">
      <table class="table table-responsive">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th></th>
            <th>TITULO</th>
            <th>CONTENIDO</th>
            <th>REGISTRADO</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in regs" :key="r.nt_id">
            <td width="3%" align="right">{{ index + 1 }}</td>
            <td>
              <button
              @click="editRegistro(r)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-full"
                title="Editar"
              >
                <i class="fa-solid fa-pencil"></i>
              </button>
              <button
                @click="deleteRegistro(r)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                title="Eliminar"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
            <td align="right">{{ r.nt_titulo }}</td>
            <td align="right">{{ r.nt_contenido }}</td>
            <td align="right">{{ r.nt_registrado }}</td>
            <td align="right">{{ r.nt_estado }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
              <td colspan="13">Son n {{ plural }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
              class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
            >
              <h2
                class="modal-title text-xl font-semibold text-gray-900 dark:text-white"
              >
                {{ isEditing ? "EDITAR " : "NUEVO " }} {{ singular }}
              </h2>
              <button
                type="button"
                @click="closeModal()"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <i class="fa-solid fa-close"></i>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <div class="grid grid-cols-1 m-0">
                <div>
                  <label for="codigo">Titulo:</label>
                  <input v-model="reg.nt_titulo" class="form-control" name="codigo" id="codigo" placeholder="Titulo" />
                </div>
                <div>
                  <label for="descripcion">Contenido:</label>
                  <textarea v-model="reg.nt_contenido" class="form-control" name="descripcion" id="descripcion" placeholder="Contenido" ></textarea>
                </div>
              </div>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
              <button @click="saveModal" class="bg-green-500 hover-bg-green-600 text-white font-bold py-2 px-4 m-1 rounded" :title="isEditing ? 'Actualizar' : 'Guardar'">
                {{ isEditing ? "Actualizar" : "Guardar" }}
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
  

<script>

  import noticiasService from '../../services/noticiasService';

  import '@fortawesome/fontawesome-free/css/all.css';

  export default {
    data() {
      return {
        regs: [],
        reg: {},
        title: "NOTICIAS",
        plural: "Noticias",
        singular: "Noticia",
        showModal: false,
        isEditing: false,
      };
    },
    mounted() {
      this.listarRegistros();
    },

    methods: {
          async listarRegistros() {
            try {
            this.regs = await noticiasService.getData();
            console.log('Registros: ', this.regs);
            } catch (error) {
            console.error('Error:', error.message);
            }
        },
        newRegistro() {
            this.isEditing = false;
            this.reg = {};
            this.showModal = true;
        },
        editRegistro(reg) {
            this.isEditing = true;
            this.reg = { ...reg };
            this.showModal = true;
        },
        
        
        async saveModal() {
              this.reg.nt_usr_id = 1; 
              this.reg.nt_estado = "A";
            if (this.isEditing) {
              const updatedReg = await noticiasService.updateData(this.reg);
              const index = this.regs.findIndex(item => item.nt_id === updatedReg.nt_id);
              if (index !== -1) {
                this.regs.splice(index, 1, updatedReg);
              }
            } else {
              const savedReg = await noticiasService.saveData(this.reg);
              this.regs.push(savedReg);
            }
            this.closeModal();
        },


        async deleteRegistro(reg) {
          const confirmed = window.confirm("¿Estás seguro de eliminar este registro?");
          if (confirmed) {
            try {
              const index = this.regs.findIndex(item => item.nt_id === reg.nt_id);
              if (index !== -1) {
                reg.nt_usr_id = 1;
                reg.nt_estado = "X"; 
                await noticiasService.deleteData(reg); 
                this.regs.splice(index, 1); 
              } else {
                console.error('No se encontró el registro para eliminar');
              }
            } catch (error) {
              console.error('Error al eliminar el registro:', error);
            }
          }
        },
        
        closeModal() {
            this.isEditing = false;
            this.showModal = false;
        },
    },
  };
</script>


<style>
* {
  box-sizing: border-box;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
  font-size: x-small;
}

.table th {
  padding: 7px 10px;
  border: 1px solid;
  font-weight: bold;
  color: white;
  background: hsla(160, 100%, 37%, 1);
  vertical-align: top;
}

.table td {
  padding: 7px 10px;
  border: 1px solid;
  border-block-color: rgb(190, 197, 195);
}

.word-break {
  word-break: break-all;
}

.scroll-container {
  overflow: auto;
  margin-bottom: 40px;
  border-left: 1px solid;
  border-right: 1px solid;
}

.scroll {
  margin: 0;
}

.scroll td:first-of-type {
  position: sticky;
  left: 0;
  border-left: none;
  background: #f4f4f4;
  color: #212121;
  font-weight: bold;
}

.scroll td:last-of-type {
  border-right: none;
}

@media (max-width: 600px) {
  .modal-content {
    width: 90%; 
    max-width: none;
  }


  .responsive tr {
    display: block;
    margin-bottom: 0.625em;
  }

  .responsive td {
    border: 1px solid;
    border-bottom: none;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  .responsive td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  .responsive td:last-child {
    border-bottom: 1px solid;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; 
}

.modal-content {
  background-color: #fff;
  padding: 1px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%; 
  max-width: 700px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.modal-content table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.modal-content th, .modal-content td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.modal-footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-footer button:hover {
  background-color: #f0f0f0;
}


/* Form field styles */
.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Asegura que el padding no aumente el tamaño total */
}

/* Modal footer styles 
.modal-footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}*/
</style>
