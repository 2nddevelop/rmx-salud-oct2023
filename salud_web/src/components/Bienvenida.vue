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
    <template #heading>Objetivo</template>

    El sistema tiene por <a href="#" target="_blank" rel="noopener">objetivo</a>
    gestionar la información de precios del sistema.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Áreas</template>

    El sistema tiene por <a href="#" target="_blank" rel="noopener">objetivo</a>
    gestionar la información de precios del sistema.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Galpones</template>

    El sistema tiene por <a href="#" target="_blank" rel="noopener">objetivo</a>
    gestionar la información de precios del sistema.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Precios</template>

    El sistema tiene por <a href="#" target="_blank" rel="noopener">objetivo</a>
    gestionar la información de precios del sistema.
  </WelcomeItem>

</template>
