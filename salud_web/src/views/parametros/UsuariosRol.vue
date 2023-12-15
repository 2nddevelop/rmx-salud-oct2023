<template>
    <div class="">
      <div>
        <div class="grid grid-cols-3">
          <div class="p-6 m-1">
            <h1>{{ title }}</h1>
          </div>
          <div></div>
          <div class="flex justify-end p-6 m-1">
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
              <th>Usuario</th>
              <th>Rol</th>
              <th>Registrado</th>
              <th>E</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, index) in regs" v-bind:key="r.urol_id">
              <td align="right">{{ index + 1 }}</td>
              <td>
                <button
                  @click="editRegistro(r)"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-1 rounded"
                  title="Editar"
                >
                  <i class="fa-solid fa-pencil"></i>
                </button>
                <button
                  @click="deleteRegistro(r)"
                  class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 m-1 rounded"
                  title="Eliminar"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
              <td align="left">{{ r.usr_email }}</td>
              <td align="left">{{ r.rol_codigo }} - {{ r.rol_descripcion }}</td>
              <td align="right">{{ r.urol_registrado }}</td>
              <td align="center">{{ r.urol_estado }}</td>
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
              <div class="grid grid-cols-2 gap-3">
                <div class="form-group">
                    <label for="urol_usuario_id" class="font-semibold">Usuario</label>
                    <select v-model="reg.urol_usuario_id" class="form-control" name="urol_usuario_id" id="urol_usuario_id" placeholder="Usuario" required>
                      <option value="0">-- seleccione --</option>
                      <option v-for="u in users" :key="u.usr_id" :value="u.usr_id">{{ u.usr_email }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="urol_rol_id" class="font-semibold">Rol</label>
                    <select v-model="reg.urol_rol_id" class="form-control" name="urol_rol_id" id="urol_rol_id" placeholder="Rol" required>
                      <option value="0">-- seleccione --</option>
                      <option v-for="r in roles" :key="r.rol_id" :value="r.rol_id">{{ r.rol_descripcion }} - {{ r.rol_codigo }}</option>
                    </select>
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
  import userService from '../../services/userService';
  import rolesService from '../../services/rolesService';
  import usuariosrolService from '../../services/usuariosRolService';
  
  import '@fortawesome/fontawesome-free/css/all.css';

  export default {
    data() {
      return {
        regs: [],
        reg: { },
        title: "USUARIOS ROLES",
        plural: "Usuarios Roles",
        singular: "Usuario Rol",
        showModal: false,
        isEditing: false,
        users: [],
        roles: [],
      };
    },
  
    mounted() {
      this.listarRegistros();
      this.listarUsuarios();
      this.listarRoles();
    },
  
    methods: {
      async listarRegistros() {
        this.regs = [];
        try {
          this.regs = await usuariosrolService.getData();
        } catch (error) {
          console.error("Error:", error.message);
        }
      },
      
      async listarUsuarios() {
        this.users = [];
        try {
          this.users = await userService.getData();
        } catch (error) {
          console.error("Error:", error.message);
        }
      },
      async listarRoles() {
        this.roles = [];
        try {
          this.roles = await rolesService.getData();
        } catch (error) {
          console.error("Error:", error.message);
        }
      },
      newRegistro() {
        this.isEditing = false;
        this.reg = {  };
        this.showModal = true;
      },
      editRegistro(reg) {
        this.isEditing = true;
        this.reg = { ...reg };
        this.showModal = true;
      },

      async saveModal() {
        this.reg.urol_usr_id = 1; 
        this.reg.urol_estado = "A";
        if (this.isEditing) {
          const updatedReg = await usuariosrolService.updateData(this.reg);
          const index = this.regs.findIndex(item => item.urol_id === updatedReg.urol_id);
            if (index !== -1) {
              this.regs.splice(index, 1, updatedReg);
            }
        } else {
          const savedReg = await usuariosrolService.saveData(this.reg);
          this.regs.push(savedReg);
        }
        this.listarRegistros();
        this.closeModal();
      },

      async deleteRegistro(reg) {
        const confirmed = window.confirm("¿Estás seguro de eliminar este registro?");
        if (confirmed) {
          try {
            const index = this.regs.findIndex(item => item.urol_id === reg.urol_id);
            if (index !== -1) {
              reg.urol_usr_id = 1;
              reg.urol_estado = "X"; 
              await usuariosrolService.deleteData(reg); 
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
    z-index: 999; 
  }
  
  .modal-content {
    background-color: #fff;
    padding: 5px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%; 
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
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
  