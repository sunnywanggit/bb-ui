<template>
  <div class="cube-input" :class="{'cube-input_active': isFocus}">
    <div class="cube-input-prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <input
        class="cube-input-field"
        ref="input"
        v-model="inputValue"
        :maxlength="maxlength"
        :minlength="minlength"
        :type="innerType"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="changeHander"
    >
    <div class="cube-input-append" v-if="$slots.append || showClear || showPwdEye">
      <div class="cube-input-clear" v-if="showClear" @touchend="handleClear">
        <i class="cubeic-wrong"></i>
      </div>
      <div class="cube-input-eye" v-if="showPwdEye" @click="handlePwdEye">
        <i :class="eyeClass"></i>
      </div>
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, nextTick } from '@vue/composition-api';

const EVENT_INPUT = 'input';
const EVENT_BLUR = 'blur';
const EVENT_FOCUS = 'focus';

export default defineComponent({
  name: 'BbInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: [Boolean, String],
      default: false
    },
    minlength: Number,
    maxlength: Number,
    clearable: {
      type: [Boolean, Object],
      default: false
    },
    eye: {
      type: [Boolean, Object],
      default: false
    }
  },
  setup(props, { emit }) {
    const { value, type, eye, readonly, disabled, clearable } = props;
    const input = ref(null);
    const inputRef = computed(() => input.value);
    const inputValue = ref(value);
    const isFocus = ref(false);
    const formatedClearable = reactive({
      visible: false,
      blurHidden: true
    });
    const formatedEye = reactive({
      open: false,
      reverse: false
    });
    const pwdVisible = computed(() => {
      const eye = formatedEye;
      return eye.reverse ? !eye.open : eye.open;
    });
    const innerType = computed(() => {
      if (type === 'password' && eye && pwdVisible) {
        return 'text';
      }
      return type;
    });
    const showClear = computed(() => {
      let visible = formatedClearable.visible && inputValue && !readonly && !disabled;
      if (formatedClearable.blurHidden && !isFocus) {
        visible = false;
      }
      return visible;
    });
    const showPwdEye = computed(() => {
      return type === 'password' && eye && !disabled;
    });
    const eyeClass = computed(() => {
      return formatedEye.open ? 'cubeic-eye-visible' : 'cubeic-eye-invisible';
    });
    watch(() => value, (newValue) => {
      inputValue.value = newValue;
    });
    watch(inputValue, (newValue) => {
      emit(EVENT_INPUT, newValue);
    });
    const handleFocus = (e: Event) => {
      emit(EVENT_FOCUS, e);
      isFocus.value = true;
    };
    const changeHander = (e: Event) => {
      emit('change', e);
    };
    const focus = () => {
      nextTick(() => {
        (inputRef as any).value.focus();
      });
    };
    const blur = () => {
      (inputRef as any).value.blur();
    };
    const formatClearable = () => {
      if (typeof clearable === 'boolean') {
        formatedClearable.visible = clearable;
      } else {
        Object.assign(formatedClearable, clearable);
      }
    };
    const formateEye = () => {
      if (typeof eye === 'boolean') {
        formatedEye.open = eye;
      } else {
        Object.assign(formatedEye, eye);
      }
    };
    const handleBlur = (e: Event) => {
      emit(EVENT_BLUR, e);
      isFocus.value = false;
    };
    const handleClear = (e: Event) => {
      inputValue.value = '';
      (inputRef as any).value.focus();
    };
    const handlePwdEye = () => {
      formatedEye.open = !formatedEye.open;
    };
    return {
      input,
      inputRef,
      inputValue,
      isFocus,
      formatedClearable,
      formatedEye,
      pwdVisible,
      innerType,
      showClear,
      showPwdEye,
      eyeClass,
      handleFocus,
      changeHander,
      focus,
      blur,
      formatClearable,
      formateEye,
      handleBlur,
      handleClear,
      handlePwdEye
    };
  }
  // watch: {
  //   clearable: {
  //     handler() {
  //       this.formatClearable();
  //     },
  //     deep: true,
  //     immediate: true
  //   },
  //   eye: {
  //     handler() {
  //       this.formateEye();
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  // methods: {
  // }
});
</script>
<style lang="less" scoped>
@import "../../../assets/theme-chalk/var/varibale.less";
@import "../../../assets/theme-chalk/mixins/mixin.less";

.cube-input {
  display: flex;
  align-items: center;
  font-size: @fontsize-medium;
  line-height: 1.429;
  background-color: @input-bgc;
  .border-1px(@input-border-color);
}

.cube-input-field {
  display: block;
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: 10px;
  box-sizing: border-box;
  color: @input-color;
  line-height: inherit;
  background-color: inherit;
  border-radius: 2px;
  outline: none;

  &::-webkit-input-placeholder {
    color: @input-placeholder-color;
    text-overflow: ellipsis;

    .cube-input-append,
    .cube-input-clear,
    .cube-input-eye {
      &:first-child {
        margin-left: -5px;
      }
    }
  }
}

.cube-input_active {
  &:after {
    border-color: @input-focus-border-color;
  }
}

.cube-input-prepend,
.cube-input-append {
  display: flex;
  align-items: center;
}

.cube-input-clear,
.cube-input-eye {
  width: 1em;
  height: 1em;
  line-height: 1;
  padding: 10px;
  box-sizing: content-box;
  color: @input-clear-icon-color;

  > i {
    display: inline-block;
    transform: scale(1.2);
  }
}

.cube-input-eye {
  > .cubeic-eye-invisible,
  .cubeic-eye-visible {
    transform: scale(1.4);
  }
}
</style>
