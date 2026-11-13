<script setup lang="ts">
import StarField from './components/StarField.vue'
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import StatsStrip from './components/StatsStrip.vue'
import StationsSection from './components/StationsSection.vue'
import WordsSection from './components/WordsSection.vue'
import ExplainSection from './components/ExplainSection.vue'
import TechSection from './components/TechSection.vue'
import DownloadSection from './components/DownloadSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <StarField />
  <SiteNav />
  <main class="page">
    <HeroSection />
    <StatsStrip />
    <StationsSection />
    <WordsSection />
    <ExplainSection />
    <TechSection />
    <DownloadSection />
  </main>
  <SiteFooter />
</template>

<style scoped>
.page {
  position: relative;
  z-index: 1;
  /* 内容层要盖住固定的星场，但自身不能有背景色，否则星场被挡住 */
}
</style>
