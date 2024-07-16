import { defineVitestConfig } from '@nuxt/test-utils/config'
import vue from '@vitejs/plugin-vue';

export default defineVitestConfig({
    plugins: [],
    test: {
        environment: 'nuxt'
    }
});
