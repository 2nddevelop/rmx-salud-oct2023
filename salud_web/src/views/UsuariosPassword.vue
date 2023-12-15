<template>
  <div class="">
    <div>
      <div class="grid grid-cols-3">
        <div class="p-6 m-1">
          <h1>{{ title }}</h1>
        </div>
      </div>
    </div>
    
    <div class="p-4 m-1">
      <div class="form-group">
        <label for="email">Correo Electronico</label>
        <input type="email" v-model="reg.usr_email" class="form-control" name="email" id="email" placeholder="Correo Electronico" disabled/>
      </div>
    </div>

    <div class="p-4 m-1">
      <div class="form-group">
        <label for="password">Nueva Contrasena</label>
        <input type="password" v-model="reg.usr_clave" class="form-control" name="password" id="password" placeholder="Contrasena" />
      </div>
    </div>

    <div class="flex justify-center p-4 m-1">
      <button
        @click="saveModal()"
        class="form-control bg-green-500 disabled:bg-green-200 hover:bg-green-600 text-white py-2 px-4 m-1 rounded w-1/2"
        style="width: 50%;"
        title="Nuevo"
      >
        Cambiar Contraseña
      </button>
    </div>

  </div>
</template>


<script>
import userService from '../services/userService';
import centrosService from '../services/centrosService';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      regs: [],
      reg: {},
      title: "USUARIOS",
      plural: "Usuarios",
      singular: "Usuario",
      showModal: false,
      isEditing: false,
      currentDate: new Date(),
      filtro: { usuario_id:'0' },
      usr_id: '',
      usr_nombres: '',
    };
  },

  mounted() {
    this.usr_nombres = localStorage.getItem('usr_nombres');
    this.usr_id = localStorage.getItem('usr_id');
    console.log("RRRRR",this.usr_id, this.usr_nombres);
    this.listarRegistros();
  },

  methods: {
    async listarRegistros() {
      this.regs = [];
      try {
        this.regs = await userService.getDataXId( this.usr_id );
        console.log("Respuesta", this.regs);
        this.reg = this.regs[0];
        this.reg.usr_clave = '';
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    
    newRegistro() {
      this.isEditing = false;
      this.reg = { };
      this.showModal = true;
    },
    editRegistro(reg) {
      this.isEditing = true;
      this.reg = { ...reg };
      this.showModal = true;
    },

    async saveModal() {
      this.reg.usr_usr_id = 1; 
      this.reg.usr_estado = "P";
      if (this.isEditing) {
        this.reg.usr_estado = "S";
        const updatedReg = await userService.updateData(this.reg);
        const index = this.regs.findIndex(item => item.usr_id === updatedReg.usr_id);
            if (index !== -1) {
              this.regs.splice(index, 1, updatedReg);
            }
        } else {
          const savedReg = await userService.saveData(this.reg);
          this.regs.push(savedReg);
        }
        this.listarRegistros();
        this.closeModal();
      },


    async deleteRegistro(reg) {
      const confirmed = window.confirm("¿Estás seguro de tomar Signos Vitales?");
      if (confirmed) {
        try {
          const index = this.regs.findIndex(item => item.usr_id === reg.usr_id);
          if (index !== -1) {
            reg.usr_usr_id = 1;
            reg.usr_estado = "X";
            const updatedReg = await userService.updateData(reg);
          } else {
            console.error('No se encontró el registro para eliminar');
          }
        } catch (error) {
          console.error('Error al eliminar el registro:', error);
        }
        this.listarRegistros();
      }
    },

    closeModal() {
      this.showModal = false;
    },

    dates() {
      const year = this.currentDate.getFullYear();
      const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2); // Se agrega 1 ya que los meses van de 0 a 11
      const day = ('0' + this.currentDate.getDate()).slice(-2);

      this.filtro.fecha = `${year}-${month}-${day}`;
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

@media screen and (max-width: 600px) {
  .responsive thead {
    visibility: hidden;
    height: 0;
    position: absolute;
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
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px; /* Aumenta el ancho máximo del modal */
  width: 100%; /* Ocupará el 100% del ancho disponible */
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
}
</style>
