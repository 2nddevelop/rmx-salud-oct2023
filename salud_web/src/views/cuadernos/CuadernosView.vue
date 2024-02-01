<script setup>
import { ref, onMounted, computed } from 'vue';
import cuadernosService from '../../services/cuadernos/cuadernosService';

const title = 'CUADERNOS';
const plural = 'Cuadernos';
const singular = 'Cuaderno';
const showModal = ref(false);
const cols = ref([]);
const listas = ref([]);
const regs = ref([]);

const listarRegistros = () => {
  cuadernosService.getData().then(response => {
    regs.value = response;
  })
}
const verColumnas = (reg) => {
  cols.value = [];
  try {
    cuadernosService.getBuscar(reg.CUA_CODIGO).then(response => {
      cols.value = response;
      for (let index = 0; index < cols.value.length; index++) {
        if (cols.value[index].rel_codigo) {
          cuadernosService.getListas(cols.value[index].COL_CODIGO).then(res => {
            cols.value[index].lista = res;
          })
        }
      }
      showModal.value = true;
    });
  } catch (e) {
    console.log('Error - verColumnas: ', e.message);
  }
}
const closeModal = () => {
  showModal.value = false;
}

onMounted(() => {
  listarRegistros();
})
</script>

<template>
  <div class="p-1 m-1">
    <div class="p-1 m-1">
      <div class="grid grid-cols-3">
        <div class="p-1 m-1">
          <h1>{{ title }}</h1>
        </div>
        <div class="p-1 m-1"></div>
        <div class="flex justify-end p-1 m-1">
        </div>
      </div>
    </div>
    <div style="overflow-x: auto">
      <table class="table table-responsive">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th></th>
            <th>Centro</th>
            <th>Código<br>
              <input type="text" @change="buscarRegistros" class="form-control input">
            </th>
            <th>Descripción</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Grupo</th>
            <th>Tipo</th>
            <th>Seg Social</th>
            <th>Vigencia</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in regs" v-bind:key="r.doc_id">
            <td align="right">{{ index + 1 }}</td>
            <td>
              <button @click="verColumnas(r)"
                class="bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-1 rounded" title="Ver">
                <i class="fa-solid fa-eye"></i>
              </button>
            </td>
            <td align="left" style="background-color: beige;">{{ r.codestabl }}</td>
            <td align="right">{{ r.CUA_CODIGO }}</td>
            <td align="left">{{ r.CUA_DESCRIPCION }}</td>
            <td align="left">{{ r.CUA_FECHA_INICIO }}</td>
            <td align="left">{{ r.CUA_FECHA_FINAL }}</td>
            <td align="right">{{ r.CUA_GRUPO }}</td>
            <td align="right">{{ r.CUA_TIPO }}</td>
            <td align="center">{{ r.CUA_USO_SEGSOCIAL }}</td>
            <td align="center" style="background-color: beige;">{{ r.CUA_VIGENCIA }}</td>
            <td align="center">
              <span v-if="r.CUA_ESTADO == 'X'"
                class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{
                  r.CUA_ESTADO }}</span>
              <span v-if="r.doc_estado !== 'X'"
                class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{
                  r.CUA_ESTADO }}</span>
            </td>
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
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h2 class="modal-title text-xl font-semibold text-gray-900 dark:text-white">
              {{ singular }}
            </h2>
            <button type="button" @click="closeModal()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal">
              <i class="fa-solid fa-close"></i>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-1">
            <div class="grid grid-cols-2 gap-3">
            </div>

            <div class="grid grid-cols-4 gap-3">
              <table class="table table-responsive">
                <thead class="thead-dark">
                  <tr>
                    <th>#</th>
                    <th></th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Tipo</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Permiso</th>
                    <th>Ancho</th>
                    <th>Auxiliar</th>
                    <th>Vigencia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(c, index) in cols" v-bind:key="c.COL_CODIGO">
                    <td align="right">{{ index + 1 }}</td>
                    <td>
                      <select v-if="c.rel_codigo" class="form-control">
                        <option value="0">-- Ver Lista --</option>
                        <option v-for="lis in c.lista">{{ lis.lis_descripcion }}</option>
                      </select>
                    </td>
                    <td align="left" style="background-color: beige;">{{ c.COL_CODIGO }}</td>
                    <td align="left">{{ c.COL_DESCRIPCION }}</td>
                    <td align="center">{{ c.COL_TIPO }}</td>
                    <td align="left">{{ c.COL_INI }}</td>
                    <td align="left">{{ c.COL_FIN }}</td>
                    <td align="center">{{ c.COL_PERMISO }}</td>
                    <td align="right">{{ c.COL_ANCHO }}</td>
                    <td align="center" style="background-color: beige;">{{ c.COL_AUXILIAR }}</td>
                    <td align="center">
                      <span v-if="c.COL_VIGENCIA == 'N'"
                        class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{
                          c.COL_VIGENCIA }}</span>
                      <span v-if="c.COL_VIGENCIA !== 'N'"
                        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{
                          c.COL_VIGENCIA }}</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="13">Son n {{ plural }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button @click="closeModal()"
              class="bg-green-500 hover-bg-green-600 text-white font-bold py-2 px-4 m-1 rounded" :title="'Cerrar'">Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
</style>