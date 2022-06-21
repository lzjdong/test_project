<template>
  <component :is="mode" :ref="refId" v-bind="$attrs" v-on="$listeners">
    <template v-slot:default>
      <slot name="default" />
    </template>
  </component>
</template>

<script>
import { uuid } from 'vue-uuid';
import { get } from '@/api/system/dynamic';

export default {
  name: 'AsyncComponent',
  inheritAttrs: true,
  props: {
    // 父组件提供请求地址
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      resData: '',
      mode: '',
      refId: null,
    };
  },
  watch: {
    url: {
      immediate: true,
      async handler(val, oldVal) {
        if (!this.url) return;
        // Cache 缓存 根据 url 参数
        if (!window.SyncComponentCache) {
          window.SyncComponentCache = {};
        }
        let res;
        if (!window.SyncComponentCache[this.url]) {
          window.SyncComponentCache[this.url] = get(this.url);

          // window.SyncComponentCache[this.url] = Axios.get(this.url)
          res = await window.SyncComponentCache[this.url];
        } else {
          res = await window.SyncComponentCache[this.url];
        }
        console.log('🚀 ~ res', res);
        debugger;
        const Fn = Function;
        this.mode = new Fn(`return ${res.data || res}`)();
        /* if (res && res.data) {
          const Fn = Function
          this.mode = new Fn(`return ${res.data || res}`)()
        } */
      },
    },
  },
  created() {
    this.refId = uuid.v1;
  },
  methods: {
    /* chartResize() {
      this.$refs[this.refId] && this.$refs[this.refId].chartResize && this.$refs[this.refId].chartResize()
    }, */
    callPluginInner(param) {
      const { methodName, methodParam } = param;
      this.$refs[this.refId] &&
        this.$refs[this.refId][methodName] &&
        this.$refs[this.refId][methodName](methodParam);
    },
  },
};
</script>
