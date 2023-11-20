<script setup>
import WelcomeItem from './BienvenidaItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Planificación</template>

    La plataforma permite una adecuada planificación en función 
    de los recursos y capacidades del centro de atención en salud.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Kardex</template>

    La plataforma mantiene un kardex centralizado de información de 
    Pacientes, sus Historiales Médicos y todo el personal Médico.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Fichas</template>

    La plataforma maneja la generación de fichas a traves de internet y 
    de manera presencial, tambien permite una fila virtual para la 
    respectiva atención.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Atención</template>

    La plataforma tiene la capacidad de gestionar la toma de Signos Vitales y
    la Atención de  <a href="#" target="_blank" rel="noopener">Consulta Externa</a>.
  </WelcomeItem>

</template>
